"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Texnikalar",
    href: "/admin/equipments",
  },
  {
    title: "Buyurtmalar",
    href: "/admin/bookings",
  },
];

export default function MobileSidebar() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="lg:hidden"
      >
        <Menu size={28} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md">
          <div className="w-72 h-full bg-[#102E1C] p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-black">
                MasterLaser
              </h1>

              <button
                onClick={() =>
                  setOpen(false)
                }
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-10">
              {links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="bg-white/5 hover:bg-white/10 transition-all rounded-2xl px-5 py-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}