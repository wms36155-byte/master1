import Link from "next/link";

import {
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/shared/Navbar";

import Container from "@/components/shared/Container";

import Button from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <main>
      <Navbar />

      <section className="py-32">
        <Container>
          <div className="max-w-2xl mx-auto bg-[#102E1C] border border-white/10 rounded-[40px] p-12 text-center">
            <div className="w-28 h-28 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2
                size={60}
                className="text-green-400"
              />
            </div>

            <h1 className="text-5xl font-black mt-10">
              Ariza yuborildi
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mt-6">
              Operatorlar siz bilan
              tez orada bog‘lanadi.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mt-10">
              <Link
                href="/"
                className="flex-1"
              >
                <Button className="w-full">
                  Bosh sahifa
                </Button>
              </Link>

              <Link
                href="/equipment"
                className="flex-1"
              >
                <Button className="bg-white/10 hover:bg-white/20 w-full">
                  Texnikalar
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}