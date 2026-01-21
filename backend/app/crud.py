from sqlmodel import Session, select
from app.models.admin import Admin
from app.utils import verify_password


def get_admin_by_email(session: Session, email: str):
    admin = session.exec(select(Admin).where(Admin.email == email)).first()
    return admin


def create_admin():
    pass


def authenticate(session: Session, email: str, password: str):
    admin = get_admin_by_email(session, email)

    if not admin:
        return None
    if not verify_password(password, admin.password):
        return None
    return admin
