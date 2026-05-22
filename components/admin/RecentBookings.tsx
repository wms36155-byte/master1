"use client";

import { useEffect, useState } from "react";

import { getBookings } from "@/services/booking.service";

import { Booking } from "@/types/booking.types";

export default function RecentBookings() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookings();

      setBookings(data.reverse());
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#102E1C] border border-white/10 rounded-3xl p-6 mt-10">
      <h2 className="text-3xl font-black mb-8">
        So‘nggi buyurtmalar
      </h2>

      <div className="space-y-4">
        {bookings
          .slice(0, 5)
          .map((booking) => (
            <div
              key={booking.id}
              className="bg-black/20 rounded-2xl p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {
                    booking.equipmentName
                  }
                </h3>

                <p className="text-white/50 mt-1">
                  {booking.days} kun
                </p>
              </div>

              <div className="text-right">
                <h3 className="text-green-400 font-black text-2xl">
                  {booking.totalPrice.toLocaleString()}
                </h3>

                <p className="text-white/40 text-sm mt-1">
                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}