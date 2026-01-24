"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = () => {
    auth.clearAccessToken();
    router.push("/admin/login");
  };

  return (
    <Button
      type="button"
      aria-label="Logout"
      onClick={handleLogout}
      className="bg-destructive hover:bg-destructive/80 w-auto px-6"
    >
      <LogOut />
    </Button>
  );
}
