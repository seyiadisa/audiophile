"use client";

import login from "@/actions/login";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { LoginError } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function AdminLogin() {
  const router = useRouter();
  const auth = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    message: "",
    data: {
      email: "",
      password: "",
      rememberMe: false,
    },
    errors: {} as LoginError,
  });

  useEffect(() => {
    if (state.success && state.token) {
      auth.updateAccessToken(state.token, state.data.rememberMe);
      router.push("/admin/dashboard");
    }
  }, [auth, router, state.data.rememberMe, state.success, state.token]);

  return (
    <div className="flex min-h-screen w-full max-w-md items-center justify-center p-4">
      <div className="w-full rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Admin Login</h1>

        <form action={formAction} className="space-y-8">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email" data-invalid={!!state.errors?.email}>
                Email
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={state.data.email}
                placeholder="admin@example.com"
                aria-invalid={!!state.errors.email}
              />
              {state.errors?.email && (
                <p className="text-destructive mt-1 text-sm">
                  {state.errors.email[0]}
                </p>
              )}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="password"
                data-invalid={!!state.errors?.password}
              >
                Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  defaultValue={state.data.password}
                  aria-invalid={!!state.errors?.password}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-2 hover:bg-slate-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {state.errors?.password && (
                <p className="text-destructive mt-1 text-sm">
                  {state.errors.password[0]}
                </p>
              )}
            </Field>

            <Field>
              <div className="flex flex-row items-start justify-start gap-2">
                <Input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  defaultChecked={state.data.rememberMe}
                  className="accent-primary h-4 w-4! rounded border-gray-300"
                />
                <FieldLabel htmlFor="rememberMe" className="flex-1">
                  Remember Me
                </FieldLabel>
              </div>
              <span className="text-destructive block text-sm">
                {state.errors.rememberMe}
              </span>
            </Field>
          </FieldGroup>

          {!state.success && state.message && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-700">{state.message}</p>
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
