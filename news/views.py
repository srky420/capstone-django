from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from .utils import get_top_headlines, get_top_sources, get_all_sources

# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "news/index.html")
    
    
class HeadlinesView(View):
    def get(self, request, category):
        response = get_top_headlines(category)
        sources = get_top_sources(category)
        if response["status"] == "ok" and sources["status"] == "ok":
            response["sources"] = sources["sources"]
        
        return JsonResponse(response, safe=False, status=200)
    
    
class SourcesView(View):
    def get(self, request, *args, **kwargs):
        response = get_all_sources()
        return JsonResponse(response, safe=False, status=200)