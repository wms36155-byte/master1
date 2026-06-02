"use client";

import Link from "next/link";
import Container from "./Container";
import Button from "../ui/Button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

const navLinks = [
  { name: "Bosh sahifa", href: "/" },
  { name: "Texnikalar", href: "/equipment" },

];

export default function Navbar() {
  const items = useCartStore((state) => state.items);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/30">

      <Container className="flex items-center justify-between h-20">

        {/* LOGO */}
        <Link href="/" className="group">
          <h1 className="text-3xl font-black tracking-tight">
            Master
            <span className="text-green-500 group-hover:text-green-400 transition">
              Laser
            </span>
          </h1>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-white/70 hover:text-green-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          {/* FAVORITES */}
          <Link
            href="/favorites"
            className="text-sm text-white/70 hover:text-green-400 transition"
          >
           Yoqtirilganlar
          </Link>

          {/* CART */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-white hover:text-green-400 transition" />

            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 text-xs flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>

          {/* LOGIN (FIXED) */}
          <Link href="/login">
            <Button>
              Login
            </Button>
          </Link>

        </div>

      </Container>
    </header>
  );
}