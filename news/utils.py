from newsapi import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException
from django.conf import settings

api_key = settings.API_KEY
api = NewsApiClient(api_key=api_key)


def get_top_headlines(category):
    """
    Returns top headlines by category
    """
    if not api_key:
        return {"status": "error", "message": "API Key missing."}
    
    if category == "world":
        try:
            return api.get_top_headlines(page_size=100, page=1, language="en")
        except NewsAPIException as e:
            return vars(e)["exception"]
        
    try:
        return api.get_top_headlines(page_size=100, page=1, category=category, language="en")
    except NewsAPIException as e:
        return vars(e)["exception"]
    

def get_top_sources(category):
    """
    Returns top sources by category
    """
    if not api_key:
        return {"status": "error", "message": "API Key missing."}
    
    if category == "world":
        try:
            return api.get_sources(language="en")
        except NewsAPIException as e:
            return vars(e)["exception"]
        
    try:
        return api.get_sources(category=category, language="en")
    except NewsAPIException as e:
        return vars(e)["exception"]
    
    
def get_all_sources():
    """
    Returns all sources
    """
    if not api_key:
        return {"status": "error", "message": "API Key missing."}
    
    try:
        return api.get_sources()
    except NewsAPIException as e:
        return vars(e)["exception"]
    
    
def get_everything(q):
    """
    Returns search results of query
    """
    if not api_key:
        return {"status": "error", "message": "API Key missing."}
    
    try:
        return api.get_everything(q=q, language="en")
    except NewsAPIException as e:
        return vars(e)["exception"]
    
    
def get_news_from_sources(sources_list):
    """
    Returns news from a list of sources
    """
    if not api_key:
        return {"status": "error", "message": "API Key missing."}
    
    if len(sources_list) == 0:
        return {"status": "error", "message": "No subscriptions found."}
    
    sources = ",".join(sources_list)
    
    try:
        return api.get_top_headlines(sources=sources, page_size=100, page=1)
    except NewsAPIException as e:
        return vars(e)["exception"]