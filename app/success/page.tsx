"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#07130d] text-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center py-20">
        <Container>
          <div className="relative max-w-2xl mx-auto text-center">

            {/* GLOW BACKGROUND */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
              <div className="w-72 h-72 bg-green-500 rounded-full mx-auto"></div>
            </div>

            {/* CARD */}
            <div className="bg-[#102E1C]/80 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 md:p-14 shadow-2xl">

              {/* ICON */}
              <div className="w-28 h-28 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 size={64} className="text-green-400" />
              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-5xl font-black mt-8">
                Ariza muvaffaqiyatli yuborildi
              </h1>

              <p className="text-white/60 text-lg mt-6 leading-relaxed">
                Sizning buyurtmangiz qabul qilindi. Operatorlar tez orada siz bilan bog‘lanadi va tafsilotlarni tasdiqlaydi.
              </p>

              {/* STATUS BADGE */}
              <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Kutilmoqda
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col md:flex-row gap-4 mt-10">
                <Link href="/" className="flex-1">
                  <Button className="w-full">
                    🏠 Bosh sahifa
                  </Button>
                </Link>

                <Link href="/equipment" className="flex-1">
                  <Button className="w-full bg-white/10 hover:bg-white/20">
                    🚜 Texnikalarni ko‘rish
                  </Button>
                </Link>
              </div>

              {/* SMALL NOTE */}
              <p className="text-white/30 text-xs mt-8">
                Siz istalgan vaqtda yangi buyurtma berishingiz mumkin
              </p>

            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}