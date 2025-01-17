"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    router.push("http://localhost:8000/api/v1/auth/google");
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-full bg-primary hover:bg-primary text-secondary"
    >
      เข้าสู่ระบบด้วย Gmail
    </Button>
  );
}
