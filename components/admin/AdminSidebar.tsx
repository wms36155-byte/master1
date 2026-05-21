"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Truck,
  ShoppingCart,
  Users,
} from "lucide-react";

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
    title: "Operatorlar",
    href: "/admin/operators",
    icon: Users,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#102E1C] border-r border-white/10 p-6 hidden lg:block">
      <h1 className="text-3xl font-black">
        Master
        <span className="text-green-500">
          Laser
        </span>
      </h1>

      <div className="mt-12 flex flex-col gap-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all text-white/80 hover:text-white"
            >
              <Icon size={20} />

              <span>{link.title}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}