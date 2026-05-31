"use client";

import { useState } from "react";
import Button from "../ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  equipmentName: string;
  pricePerDay: number;

  onSubmit: (data: {
    customerName: string;
    phone: string;
    days: number;
    withOperator: boolean;
  }) => void;
};

export default function BookingModal({
  isOpen,
  onClose,
  equipmentName,
  pricePerDay,
  onSubmit,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [days, setDays] = useState(1);
  const [withOperator, setWithOperator] = useState(false);

  if (!isOpen) return null;

  const totalPrice = days * pricePerDay + (withOperator ? 500000 : 0);

  const handleSubmit = () => {
    if (!customerName || !phone) return;

    onSubmit({
      customerName,
      phone,
      days,
      withOperator,
    });
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#102E1C] p-8 rounded-3xl w-full max-w-xl">
        <h2 className="text-3xl font-black mb-6">
          Buyurtma: {equipmentName}
        </h2>

        <input
          className="input w-full mb-4"
          placeholder="Ism"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          className="input w-full mb-4"
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="number"
          className="input w-full mb-4"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={withOperator}
            onChange={(e) => setWithOperator(e.target.checked)}
          />
          Operator bilan
        </label>

        <div className="text-green-400 font-black text-2xl mb-6">
          {totalPrice.toLocaleString()} so‘m
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Yuborish
        </Button>
      </div>
    </div>
  );
}