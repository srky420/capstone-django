from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from .utils import get_top_headlines

# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "news/index.html")
    
    
class HeadlinesView(View):
    def get(self, request, category):
        response = get_top_headlines(category)
        
        return JsonResponse(response, safe=False, status=200)