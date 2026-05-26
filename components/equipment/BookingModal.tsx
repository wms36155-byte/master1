"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";

import {
  createBooking,
} from "@/services/booking.service";

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
  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [days, setDays] =
    useState(1);

  const [withOperator, setWithOperator] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const totalPrice =
    days * pricePerDay +
    (withOperator ? 500000 : 0);

  const handleBooking =
    async () => {
      try {
        setLoading(true);

        await createBooking({
          equipmentName,

          customerName,

          phone,

          days,

          totalPrice,

          withOperator,

          createdAt:
            new Date().toISOString(),
        });

        toast.success(
          "Buyurtma yuborildi"
        );

        onClose();
      } catch (error) {
        toast.error(
          "Xatolik yuz berdi"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#102E1C] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black">
            Buyurtma berish
          </h2>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Ismingiz"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Telefon raqam"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="Kun soni"
            value={days}
            onChange={(e) =>
              setDays(
                Number(e.target.value)
              )
            }
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={withOperator}
              onChange={(e) =>
                setWithOperator(
                  e.target.checked
                )
              }
            />

            <span>
              Operator bilan
            </span>
          </label>

          <div className="bg-black/20 rounded-2xl p-5">
            <p className="text-white/50">
              Jami narx
            </p>

            <h2 className="text-4xl font-black text-green-400 mt-2">
              {totalPrice.toLocaleString()}{" "}
              sum
            </h2>
          </div>

          <Button
            onClick={handleBooking}
            className="w-full"
          >
            {loading
              ? "Loading..."
              : "Buyurtma berish"}
          </Button>
        </div>
      </div>
    </div>
  );
}