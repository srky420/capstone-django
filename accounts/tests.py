from urllib.parse import urlencode
from django.test import TestCase, Client

from .models import User
from news.models import Subscription
from news.utils import get_all_sources


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
    
    
    # Invalid registration
    def test_invalid_registration(self):
        c = Client()
        
        # Same username as other user
        response = c.post("/accounts/register", data={"username": "test_user1", "email": "test_user3@site.com", "password1": "12345", "password2": "12345"})
        self.assertEqual(response.status_code, 200)
        
        # Same email as other user
        response = c.post("/accounts/register", data={"username": "test_user3", "email": "test_user1@site.com", "password1": "12345", "password2": "12345"})
        self.assertEqual(response.status_code, 200)
        
        # Passwords mismatch
        response = c.post("/accounts/register", data={"username": "test_user3", "email": "test_user3@site.com", "password1": "12345", "password2": "1234"})
        self.assertEqual(response.status_code, 200)
    
    
    # Valid registration
    def test_valid_registration(self):
        c = Client()
        
        response = c.post("/accounts/register", data={"username": "test_user3", "email": "test_user3@site.com", "password1": "test12345", "password2": "test12345"})
        self.assertEqual(response.status_code, 302)
    
    
    # Invalid login
    def test_invalid_login(self):
        c = Client()
        
        # Non-existent username
        response = c.post("/accounts/login", data={"username": "test_user5", "password": "test12345"})
        self.assertEqual(response.status_code, 200)
        
        # Wrong password
        response = c.post("/accounts/login", data={"username": "test_user1", "password": "123"})
        self.assertEqual(response.status_code, 200)
    
    
    # Valid login
    def test_valid_login(self):
        c = Client()
        
        response = c.post("/accounts/login", data={"username": "test_user1", "password": "12345"})
        self.assertEqual(response.status_code, 302)
        
    
    # Profile and subscriptions view
    def test_profile_and_subscriptions(self):
        c = Client()
        
        # Without login
        response = c.get("/accounts/profile")
        self.assertEqual(response.status_code, 302)
        
        # With user1 login
        c.login(username="test_user1", password="12345")
        response = c.get("/accounts/profile")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["subscriptions"].count(), 2)
        
        c.logout()
        
        # With user2 login
        c.login(username="test_user2", password="12345")
        response = c.get("/accounts/profile")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["subscriptions"].count(), 1)
        
    
    # Unsubscribe view  
    def test_unsubscribe_view(self):
        c = Client()
        
        response = c.post("/accounts/unsubscribe/", data={"source_id": ""}, content_type="application/json")
        self.assertEqual(response.status_code, 302)
        
        c.login(username="test_user1", password="12345")
        sub = Subscription.objects.get(pk=1)
        
        # Invalid json data
        response = c.post("/accounts/unsubscribe/", data={}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        
        # Valid json data
        response = c.post("/accounts/unsubscribe/", data={"source_id": sub.source_id}, content_type="application/json")
        response_json = response.json()
        
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response_json["count"], 1)
        

    