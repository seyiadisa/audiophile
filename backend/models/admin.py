from pydantic import BaseModel, EmailStr, field_validator
from sqlmodel import SQLModel, Field


def validate_password_strength(v: str) -> str:
    if len(v) < 8:
        raise ValueError("Password must be at least 8 characters long")
    if not any(c.isupper() for c in v):
        raise ValueError("Password must contain at least one uppercase letter")
    if not any(c.islower() for c in v):
        raise ValueError("Password must contain at least one lowercase letter")
    if not any(c.isdigit() for c in v):
        raise ValueError("Password must contain at least one digit")
    if not any(c in "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?`~" for c in v):
        raise ValueError("Password must contain at least one special character")
    return v


class AdminBase(SQLModel):
    email: EmailStr
    password: str


class Admin(AdminBase, table=True):
    __tablename__ = "admin"  # type: ignore

    id: int = Field(default=None, primary_key=True)
    name: str


class AdminLogin(AdminBase):
    @field_validator("password")
    def validate_password(cls, v: str):
        return validate_password_strength(v)


class AdminSignup(AdminBase):
    name: str

    @field_validator("password")
    def validate_password(cls, v: str):
        return validate_password_strength(v)
