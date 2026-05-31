"use client";

import { useState, useCallback, memo } from "react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import BookingModal from "./BookingModal";
import { createBooking } from "@/services/booking.service";

type Props = {
  equipmentName: string;
  pricePerDay: number;
  operatorAvailable?: boolean;
};

function EquipmentDetailClient({
  equipmentName,
  pricePerDay,
  operatorAvailable = false,
}: Props) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  // ✅ MUHIM: REAL SUBMIT
  const handleSubmit = async (data: {
    customerName: string;
    phone: string;
    days: number;
    withOperator: boolean;
  }) => {
    try {
      await createBooking({
        equipmentName,
        customerName: data.customerName,
        phone: data.phone,
        days: data.days,
        withOperator: data.withOperator,
        totalPrice: data.days * pricePerDay,
        createdAt: new Date().toISOString(),
      });

      toast.success("Buyurtma yuborildi");
      setOpen(false);
    } catch {
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={openModal} className="flex-1">
          Buyurtma berish
        </Button>

        <Button
          disabled={!operatorAvailable}
          className={`flex-1 ${
            operatorAvailable
              ? "bg-white/10 hover:bg-white/20"
              : "bg-white/5 cursor-not-allowed opacity-50"
          }`}
        >
          Operator bilan
        </Button>
      </div>

      <BookingModal
        isOpen={open}
        onClose={closeModal}
        equipmentName={equipmentName}
        pricePerDay={pricePerDay}
        onSubmit={handleSubmit}   // ✅ FIX
      />
    </>
  );
}

export default memo(EquipmentDetailClient);