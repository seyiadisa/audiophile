from datetime import datetime
from typing import Literal
import json

from pydantic import field_validator
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON, DateTime, Enum


class ProductBase(SQLModel):
    shortName: str | None = None
    name: str
    price: int  # stored in cents
    details: str
    features: str
    inTheBox: dict[str, int] = Field(sa_column=Column(JSON))
    category: Literal["headphones", "speakers", "earphones"] = Field(
        sa_column=Column(
            Enum("headphones", "speakers", "earphones", name="category_enum")
        )
    )


class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    imageUrl: str
    created_at: datetime = Field(sa_column=Column(DateTime(timezone=True)))


class ProductCreate(ProductBase):
    @field_validator("inTheBox", mode="before")
    def validate_in_the_box(cls, v: dict[str, int] | str):
        if isinstance(v, str):
            try:
                return json.loads(v)
            except json.JSONDecodeError:
                raise ValueError("Invalid JSON in 'inTheBox' field")
        return v


class ProductPublic(ProductBase):
    id: int
    isNew: bool
    imageUrl: str
    created_at: datetime


class ProductUpdate(SQLModel):
    shortName: str | None = None
    name: str | None = None
    price: int | None = None
    details: str | None = None
    features: str | None = None
    inTheBox: dict | None = None
    category: str | None = None
