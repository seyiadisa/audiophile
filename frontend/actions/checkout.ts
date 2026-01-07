"use server";
import { checkoutSchema } from "@/schema";
import type { CheckoutData, CheckoutError } from "@/types";
import { z } from "zod/v4";

type State = {
  data: CheckoutData;
  error: CheckoutError;
};

export default async function checkout(_prevState: State, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedData = checkoutSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error).fieldErrors;
    return { data: data as CheckoutData, error: errors };
  }

  return { data: validatedData.data, error: {} };
}
