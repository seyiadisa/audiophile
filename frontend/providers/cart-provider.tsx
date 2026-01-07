"use client";

import { Cart, CartItem } from "@/types";
import { createContext, useContext, useState } from "react";

const VAT_RATE = 0.2;

type CartContextType = {
  cart: Cart;
  vat: number;
  shipping: number;
  totalCartPrice: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cart;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>([]);

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const vat = totalCartPrice * VAT_RATE;
  const shipping = 50;
  const totalPrice = totalCartPrice + vat + shipping;

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((i) => i.id === item.id);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        vat,
        shipping,
        totalCartPrice,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
