import bcrypt
from .models import User

def create_user(username: str, email: str, password: str) -> User:
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user = User(username=username, email=email, password=hashed_password)
    user.save()
    return user

def get_user_by_id(user_id: int) -> User:
    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        return None