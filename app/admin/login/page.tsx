"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";

import {
  useAdminStore,
} from "@/store/admin.store";

export default function AdminLoginPage() {
  const router = useRouter();

  const login = useAdminStore(
    (state) => state.login
  );

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {
    const success = login(
      username,
      password
    );

    if (success) {
      toast.success(
        "Admin panelga xush kelibsiz"
      );

      router.push("/admin");
    } else {
      toast.error(
        "Login yoki parol noto‘g‘ri"
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto bg-[#102E1C] border border-white/10 rounded-3xl p-8">
          <h1 className="text-4xl font-black text-center">
            Admin Login
          </h1>

          <div className="space-y-5 mt-8">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <Button
              className="w-full"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}