from typing import Annotated
from fastapi import APIRouter, Form, HTTPException
from app.models.admin import AdminLogin, AdminSignup, Admin
from app.db import SessionDep
from app.utils import generate_access_token, get_password_hash
from app.crud import authenticate, get_admin_by_email
from app.models.token import Token

router = APIRouter()


@router.post("/admin/login")
async def login(form: Annotated[AdminLogin, Form()], session: SessionDep):
    email, password = form.email, form.password

    admin = authenticate(session, email, password)

    if not admin:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    return Token(access_token=generate_access_token(subject=email))


@router.post("/admin/signup")
async def signup(form: Annotated[AdminSignup, Form()], session: SessionDep):
    admin = get_admin_by_email(session, form.email)

    if admin:
        raise HTTPException(status_code=400, detail="Email already registered")

    admin = Admin.model_validate(
        {**form.model_dump(), "password": get_password_hash(form.password)}
    )
    session.add(admin)
    session.commit()
    session.refresh(admin)

    return {"message": "Admin created successfully!"}
