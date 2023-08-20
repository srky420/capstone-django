from itsdangerous import URLSafeTimedSerializer, BadTimeSignature, SignatureExpired
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string


s = URLSafeTimedSerializer(settings.SECRET_KEY)

def generate_email_token(email):
    """
    Generates a token given an email address
    """
    token = s.dumps(email, salt=settings.SECRET_SALT)
    return token


def parse_email_token(token, expire_time):
    """
    Converts a token to email address
    """
    try:
        email = s.loads(token, salt=settings.SECRET_SALT, max_age=expire_time)
        return email
    except (SignatureExpired, BadTimeSignature) as e:
        return e
    
    
def send_email(token, subject, message, recipient_list, email_for):
    """
    Sends a verification email given email data
    """
    rendered_msg = render_to_string(template_name="accounts/email.html", context={
        "subject": subject,
        "message": message,
        "token": token,
        "email_for": email_for
    })
    send_mail(subject, rendered_msg, html_message=rendered_msg, from_email=settings.DEFAULT_FROM_EMAIL, recipient_list=recipient_list)