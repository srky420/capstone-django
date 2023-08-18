from django.urls import path

from . import views


urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("headlines/<str:category>", views.HeadlinesView.as_view(), name="headlines"),
    path("sources/", views.SourcesView.as_view(), name="sources")
]