import bcrypt
from .models import User
from django.core.exceptions import ValidationError

def create_user(username: str, email: str, password: str) -> User:
    if User.objects.filter(email=email).exists():
        raise ValidationError("There is already a user with this email")
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user = User(username=username, email=email, password=hashed_password)
    user.save()
    return user