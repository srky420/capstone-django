from django.shortcuts import render
from django.views import View


# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "accounts/index.html", {
            "view": "login-form"
        })
    
    
class LoginView(View):
    def post(self, request, *args, **kwargs):
        pass
    
    
class RegisterView(View):
    def post(self, request, *args, **kwargs):
        pass