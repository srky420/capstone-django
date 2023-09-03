import json

from django.test import TestCase, Client

from accounts.models import User
from .models import Subscription
from .utils import get_all_sources

# Create your tests here.
class ViewsTest(TestCase):
    
    # Setup
    def setUp(self):
        # Create users
        user1 = User.objects.create_user(username="test_user1", email="test_user1@site.com", password="12345")
        user2 = User.objects.create_user(username="test_user2", email="test_user2@site.com", password="12345")

        # Create subscriptions for each user
        Subscription.objects.create(
            source_id="abc", 
            source_name="abc", 
            source_category="sports", 
            source_description="abc", 
            source_url="http://www.abc.com/", 
            user=user1
        )
        
        Subscription.objects.create(
            source_id="efg", 
            source_name="abc", 
            source_category="sports", 
            source_description="abc", 
            source_url="http://www.efg.com/", 
            user=user1
        )
            
        Subscription.objects.create(
            source_id="xyz", 
            source_name="xyz", 
            source_category="sports", 
            source_description="xyz", 
            source_url="http://www.xyz.com/", 
            user=user2
        )
    
    
    # Index view
    def test_index(self):
        c = Client()
        response = c.get("/news/")
        self.assertEqual(response.status_code, 200)
        
    
    # Headlines view
    def test_headlines_view(self):
        c = Client()
        
        response = c.get("/news/headlines/world")
        self.assertEqual(response.status_code, 200)
        
    
    # Sources view
    def test_sources_view(self):
        c = Client()
        
        response = c.get("/news/sources/")
        self.assertEqual(response.status_code, 200)
        
        
    # Search view
    def test_search_view(self):
        c = Client()
        
        response = c.get("/news/search")
        self.assertEqual(response.status_code, 200)
        
        response = c.get("/news/search?q=")
        self.assertEqual(response.status_code, 200)
        
    
    # Subscribe view
    def test_subscribe_view(self):
        c = Client()
        
        source = {
            "id": "ijk",
            "name": "ijk",
            "description": "ijk",
            "category": "general",
            "url": "http://www.ijk.com/"
        }
        
        # Without login
        response = c.post("/news/subscribe/", data={"source": json.dumps(source)}, content_type="application/json")
        self.assertEqual(response.status_code, 403)
        
        # With login, subscribed true
        c.login(username="test_user1", password="12345")
        response = c.post("/news/subscribe/", data={"source": json.dumps(source)}, content_type="application/json")
        response_json = response.json()
        self.assertEqual(response.status_code, 201)
        self.assertTrue(response_json["subscribed"])
        
        # With login, subscribed false
        response = c.post("/news/subscribe/", data={"source": json.dumps(source)}, content_type="application/json")
        response_json = response.json()
        self.assertEqual(response.status_code, 201)
        self.assertFalse(response_json["subscribed"])
        
        
    # Discover view
    def test_discover_view(self):
        c = Client()
        
        # Without login
        response = c.get("/news/discover/")
        self.assertEqual(response.status_code, 403)
        
        # With login
        c.login(username="test_user1", password="12345")
        response = c.get("/news/discover/")
        self.assertEqual(response.status_code, 200)
        
        
    # Other views
    def test_other_views(self):
        c = Client()
        
        # About
        response = c.get("/news/about/")
        self.assertEqual(response.status_code, 200)
        
        # Privacy policy
        response = c.get("/news/privacy-policy/")
        self.assertEqual(response.status_code, 200)
        
        # FAQs
        response = c.get("/news/faqs/")
        self.assertEqual(response.status_code, 200)

        
        
        
        
        