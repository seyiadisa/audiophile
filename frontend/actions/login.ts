"use server";

import { loginSchema } from "@/schema";
import { LoginError } from "@/types";
import { z } from "zod/v4";

export type LoginState = {
  success: boolean;
  errors: LoginError;
  message: string;
};

export default async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Invalid credentials",
    };
  }

  return {
    success: true,
    message: "Login Success",
    errors: {},
  };
}
