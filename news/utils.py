from newsapi import NewsApiClient, newsapi_exception
from django.conf import settings


api = NewsApiClient(api_key=settings.API_KEY)


def get_top_headlines(category):
    
    if category == "world":
        try:
            return api.get_top_headlines(page_size=20, page=1)
        except newsapi_exception.NewsAPIException as e:
            return e
        
    try:
        return api.get_top_headlines(page_size=20, page=1, category=category)
    except newsapi_exception.NewsAPIException as e:
        return e
    

def get_top_sources(category):
    
    if category == "world":
        try:
            return api.get_sources(language="en", country="us")
        except newsapi_exception.NewsAPIException as e:
            return e
        
    try:
        return api.get_sources(category=category, language="en", country="us")
    except newsapi_exception.NewsAPIException as e:
        return e