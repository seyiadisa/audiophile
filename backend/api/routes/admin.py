from typing import Annotated
from fastapi import APIRouter, Form
from models import AdminLogin

router = APIRouter()


@router.post("/admin/login")
async def login(form: Annotated[AdminLogin, Form()]):
    email, password = form.email, form.password

    return {"message": "Login endpoint"}
