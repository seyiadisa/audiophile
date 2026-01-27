"use server";

import { newProductSchema } from "@/schema";
import { NewProductData, NewProductError } from "@/types";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

type State = {
  success: boolean;
  data: NewProductData;
  errors: NewProductError;
  message?: string;
};

export default async function createNewProduct(
  token: string,
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
      errors,
    };
  }

  const res = await fetch(`${process.env.API_BASE_URL}/products`, {
    body: formData,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    redirect("/admin/login");
  }

  const resData = await res.json();

  console.log(resData);

  if (res.status !== 201) {
    return {
      success: false,
      data: validatedData.data,
      errors: {},
      message: Array.isArray(resData.detail)
        ? resData.detail[0].msg
        : resData.detail,
    };
  }

  return {
    success: true,
    data: {} as NewProductData,
    errors: {} as NewProductError,
    message: resData.message,
  };
}
