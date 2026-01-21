from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def validate_token(token: Annotated[str, Depends(oauth2_scheme)]):
    pass
