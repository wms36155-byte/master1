"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  Trash2,
} from "lucide-react";

import {
  getBookings,
  deleteBooking,
} from "@/services/booking.service";

type Booking = {
  id: string;

  equipmentName: string;

  customerName: string;

  phone: string;

  totalPrice: number;

  days: number;
};

export default function BookingTable() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const fetchData =
    async () => {
      try {
        const data =
          await getBookings();

        setBookings(data);
      } catch {
        toast.error(
          "Bookinglarni olishda xatolik"
        );
      }
    };

  const handleDelete =
    async (id: string) => {
      try {
        await deleteBooking(id);

        toast.success(
          "Booking o‘chirildi"
        );

        fetchData();
      } catch {
        toast.error(
          "Xatolik yuz berdi"
        );
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#102E1C] border border-white/10 rounded-3xl overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-white/10">
          <tr>
            <th className="p-5 text-left">
              Texnika
            </th>

            <th className="p-5 text-left">
              Mijoz
            </th>

            <th className="p-5 text-left">
              Telefon
            </th>

            <th className="p-5 text-left">
              Kun
            </th>

            <th className="p-5 text-left">
              Narx
            </th>

            <th className="p-5 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(
            (booking) => (
              <tr
                key={booking.id}
                className="border-b border-white/5"
              >
                <td className="p-5 font-bold">
                  {
                    booking.equipmentName
                  }
                </td>

                <td className="p-5">
                  {
                    booking.customerName
                  }
                </td>

                <td className="p-5">
                  {booking.phone}
                </td>

                <td className="p-5">
                  {booking.days}
                </td>

                <td className="p-5 text-green-400">
                  {booking.totalPrice.toLocaleString()}
                </td>

                <td className="p-5">
                  <button
                    onClick={() =>
                      handleDelete(
                        booking.id
                      )
                    }
                    className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center"
                  >
                    <Trash2
                      size={18}
                      className="text-red-400"
                    />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}