"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/auth.store";

type AuthUser = {
  id: number;
  fullName: string;
  email: string;
  role: "admin" | "user";
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ======================
      // ADMIN LOGIN
      // ======================
      if (email === "admin@gmail.com" && password === "123456") {
        const adminUser: AuthUser = {
          id: 1,
          fullName: "Admin",
          email,
          role: "admin",
        };

        login(adminUser, "admin-token");

        document.cookie =
          "token=admin-token; path=/; max-age=86400";

        toast.success("Admin panelga kirildi");

        router.push("/admin");
        return;
      }

      // ======================
      // USER LOGIN
      // ======================
      const normalUser: AuthUser = {
        id: 2,
        fullName: "User",
        email,
        role: "user",
      };

      login(normalUser, "user-token");

      document.cookie =
        "token=user-token; path=/; max-age=86400";

      toast.success("Tizimga kirildi");

      router.push("/");
    } catch (error) {
      toast.error("Login xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07130d] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[32px] p-8 text-white">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black">MasterLaser</h1>
          <p className="text-white/40 mt-3">Tizimga kirish</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 transition py-4 rounded-2xl font-bold text-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* TEST ACCOUNTS */}
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/40 space-y-2">
          <p>Admin: admin@gmail.com / 123456</p>
          <p>User: istalgan email/password</p>
        </div>

      </div>
    </main>
  );
}