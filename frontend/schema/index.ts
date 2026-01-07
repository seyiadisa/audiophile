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
