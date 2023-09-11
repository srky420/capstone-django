from django import forms
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm, PasswordChangeForm, UserChangeForm
from django.contrib.auth import authenticate
from crispy_bootstrap5.bootstrap5 import FloatingField
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit

from .models import User


# Create forms
"""
Registeration Form
"""
class RegisterationForm(UserCreationForm):
    
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]
        
    # Creating Floating Fields using crispy bootstrap 5
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            FloatingField("username"),
            FloatingField("email"),
            FloatingField("password1"),
            FloatingField("password2"),
            Submit(name="submit", value="Sign up", css_class="btn-dark w-100")
        )
        
        for fieldname in ["username", "email", "password1", "password2"]:
            self.fields[fieldname].help_text = None
        
        
"""
Authentication Form
"""
class LoginForm(forms.ModelForm):
    password = forms.CharField(label="Password", widget=forms.PasswordInput)
        
    class Meta:
        model = User
        fields = ["username", "password"]
    
    # Try to authenticate user and raise error if cannot
    def clean(self):        
        username = self.cleaned_data["username"]
        password = self.cleaned_data["password"]
        
        if not authenticate(username=username, password=password):
            raise forms.ValidationError("Invalid username or password.")
        
    # Creating Floating Fields using crispy bootstrap 5
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            FloatingField("username"),
            FloatingField("password"),
            Submit(name="submit", value="Sign in", css_class="btn-dark w-100")
        )
        
        for fieldname in ["username", "password"]:
            self.fields[fieldname].help_text = None
        
        
"""
Find account form
"""
class FindAccountForm(forms.ModelForm):
    
    class Meta:
        model = User
        fields = ["email"]
        
    # Try to find this account
    def clean(self):
        email = self.cleaned_data["email"]
        try:
            user = User.objects.get(email=email)
            if user.is_active == False:
                raise forms.ValidationError("Account not verified.")
        except User.DoesNotExist:
            raise forms.ValidationError("Account does not exist.")
        
    # Creating Floating Fields using crispy bootstrap 5
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            FloatingField("email"),
            Submit(name="submit", value="Find Account", css_class="btn-dark w-100")
        )
        
        for fieldname in ["email"]:
            self.fields[fieldname].help_text = None
            
            
"""
Reset password form
"""
class ResetPasswordForm(SetPasswordForm):
        
    # Creating Floating Fields using crispy bootstrap 5
    def __init__(self, user, *args, **kwargs):
        
        # Set user
        self.user = user
        
        super(SetPasswordForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            FloatingField("new_password1"),
            FloatingField("new_password2"),
            Submit(name="submit", value="Reset Password", css_class="btn-dark w-100")
        )
        
        # Set labels
        for fieldname in ["new_password1", "new_password2"]:
            self.fields[fieldname].help_text = None
            

"""
Change password form
"""
class ChangePasswordForm(PasswordChangeForm):
    
    # Creating Floating Fields using crispy bootstrap 5
    def __init__(self, user, *args, **kwargs):
        
        # Set user
        self.user = user
        
        super(PasswordChangeForm, self).__init__(user, *args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            FloatingField("old_password"),
            FloatingField("new_password1"),
            FloatingField("new_password2"),
            Submit(name="submit", value="Change Password", css_class="btn-dark")
        )
        

"""
Resend verification form
"""
class VerificationForm(forms.Form):
    email = forms.EmailField()
    
    def clean(self):
        email = self.cleaned_data["email"]
        
        # Check if user exists
        try:
            user = User.objects.get(email=email)
            if user.is_active == True:
                raise forms.ValidationError("Account already verified.")
        except User.DoesNotExist:
            raise forms.ValidationError("Account does not exist.")
        
    # Creating Floating Fields using crispy bootstrap 5
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            FloatingField("email"),
            Submit(name="submit", value="Send Email", css_class="btn-dark w-100")
        )
        
        for fieldname in ["email"]:
            self.fields[fieldname].help_text = None
