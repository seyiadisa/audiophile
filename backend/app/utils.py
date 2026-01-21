from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash
from sqlmodel import Session
import os
import jwt


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 1

secret_key = os.getenv("JWT_SECRET_KEY")
password_hash = PasswordHash.recommended()


def generate_access_token(subject: str, expires_delta: timedelta | None = None):
    if expires_delta:
        expires = datetime.now(timezone.utc) + expires_delta
    else:
        expires = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRES_MINUTES
        )
    token = jwt.encode(
        {"sub": subject, "exp": expires}, secret_key, algorithm=ALGORITHM
    )

    return token


def verify_password(plain_password: str, hashed_password: str):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    return password_hash.hash(password)


def authenticate_admin(session: Session, email: str, password: str):
    pass
