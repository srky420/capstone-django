from django.urls import path

from . import views


app_name = "news"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("headlines/<str:category>", views.HeadlinesView.as_view(), name="headlines"),
    path("sources/", views.SourcesView.as_view(), name="sources"),
    path("search", views.SearchView.as_view(), name="search"),
    path("subscribe/", views.SubscribeView.as_view(), name="subscribe"),
    path("discover/", views.DiscoverView.as_view(), name="discover"),
    path("faqs/", views.FAQsView.as_view(), name="faqs"),
    path("about/", views.AboutView.as_view(), name="about"),
    path("privacy-policy/", views.PrivacyPolicyView.as_view(), name="privacy-policy")
]