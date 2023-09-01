import json

from django.shortcuts import render
from django.urls import reverse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, HttpResponseRedirect

from .models import Subscription
from .utils import get_top_headlines, get_top_sources, get_all_sources, get_everything, get_news_from_sources


# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "news/index.html")
    
    
class HeadlinesView(View):
    def get(self, request, category):
        
        # Get top headlines
        response = get_top_headlines(category)
                        
        # Get top sources and add to response
        sources = get_top_sources(category)
        if response["status"] == "ok" and sources["status"] == "ok":
            response["sources"] = sources["sources"]
                
        # Get user's subscriptions if user is authenticated
        if request.user.is_authenticated:
            
            # Get all subscriptions of current user
            subscribed_sources = request.user.subscriptions.all()
            
            # Append source to subscribed list in response if both source's ids match
            for source in response["sources"]:
                for sub in subscribed_sources:
                    if source["id"] == sub.source_id:
                        source["subscribed"] = True
                        break
                
        return JsonResponse(response, safe=False, status=200)
    
    
class SourcesView(View):
    def get(self, request, *args, **kwargs):
        
        response = get_all_sources()
                
        # Get user's subscriptions if user is authenticated
        if request.user.is_authenticated:
            
            # Get all subscriptions of current user
            subscribed_sources = request.user.subscriptions.all()
            
            # Append source to subscribed list in response if both source's ids match
            for sub in subscribed_sources:
                for source in response["sources"]:
                    if source["id"] == sub.source_id:
                        source["subscribed"] = True
                        break
        
        return JsonResponse(response, safe=False, status=200)
    
    
class SearchView(View):
    def get(self, request, *args, **kwargs):
        
        # If query string given as get param
        if request.GET.get("q"):
            q = request.GET["q"]
            response = get_everything(q=q)
            
            return JsonResponse(response, safe=False, status=200)
        
        # Else render search template
        return render(request, "news/search.html")
    
    
class SubscribeView(View):    
    def post(self, request, *args, **kwargs):
        
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Not logged in."}, status=403)
        
        # Load json data
        data = json.loads(request.body)
        if not data.get("source"):
            return JsonResponse({"error": "Invalid data."}, status=400)
        
        source = json.loads(data["source"])
        print(source["id"])
        
        # Toggle subscription for current user
        try:
            sub = Subscription.objects.get(source_id=source["id"], user=request.user)
            sub.delete()
            
            return JsonResponse({"msg": "Subscription removed.", "subscribed": False}, status=201)
        except Subscription.DoesNotExist:
            sub = Subscription.objects.create(
                source_id=source["id"], 
                source_name=source["name"], 
                source_category=source["category"], 
                source_description=source["description"],
                source_url=source["url"],
                user=request.user
                )
            sub.save()
            
            return JsonResponse({"msg": "Subscription created.", "subscribed": True}, status=201)     
        
       
class DiscoverView(View):    
    def get(self, request, *args, **kwargs):
        
        # Check if logged in
        if not request.user.is_authenticated:
            return JsonResponse({"msg": "Not logged in."}, status=403)
        
        # Get subscriptions list
        subscriptions = request.user.subscriptions.all()
        
        # Get all news from current user's subscriptions list
        sources = [source.serializer() for source in subscriptions]
        response = get_news_from_sources([source["id"] for source in sources])
        
        # Append subscribed source to response
        if len(sources) != 0:
            response["sources"] = sources
            # Set subscribed to True for each source
            for source in response["sources"]:
                source["subscribed"] = True
        
        return JsonResponse(response, safe=False, status=200)
    
    
class FAQsView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "news/faqs.html")
    

class AboutView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "news/about.html")
        
