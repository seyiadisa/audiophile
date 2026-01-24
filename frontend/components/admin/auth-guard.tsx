"use client";

import { useAuth } from "@/providers/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PROTECTED_ROUTES = ["/admin/dashboard"];

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading) {
      if (PROTECTED_ROUTES.includes(pathname) && !auth.accessToken) {
        router.replace("/admin/login");
      }
    }
  }, [auth.accessToken, auth.isLoading, pathname, router]);

  if (auth.isLoading) {
    return null;
  }

  if (PROTECTED_ROUTES.includes(pathname) && !auth.accessToken) return null;

  return <>{children}</>;
}
