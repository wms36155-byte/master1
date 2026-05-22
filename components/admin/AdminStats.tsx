"use client";

import { useEffect, useState } from "react";

import {
  DollarSign,
  Truck,
  ShoppingCart,
} from "lucide-react";

import { getEquipments } from "@/services/equipment.service";

import { getBookings } from "@/services/booking.service";

import { Equipment } from "@/types/equipment.types";

import { Booking } from "@/types/booking.types";

export default function AdminStats() {
  const [equipments, setEquipments] =
    useState<Equipment[]>([]);

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const equipmentData =
        await getEquipments();

      const bookingData =
        await getBookings();

      setEquipments(equipmentData);

      setBookings(bookingData);
    };

    fetchData();
  }, []);

  const totalRevenue =
    bookings.reduce(
      (acc, item) =>
        acc + item.totalPrice,
      0
    );

  const stats = [
    {
      title: "Daromad",
      value: `${(
        totalRevenue / 1000000
      ).toFixed(1)}M`,
      icon: DollarSign,
    },

    {
      title: "Texnikalar",
      value: equipments.length,
      icon: Truck,
    },

    {
      title: "Buyurtmalar",
      value: bookings.length,
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-[#102E1C] border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50">
                  {item.title}
                </p>

                <h2 className="text-4xl font-black mt-3">
                  {item.value}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <Icon
                  size={28}
                  className="text-green-400"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}