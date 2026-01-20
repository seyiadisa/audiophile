from typing import Annotated
from fastapi import APIRouter, Form
from models import AdminLogin, AdminSignup

router = APIRouter()


@router.post("/admin/login")
async def login(form: Annotated[AdminLogin, Form()]):
    email, password = form.email, form.password

    return {"message": "Login endpoint"}


@router.post("/admin/signup")
async def signup(form: Annotated[AdminSignup, Form()]):
    return {"message": "Signup endpoint"}
