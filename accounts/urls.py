from django.urls import path

from . import views


app_name = "accounts"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("login", views.LoginView.as_view(), name="login"),
    path("register", views.RegisterView.as_view(), name="register"),
    path("logout", views.LogoutView.as_view(), name="logout"),
    path("forgot-pass", views.ForgotPasswordView.as_view(), name="forgot-pass"),
    path("resend-verification", views.ResendVerificationView.as_view(), name="resend-verification"),
    path("verify/<str:token>", views.AccountVerificationView.as_view(), name="verify"),
    path("reset-pass/<str:token>", views.ResetPasswordView.as_view(), name="reset-pass"),
    path("profile", views.ProfileView.as_view(), name="profile"),
    path("change-profile-pic", views.ChangeProfilePicView.as_view(), name="change-profile-pic"),
    path("unsubscribe/", views.UnsubscribeView.as_view(), name="unsubscribe")
]
