# News | CS50W: Capstone

A News Aggregator web app that consumes [News API](https://newsapi.org/) with User Authentication, User Verification and Source Subscription features.

![Static Badge](https://img.shields.io/badge/version-1.0-blue)
![Static Badge](https://img.shields.io/badge/python-3.8_3.9_3.10_3.11-darkgreen)
![Static Badge](https://img.shields.io/badge/django-4.2-darkgreen)
![Static Badge](https://img.shields.io/badge/cs50w-capstone-darkred)

## Installation
1. Install [Python](https://www.python.org/downloads/)

    Supported versions for Django 4.2 are Python 3.8, 3.9, 3.10, 3.11.

    Ensure Python is installed:

        python --version

2. Install [pip](https://pip.pypa.io/en/stable/installation/) (Note: Make sure to add Python to environment variables)

    Ensure pip is installed:

        pip --version

3. Clone project:

        git clone https://github.com/srky420/capstone-django.git

4. Create virtual environment inside projects's directory and activate it:

        python -m venv venv

        .\venv\Scripts\activate

5. Install dependancies,

        pip install -r .\requirements.txt

<br>

## Setup

1. This project uses an external API to fetch data. So, sign up at [New API](https://newsapi.org/) and get your free API Key.

2. This project also utilizes [Gmail's smtp](https://support.google.com/mail/answer/7126229?hl=en#zippy=%2Cstep-change-smtp-other-settings-in-your-email-client) service to send verification emails to users. For this purpose, an email and app password is required which you can generate for your own Gmail account using [Gmail app password](https://support.google.com/accounts/answer/185833?hl=en).

3. Finally, create a .env file in project's directory:

        API_KEY=<API Key from News API>
        EMAIL_ID=<Your Gmail>
        EMAIL_PW=<Your Gmail app password>
        SECRET_SALT=<Random string e.g. my_secret_salt_key>

    *Note:* *You can also see .env.example to get an idea of .env file.*

## Usage

Once you have done Installation and Setup you can run project:

    python manage.py runserver

Be sure to activate virtual environment before running the server:

    .\venv\Scripts\activate


## Distinctiveness and Complexity
Todo

## File Structure
Todo