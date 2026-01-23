import { checkoutSchema, loginSchema, newProductSchema } from "@/schema";
import { StaticImageData } from "next/image";
import { z } from "zod/v4";

export type Product = {
  isNew: boolean;
  name: string;
  shortName?: string;
  image: StaticImageData | string;
  price: number;
  details: string;
  features: string;
  inTheBox: {
    [key: string]: number;
  };
  category: "headphones" | "speakers" | "earphones";
};

export type Products = {
  [key: string]: Product;
};

export type CartItem = {
  id: string;
  shortName?: string;
  name: string;
  price: number;
  quantity: number;
  image: StaticImageData;
};

export type Cart = CartItem[];

export type CheckoutData = z.infer<typeof checkoutSchema>;

export type CheckoutError =
  z.core.$ZodFlattenedError<CheckoutData>["fieldErrors"];

export type LoginData = z.infer<typeof loginSchema>;

export type LoginError = z.core.$ZodFlattenedError<LoginData>["fieldErrors"];

export type NewProductData = z.infer<typeof newProductSchema>;

export type NewProductError =
  z.core.$ZodFlattenedError<NewProductData>["fieldErrors"];
