import { z } from "zod/v4";

export const checkoutSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
    paymentMethod: z
      .enum(["e-money", "cash"])
      .refine((val) => val, { message: "Payment method is required" }),
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "e-money") {
      if (!data.eMoneyNumber) {
        ctx.addIssue({
          code: "custom",
          message: "e-Money Number is required",
          path: ["eMoneyNumber"],
        });
      }
      if (!data.eMoneyPin) {
        ctx.addIssue({
          code: "custom",
          message: "e-Money PIN is required",
          path: ["eMoneyPin"],
        });
      }
    }
  });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Please enter a password"),
  rememberMe: z.boolean({ error: "Invalid value for remember me" }),
});

export const newProductSchema = z.object({
  shortName: z.string().min(1, "Short name is required"),
  name: z.string().min(1, "Name is required"),
  price: z.string().regex(/^\d+$/, "Invalid price format"),
  details: z.string().min(1, "Product details are required"),
  features: z.string().min(1, "Features is required"),
  category: z
    .enum(["headphones", "speakers", "earphones"])
    .refine((val) => val, { message: "Product category is required" }),
  inTheBox: z
    .record(
      z.string(),
      z
        .string()
        .regex(/^\d+$/, { error: "Invalid quantity format", abort: true })
    )
    .refine((val) => Object.keys(val).length > 0, {
      error: "At least one item is required in the box",
    })
    .refine(
      (val) =>
        Object.entries(val).every(([key, value]) => {
          return value !== "" && key !== "";
        }),
      {
        error: "No empty fields allowed",
      }
    ),
  image: z
    .instanceof(File)
    .nullable()
    .refine((file) => file && file.type.includes("image/"), {
      error: "Only images are allowed",
    }),
});
