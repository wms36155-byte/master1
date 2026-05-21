"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createBooking } from "@/services/booking.service";
import Button from "../ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  equipmentName: string;
  pricePerDay: number;
};

export default function BookingModal({
  isOpen,
  onClose,
  equipmentName,
  pricePerDay,
}: Props) {
  const [days, setDays] = useState(1);

  const totalPrice = days * pricePerDay;

  if (!isOpen) return null;

  const handleBooking = async () => {
  try {
    await createBooking({
      equipmentName,
      days,
      totalPrice,
      createdAt: new Date().toISOString(),
    });

    toast.success("Buyurtma saqlandi");

    onClose();
  } catch (error) {
    toast.error("Xatolik yuz berdi");
  }
};

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#102E1C] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black">
            Booking
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-white/60 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="mt-8">
          <p className="text-white/50">
            Texnika
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {equipmentName}
          </h3>
        </div>

        <div className="mt-8">
          <label className="text-white/60">
            Kun soni
          </label>

          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) =>
              setDays(Number(e.target.value))
            }
            className="w-full mt-3 bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        <div className="mt-8 bg-black/20 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-white/60">
              Kunlik narx
            </span>

            <span>
              {pricePerDay.toLocaleString()} so‘m
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-white/60">
              Jami
            </span>

            <span className="text-3xl font-black text-green-400">
              {totalPrice.toLocaleString()} so‘m
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-8"
          onClick={handleBooking}
        >
          Tasdiqlash
        </Button>
      </div>
    </div>
  );
}