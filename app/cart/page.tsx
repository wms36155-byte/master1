"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/equipment/BookingModal";

import { useCartStore } from "@/store/cart.store";
import { createBooking } from "@/services/booking.service";

export default function CartPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [openBooking, setOpenBooking] = useState(false);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.pricePerDay * item.quantity,
    0
  );

  const handleOpen = () => {
    if (!items.length) {
      toast.error("Savatcha bo‘sh");
      return;
    }
    setOpenBooking(true);
  };

  const handleSubmitBooking = async (data: {
    customerName: string;
    phone: string;
  }) => {
    try {
      await Promise.all(
        items.map((item) =>
          createBooking({
            equipmentName: item.name,
            customerName: data.customerName,
            phone: data.phone,
            days: item.quantity,
            totalPrice: item.pricePerDay * item.quantity,
            withOperator: false,
            createdAt: new Date().toISOString(),
          })
        )
      );

      clearCart();
      setOpenBooking(false);

      router.push("/success");
      toast.success("Ariza yuborildi");
    } catch {
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <main className="min-h-screen bg-[#07130d] text-white">
      <Navbar />

      <section className="py-16">
        <Container>

          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-5xl font-black tracking-tight">
              🛒 Savatcha
            </h1>
            <p className="text-white/50 mt-3 text-lg">
              Tanlangan texnikalar va buyurtma jarayoni
            </p>
          </div>

          {/* EMPTY STATE */}
          {items.length === 0 ? (
            <div className="bg-[#102E1C]/80 backdrop-blur-xl border border-white/10 rounded-[40px] p-16 text-center shadow-xl">
              
              <div className="text-6xl mb-4">🛒</div>

              <h2 className="text-4xl font-black">
                Savatcha bo‘sh
              </h2>

              <p className="text-white/50 mt-4">
                Hozircha hech qanday texnika qo‘shilmagan
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                <Link href="/">
                  <Button className="w-full md:w-auto">
                    🏠 Bosh sahifa
                  </Button>
                </Link>

                <Link href="/equipment">
                  <Button className="bg-white/10 hover:bg-white/20 w-full md:w-auto">
                    🚜 Texnikalarni ko‘rish
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">

              {/* ITEMS */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col md:flex-row gap-5 bg-[#102E1C]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 hover:border-green-500/30 transition"
                  >
                    {/* IMAGE */}
                    <div className="relative w-full md:w-44 h-40">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="rounded-2xl object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {item.name}
                        </h2>

                        <p className="text-white/50 mt-2">
                          1 kun narxi
                        </p>

                        <p className="text-green-400 text-2xl font-black mt-1">
                          {item.pricePerDay.toLocaleString()} so‘m
                        </p>
                      </div>

                      <div className="mt-5 text-white/40 text-sm">
                        Miqdor:{" "}
                        <span className="text-white font-semibold">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-[#102E1C]/90 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-2xl">

                  <h2 className="text-3xl font-black">
                    Buyurtma
                  </h2>

                  <div className="mt-8 space-y-5">

                    <div className="flex justify-between text-white/60">
                      <span>Texnikalar</span>
                      <span className="text-white font-bold">
                        {items.length}
                      </span>
                    </div>

                    <div className="flex justify-between text-white/60">
                      <span>Jami summa</span>
                    </div>

                    <div className="text-3xl font-black text-green-400">
                      {totalPrice.toLocaleString()} so‘m
                    </div>
                  </div>

                  <Button
                    onClick={handleOpen}
                    className="w-full mt-10"
                  >
                    📩 Ariza yuborish
                  </Button>

                  <Link href="/equipment">
                    <p className="text-center text-white/40 mt-5 text-sm hover:text-white transition">
                      Yana texnika qo‘shish →
                    </p>
                  </Link>

                </div>
              </div>

            </div>
          )}

        </Container>
      </section>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
        equipmentName={`Cart (${items.length})`}
        pricePerDay={totalPrice}
        onSubmit={handleSubmitBooking}
      />
    </main>
  );
}