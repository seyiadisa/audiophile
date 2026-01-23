"use server";

import { newProductSchema } from "@/schema";
import { NewProductData, NewProductError } from "@/types";
import { z } from "zod/v4";

type State = {
  success: boolean;
  data: NewProductData;
  error: NewProductError;
};

export default async function createNewProduct(
  _prevState: State,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedData = newProductSchema.safeParse({
    ...data,
    inTheBox: JSON.parse(data.inTheBox as string),
  });

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error).fieldErrors;

    return {
      success: false,
      data: data as unknown as NewProductData,
      error: errors,
    };
  }

  return { success: true, data: validatedData.data, error: {} };
}
