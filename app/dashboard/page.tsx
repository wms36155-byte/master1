"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";

import { getBookings } from "@/services/booking.service";

import { Booking } from "@/types/booking.types";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<
    Booking[]
  >([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings();

      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-green-400">
                Dashboard
              </span>

              <h1 className="text-5xl font-black mt-2">
                Buyurtmalar
              </h1>
            </div>
          </div>

          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#102E1C] rounded-3xl p-6 border border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {booking.equipmentName}
                    </h2>

                    <p className="text-white/50 mt-2">
                      {booking.days} kun
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-green-400">
                      {booking.totalPrice.toLocaleString()} so‘m
                    </h3>
                  </div>

                  <div className="text-white/40">
                    {new Date(
                      booking.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}