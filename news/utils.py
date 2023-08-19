from newsapi import NewsApiClient
from newsapi.newsapi_exception import NewsAPIException
from django.conf import settings


api = NewsApiClient(api_key=settings.API_KEY)


def get_top_headlines(category):
    
    if category == "world":
        try:
            return api.get_top_headlines(page_size=22, page=1, language="en")
        except NewsAPIException as e:
            return e
        
    try:
        return api.get_top_headlines(page_size=20, page=1, category=category, language="en")
    except NewsAPIException as e:
        return e
    

def get_top_sources(category):
    
    if category == "world":
        try:
            return api.get_sources(language="en", country="us")
        except NewsAPIException as e:
            return e
        
    try:
        return api.get_sources(category=category)
    except NewsAPIException as e:
        return e
    
    
def get_all_sources():
    try:
        return api.get_sources()
    except NewsAPIException as e:
        return e
    
    
def get_everything(q):
    try:
        return api.get_everything(q=q)
    except NewsAPIException as e:
        return e