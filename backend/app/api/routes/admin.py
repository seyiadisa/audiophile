from typing import Annotated
from fastapi import APIRouter, Form
from app.models.admin import AdminLogin, AdminSignup, Admin
from app.db.database import SessionDep


router = APIRouter()


@router.post("/admin/login")
async def login(form: Annotated[AdminLogin, Form()], session: SessionDep):
    email, password = form.email, form.password

    return {"message": "Login endpoint"}


@router.post("/admin/signup")
async def signup(form: Annotated[AdminSignup, Form()], session: SessionDep):
    admin = Admin.model_validate(form.model_dump())
    session.add(admin)
    session.commit()
    session.refresh(admin)

    return {
        "name": admin.name,
        "email": admin.email,
    }
