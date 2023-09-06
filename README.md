# News | CS50W: Capstone

A News Aggregator web app that consumes [News API](https://newsapi.org/) with User Authentication, User Verification and Source Subscription features.

![Static Badge](https://img.shields.io/badge/version-1.0-blue)
![Static Badge](https://img.shields.io/badge/python-3.8_|_3.9_|_3.10_|_3.11-darkgreen)
![Static Badge](https://img.shields.io/badge/django-4.2-darkgreen)
![Static Badge](https://img.shields.io/badge/cs50w-capstone-darkred)

## Quick Links

- [Overview](#overview)
- [Distinctiveness and Complexity](#distinctiveness-and-complexity)
- [File Structure](#file-structure)
- [Installation](#installation)

## Overview

This project, named News, provides a huge number of news articles from different sources for users to read. It also provides seven different news categories users can choose from and displays news articles in a user-friendly and cohesive manner. Users can sign up and subscribe to multiple news sources from which they would like to read news articles. It also provides capability to search for articles as well as sources.

## Distinctiveness and Complexity

### Distinctiveness:

This project utilizes an external API with the help of [News API's python package](https://github.com/mattlisiv/newsapi-python) to make API calls to fetch news articles and news sources. It also uses JavaScript to dynamically fetch data from beckend and displays it in real-time to the users. Hence why the index page is never reloaded and new content is displayed for the user in each tab of index page. It also shows placeholders while data is being loaded to show layout of the page to the user and make the overall experience user-friendly.

Other than this, the project also provides a dynamic search option for both news articles and news sources since alot of times people want to search for specific news articles to read or specific sources to subscribe to. The search results are updated in real-time as the user searches for any keywords. Users can also filter sources by category to narrow down their search results. A sources tab allows users to browse, search, filter and subscribe/unsubscribe from news sources. Other than that a list of relevant news sources are shown in each tab of index page and registered users can subscribe/unsubscribe to these sources.

This project also uses email verification for newly registered users. Whenever a new user registers, an account verification email is sent to that user's email id. The sent email contains a link which user can click to verify their account. Account verification uses a timed-token which expires after 120 minutes. Similarly, a timed-token is also used for forgot password scenario where user receives a link in email and can use that link to reset their password. A seperate app is used for user accounts handling to seperate concerns of accounts and news app.

Finally, this project provides a Discover page for registered users where they can see news articles from all the sources that they have subscribed to. Users can customize this news feed by subscribing to their favorite news sources and get all articles from those sources. It also shows a list of subscribed sources of current user which can be used to unsubscribe. News app and accounts app both are mobile-responsive and have user-friendly interfaces utilizing Bootstrap CSS and JS.

### Complexity

Complexity of this project can be summarized in following points:
- Making external API calls and ensuring consistent response to backend for proper unit testing and to frontend for proper data display and error handling.
- Designing appropriate suscription model for storing user subscriptions and retreiving subscriptions to make API calls for news articles.
- Designing user model and authentication forms using Django's auth forms.
- Setting up Django mail system as well as creating user verification and password reset emails.
- Ensuring timed-token generation and validation for email verification requests and password reset requests.
- Designing frontend for news app and accounts app using Bootstrap CSS and ensuring mobile responsiveness.
- Creating fetch requests for news articles and news sources with proper error handling.
- Creating unit tests for views and models.

## File Structure

### Project level

```
capstone
│   settings.py - Defines project settings e.g. mail id, mail passwords, API key
│   urls.py - Defines project level urls
│   wsgi.py
│   __init__.py
└───__pycache__
```

### Accounts app

	accounts
	│   admin.py - Defines admin classes and functions
	│   apps.py - Defines accounts app configuration
	│   forms.py - Defines Django's auth forms and model forms
	│   models.py - Defines models for accounts app i.e. User model
	│   tests.py - Defines unit tests for accounts app
	│   urls.py - Defines url paths for accounts app
	│   utils.py - Defines functions for token generation and validation
	│   views.py - Defines business logic for accounts app
	│   __init__.py
	│
	├───migrations
	│
	├───static
	│   └───accounts
	│       │   change_view.js - Defines function to change views between login, sign up and forgot password
	│       │   color-modes.js - Defines functions to switch between themes i.e. light and dark
	│       │   placeholders.js - Defines placeholder html for loading purposes
	│       │   styles.css - Defines CSS propertiers of elements
	│       │   unsubscribe.js - Defines function to unsubscribe from sources when user is logged in.
	│       │
	│       └───favicon
	├───templates - Contains all the templates for accounts app
	│   └───accounts
	│           color-modes.html
	│           email.html
	│           footer-lg.html
	│           footer-sm.html
	│           forgotpass-form.html
	│           index.html
	│           layout.html
	│           login-form.html
	│           messages.html
	│           profile-pic.html
	│           profile.html
	│           register-form.html
	│           resetpass-form.html
	│
	└───__pycache__

## Installation

1. Install [Python](https://www.python.org/downloads/)

   Supported versions for Django 4.2 are Python 3.8, 3.9, 3.10, 3.11.

   Ensure Python is installed:

        python --version

2. Install [pip](https://pip.pypa.io/en/stable/installation/) (*Note: pip is usually pre-installed with newer python versions*)

    Ensure pip is installed:

        pip --version

3. Clone project:

        git clone https://github.com/srky420/capstone-django.git
        
        cd capstone

4. Create virtual environment inside projects's directory and activate it:

        python -m venv venv

        .\venv\Scripts\activate

5. Install dependancies:

        pip install -r .\requirements.txt

6. Make migrations:

        python manage.py makemigrations
        python manage.py migrate

### Setup

1. This project uses an external API to fetch data. So, sign up at [New API](https://newsapi.org/) and get your free API Key.

2. This project also utilizes [Gmail's smtp](https://support.google.com/mail/answer/7126229?hl=en#zippy=%2Cstep-change-smtp-other-settings-in-your-email-client) service to send verification emails to users. For this purpose, an email and app password is required which you can generate for your own Gmail account using [Gmail app password](https://support.google.com/accounts/answer/185833?hl=en).

3. Finally, create a .env file in project's directory:

        API_KEY=<API Key from News API>
        EMAIL_ID=<Your Gmail>
        EMAIL_PW=<Your Gmail app password>
        SECRET_SALT=<Random string e.g. my_secret_salt_key>

    *Note:* *You can also see .env.example to get an idea of .env file.*

### Usage

Once you have done Installation and Setup you can run project:

    python manage.py runserver

Be sure to activate virtual environment before running the server:

    .\venv\Scripts\activate



<style>

	.table-wrapper {
			overflow-x: scroll; 
	}

</style>