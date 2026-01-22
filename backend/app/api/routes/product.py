from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from app.models.product import Product, ProductCreate, ProductUpdate, ProductPublic
from app.dependencies import SessionDep, validate_token

router = APIRouter()


@router.get("/products", response_model=list[ProductPublic])
async def get_products(session: SessionDep):
    products = session.exec(select(Product)).all()
    return products


@router.get("/products/{product_id}", response_model=ProductPublic)
async def get_product(product_id: int, session: SessionDep):
    product = session.get(Product, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.post(
    "/products",
    status_code=201,
    dependencies=[Depends(validate_token)],
)
async def create_product(session: SessionDep, product: ProductCreate):
    new_product = Product.model_validate(product)
    session.add(new_product)
    session.commit()
    session.refresh(new_product)

    return {"message": "Product created successfully!"}


@router.patch(
    "/products/{product_id}",
    response_model=ProductPublic,
    dependencies=[Depends(validate_token)],
)
async def update_product(product_id: int, product: ProductUpdate, session: SessionDep):
    product_db = session.get(Product, product_id)

    if not product_db:
        raise HTTPException(status_code=404, detail="Product not found")

    product_data = product.model_dump(exclude_unset=True)
    product_db.sqlmodel_update(product_data)
    session.add(product_db)
    session.commit()
    session.refresh(product_db)

    return product_db


@router.delete("/products/{product_id}", dependencies=[Depends(validate_token)])
async def delete_product(product_id: int, session: SessionDep):
    product = session.get(Product, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    session.delete(product)
    session.commit()

    return {"message": "Product deleted successfully!"}
