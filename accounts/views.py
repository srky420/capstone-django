import json

from django.shortcuts import render
from django.urls import reverse
from django.contrib import messages
from django.views import View
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.mixins import LoginRequiredMixin

from news.models import Subscription
from .models import User
from .forms import RegisterationForm, LoginForm, FindAccountForm, ResetPasswordForm, ChangePasswordForm
from .utils import generate_email_token, send_email, parse_email_token


# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("news:index"))
    
        return render(request, "accounts/index.html", {
            "login_form": LoginForm(),
            "register_form": RegisterationForm(),
            "forgot_form": FindAccountForm(),
            "view": "login"
        })
    
    
# Create your views here.
class LoginView(View):
    # POST
    def post(self, request, *args, **kwargs):
        # Create form obj with POST data
        form = LoginForm(request.POST)
        
        # Check if form valid
        if form.is_valid():
            # Get cleaned data
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            
            # Authenticate and login user
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return HttpResponseRedirect(reverse("news:index"))
            
        # Invalid form
        return render(request, "accounts/index.html", {
            "login_form": form,
            "register_form": RegisterationForm(),
            "forgot_form": FindAccountForm(),
            "view": "login"
        })


class LogoutView(View):
    # POST
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect(reverse("accounts:index"))


class RegisterView(View):
    # POST
    def post(self, request, *args, **kwargs):
        # Create form obj with POST data
        form = RegisterationForm(request.POST)
        
        # Check if valid form
        if form.is_valid():
            instance = form.save(commit=False)
            instance.is_active = False
            instance.save()
            
            email = form.cleaned_data["email"]
            token = generate_email_token(email)
            send_email(
                token=token,
                subject="News account verification",
                message="Please use the link to active your account",
                recipient_list=[email],
                email_for="verification"
            )
            messages.add_message(request, messages.SUCCESS, "Account activation email sent.")
            return HttpResponseRedirect(reverse("accounts:index"))
            
        return render(request, "accounts/index.html", {
            "register_form": form,
            "login_form": LoginForm(),
            "forgot_form": FindAccountForm(),
            "view": "register",
        })


class AccountVerificationView(View):
    # GET
    def get(self, request, token):
        # Parse token
        try:
            email = parse_email_token(token, 7200)
            user = User.objects.get(email=email)
            if user.is_active == True:
                messages.add_message(request, messages.ERROR, "Already activated.")
                return HttpResponseRedirect(reverse("accounts:index"))
            
            user.is_active = True
            user.save()
            messages.add_message(request, messages.SUCCESS, "Account activated.")
            return HttpResponseRedirect(reverse("accounts:index"))
        except Exception as e:
            print(e)
            messages.add_message(request, messages.ERROR, "Token expired or invalid.")
            return HttpResponseRedirect(reverse("accounts:index"))
        
        
class ForgotPasswordView(View):
    # POST
    def post(self, request, *args, **kwargs):
        form = FindAccountForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            token = generate_email_token(email)
            send_email(
                token=token,
                subject="News account password reset",
                message="Please use this link to reset your password",
                recipient_list=[email],
                email_for="resetpassword"
            )
            messages.add_message(request, messages.SUCCESS, "An email has been sent.")
            
        return render(request, "accounts/index.html", {
            "login_form": LoginForm(),
            "register_form": RegisterationForm(),
            "forgot_form": form,
            "view": "forgot-pass"
        })
        
        
class ResetPasswordView(View):
    # GET
    def get(self, request, token):
        # Try to parse token
        try:
            email = parse_email_token(token, 7200)
            user = User.objects.get(email=email)
            
            return render(request, "accounts/resetpass-form.html", {
                "form": ResetPasswordForm(user=user),
                "token": token
            })
        except Exception as e:
            messages.add_message(request, messages.ERROR, "Token expired or invalid.")
            return HttpResponseRedirect(reverse("accounts:index"))
    
    # POST
    def post(self, request, token):
        # Try to parse token and get user
        try:
            email = parse_email_token(token, 7200)
            user = User.objects.get(email=email)
        except Exception as e:
            messages.add_message(request, messages.ERROR, "Token expired or invalid.")
            return HttpResponseRedirect(reverse("accounts:index"))
        
        # Reset user's password using POST data
        form = ResetPasswordForm(user, request.POST)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.SUCCESS, "Password reset successful.")
            return HttpResponseRedirect(reverse("accounts:index"))
        
        return render(request, "accounts/resetpass-form.html", {
            "form": form,
            "token": token
        })
        
        
class ProfileView(LoginRequiredMixin, View):
    login_url = "/accounts/"
    
    def get(self, request, *args, **kwargs):
        
        # Get subscripitons
        subs = request.user.subscriptions.all()
        
        return render(request, "accounts/profile.html", {
            "subscriptions": subs,
            "form": ChangePasswordForm(user=request.user),
        })
        
    def post(self, request, *args, **kwargs):
        form = ChangePasswordForm(request.user, request.POST)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.SUCCESS, "Password changed.")
            return HttpResponseRedirect(reverse("accounts:profile"))
        
        
        return render(request, "accounts/profile.html", {
            "form": form,
            "show_form": True
        })
        
        
class ChangeProfilePicView(LoginRequiredMixin, View):
    login_url = "/accounts/"
    
    def post(self, request, *args, **kwargs):
        if not request.FILES.get("file"):
            return HttpResponseRedirect(reverse("accounts:profile"))
        
        user = User.objects.get(pk=request.user.id)
        file = request.FILES["file"]
        user.profile_pic = file
        user.save()
        
        return HttpResponseRedirect(reverse("accounts:profile"))
    

class UnsubscribeView(View):
    def post(self, request, *args, **kwargs):
        # Load json data
        data = json.loads(request.body)
        if not data.get("source_id"):
            return JsonResponse({"error": "Invalid data."}, status=400)
        
        try:
            sub = Subscription.objects.get(source_id=data["source_id"], user=request.user)
            sub.delete()
            return JsonResponse({"msg": "Subscription removed."}, status=201)
        except Subscription.DoesNotExist:
            return JsonResponse({"msg": "Subscription does not exist."}, status=400)