"use client";

import login from "@/actions/login";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { LoginError } from "@/types";

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    message: "",
    errors: {} as LoginError,
  });

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
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                aria-invalid={!!state.errors?.password}
              />
              {state.errors?.password && (
                <p className="text-destructive mt-1 text-sm">
                  {state.errors.password[0]}
                </p>
              )}
            </Field>
          </FieldGroup>

          {!state.success && (
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
