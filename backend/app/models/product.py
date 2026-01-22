from datetime import datetime
from typing import Any

from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON, DateTime, Enum


class ProductBase(SQLModel):
    isNew: bool
    shortName: str | None = None
    name: str
    image: str
    price: int  # stored in cents
    details: str
    features: str
    inTheBox: dict[str, Any] = Field(sa_column=Column(JSON))
    category: str = Field(
        sa_column=Column(
            Enum("headphones", "speakers", "earphones", name="category_enum")
        )
    )
    created_at: datetime = Field(sa_column=Column(DateTime(timezone=True)))


class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class ProductCreate(ProductBase):
    pass


class ProductPublic(ProductBase):
    id: int


class ProductUpdate(SQLModel):
    isNew: bool | None = None
    shortName: str | None = None
    name: str | None = None
    image: str | None = None
    price: int | None = None
    details: str | None = None
    features: str | None = None
    inTheBox: dict[str, Any] | None = None
    category: str | None = None
    created_at: datetime | None = None
