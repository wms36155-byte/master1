"use client";

import Link from "next/link";
import Container from "./Container";
import Button from "../ui/Button";

const navLinks = [
  {
    name: "Bosh sahifa",
    href: "/",
  },
  {
    name: "Texnikalar",
    href: "/equipment",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Admin",
    href: "/admin",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/20">
      <Container className="flex items-center justify-between h-20">
        <Link href="/">
          <h1 className="text-3xl font-black">
            Master<span className="text-green-500">Laser</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-white/80 hover:text-green-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Button>Login</Button>
      </Container>
    </header>
  );
}