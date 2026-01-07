import { checkoutSchema } from "@/schema";
import { StaticImageData } from "next/image";
import { z } from "zod/v4";

export type Product = {
  isNew: boolean;
  name: string;
  shortName?: string;
  image: StaticImageData;
  price: number;
  details: string;
  features: string;
  inTheBox: {
    [key: string]: number;
  };
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
