from newsapi import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException
from django.conf import settings


api = NewsApiClient(api_key=settings.API_KEY)


def get_top_headlines(category):
    """
    Returns top headlines by category
    """
    if category == "world":
        try:
            return api.get_top_headlines(page_size=100, page=1, language="en")
        except NewsAPIException as e:
            return e
        
    try:
        return api.get_top_headlines(page_size=100, page=1, category=category, language="en")
    except NewsAPIException as e:
        return e
    

def get_top_sources(category):
    """
    Returns top sources by category
    """
    if category == "world":
        try:
            return api.get_sources(language="en", country="us")
        except NewsAPIException as e:
            return e
        
    try:
        return api.get_sources(category=category, language="en")
    except NewsAPIException as e:
        return e
    
    
def get_all_sources():
    """
    Returns all sources
    """
    try:
        return api.get_sources()
    except NewsAPIException as e:
        return e
    
    
def get_everything(q):
    """
    Returns search results of query
    """
    try:
        return api.get_everything(q=q, language="en")
    except NewsAPIException as e:
        return e
    
    
def get_news_from_sources(sources_list):
    """
    Returns news from a list of sources
    """
    if len(sources_list) == 0:
        return {"msg": "No subscriptions found."}
    
    sources = ",".join(sources_list)
    
    try:
        return api.get_top_headlines(sources=sources, page_size=100, page=1)
    except NewsAPIException as e:
        return e