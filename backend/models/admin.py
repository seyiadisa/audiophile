from pydantic import BaseModel, EmailStr, field_validator


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


class AdminLogin(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    def validate_password(cls, v: str):
        return validate_password_strength(v)


class AdminSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("password")
    def validate_password(cls, v: str):
        return validate_password_strength(v)
