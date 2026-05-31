"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";

import { getBookings } from "@/services/booking.service";
import { Booking } from "@/types/booking.types";

import {
  Calendar,
  Package,
  DollarSign,
} from "lucide-react";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const totalIncome = bookings.reduce(
    (acc, b) => acc + b.totalPrice,
    0
  );

  return (
    <main className="min-h-screen bg-[#07130d] text-white">
      <Navbar />

      <section className="py-20">
        <Container>

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

            <div>
              <span className="text-green-400 font-semibold">
                Admin Dashboard
              </span>

              <h1 className="text-5xl font-black mt-2">
                Buyurtmalar 📦
              </h1>

              <p className="text-white/50 mt-3">
                Barcha mijozlar buyurtmalari
              </p>
            </div>

            {/* STATS */}
            <div className="flex gap-4">

              <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-4 min-w-[160px]">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Package size={16} />
                  Jami buyurtma
                </div>

                <p className="text-2xl font-black mt-2">
                  {bookings.length}
                </p>
              </div>

              <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-4 min-w-[180px]">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <DollarSign size={16} />
                  Daromad
                </div>

                <p className="text-2xl font-black mt-2 text-green-400">
                  {totalIncome.toLocaleString()} so‘m
                </p>
              </div>

            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="text-white/50">Yuklanmoqda...</div>
          ) : bookings.length === 0 ? (
            <div className="bg-[#102E1C] border border-white/10 rounded-3xl p-10 text-center">
              <h2 className="text-2xl font-bold">
                Hozircha buyurtmalar yo‘q
              </h2>
            </div>
          ) : (
            <div className="grid gap-5">

              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#102E1C] border border-white/10 rounded-3xl p-6 hover:bg-[#143823] transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* LEFT */}
                    <div className="space-y-2">

                      <h2 className="text-2xl font-bold">
                        {booking.equipmentName}
                      </h2>

                      <div className="flex items-center gap-4 text-white/50 text-sm">

                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(
                            booking.createdAt
                          ).toLocaleDateString()}
                        </span>

                        <span>
                          {booking.days} kun
                        </span>

                        <span className="text-green-400">
                          {booking.withOperator
                            ? "Operator bilan"
                            : "Operatorsiz"}
                        </span>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="text-right">
                      <p className="text-white/40 text-sm">
                        Jami summa
                      </p>

                      <p className="text-3xl font-black text-green-400">
                        {booking.totalPrice.toLocaleString()} so‘m
                      </p>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </Container>
      </section>
    </main>
  );
}