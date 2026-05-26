"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Truck,
  ShoppingCart,
  Users,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import clsx from "clsx";
import toast from "react-hot-toast";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Texnikalar",
    href: "/admin/equipments",
    icon: Truck,
  },
  {
    title: "Buyurtmalar",
    href: "/admin/bookings",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Operators",
    href: "/admin/operators",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    toast.success("Tizimdan chiqildi");

    router.replace("/");
  };

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-[#0d2417] via-[#0a1f14] to-[#07130d] border-r border-white/10 flex flex-col px-6 py-8 relative overflow-hidden">
      
      {/* GLOW */}
      <div className="absolute top-0 left-0 w-full h-64 bg-green-500/10 blur-3xl pointer-events-none" />

      {/* LOGO */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-400/20 flex items-center justify-center">
            <ShieldCheck size={28} className="text-green-400" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Master <span className="text-green-400">Laser</span>
            </h1>
            <p className="text-white/40 text-sm mt-1">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="relative z-10 flex flex-col gap-2 mt-12 flex-1">
        {links.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden border",

                isActive
                  ? "bg-green-500/15 border-green-400/20 text-white shadow-lg shadow-green-500/10"
                  : "border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {/* ACTIVE BAR */}
              <span
                className={clsx(
                  "absolute left-0 top-0 h-full w-1 rounded-r-full transition-all duration-300",
                  isActive ? "bg-green-400" : "bg-transparent"
                )}
              />

              <Icon
                size={22}
                className={clsx(
                  "relative z-10 transition-all duration-300",
                  isActive
                    ? "text-green-300 scale-110"
                    : "group-hover:scale-110 group-hover:text-white"
                )}
              />

              <span className="relative z-10 font-semibold tracking-wide">
                {link.title}
              </span>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/[0.03] transition-all duration-300" />
            </Link>
          );
        })}
      </div>

      {/* USER */}
      <div className="relative z-10 bg-white/[0.03] border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-xl font-black text-green-400">
            A
          </div>

          <div>
            <h3 className="font-bold text-lg">Admin</h3>
            <p className="text-white/40 text-sm">admin@gmail.com</p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full mt-5 flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 text-red-300 hover:text-red-200 py-4 rounded-2xl transition-all duration-300 font-semibold"
        >
          <LogOut size={20} />
          Chiqish
        </button>
      </div>
    </aside>
  );
}