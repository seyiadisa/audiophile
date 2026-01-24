"use server";

import { loginSchema } from "@/schema";
import { LoginData, LoginError } from "@/types";
import { z } from "zod/v4";

export type LoginState = {
  success: boolean;
  errors: LoginError;
  data: LoginData;
  message?: string;
  token?: string;
};

const API_URL = process.env.API_BASE_URL;

export default async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = loginSchema.safeParse({
    ...data,
    rememberMe: !!formData.get("rememberMe"),
  } as LoginData);

  if (!validatedFields.success) {
    return {
      success: false,
      data: data as unknown as LoginData,
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    body: formData,
  });

  const resData = await res.json();

  if (res.status !== 200) {
    return {
      success: false,
      errors: {},
      data: validatedFields.data,
      message: Array.isArray(resData.detail)
        ? resData.detail[0].msg
        : resData.detail,
    };
  }

  return {
    success: true,
    message: "Login Success",
    data: validatedFields.data,
    errors: {},
    token: resData.access_token,
  };
}
