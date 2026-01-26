from fastapi import APIRouter

from app.api.routes.admin import router as admin_router
from app.api.routes.product import router as product_router

# from app.api.routes.order import router as order_router

api_router = APIRouter()

api_router.include_router(admin_router, tags=["Admin"])
api_router.include_router(product_router, tags=["Product"])
# api_router.include_router(order_router, tags=["order"])
