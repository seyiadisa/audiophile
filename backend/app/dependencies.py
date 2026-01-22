from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from pydantic import ValidationError
from sqlmodel import Session
from app.db import engine
from jwt.exceptions import InvalidTokenError

from app.utils import secret_key, ALGORITHM
from app.models.token import TokenData
from app.crud import get_admin_by_email

import jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def validate_token(session: SessionDep, token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        token_data = TokenData(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(status_code=403, detail="Could not validate credentials")
    email = token_data.email
    admin = get_admin_by_email(session, email)

    if not admin:
        raise HTTPException(status_code=403, detail="Could not validate credentials")
