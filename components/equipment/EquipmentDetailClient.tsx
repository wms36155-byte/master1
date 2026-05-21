"use client";

import { useState } from "react";

import Button from "../ui/Button";
import BookingModal from "./BookingModal";

type Props = {
  equipmentName: string;
  pricePerDay: number;
};

export default function EquipmentDetailClient({
  equipmentName,
  pricePerDay,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4 mt-10">
        <Button
          className="flex-1"
          onClick={() => setOpen(true)}
        >
          Buyurtma berish
        </Button>

        <Button className="bg-white/10 hover:bg-white/20 flex-1">
          Operator bilan
        </Button>
      </div>

      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        equipmentName={equipmentName}
        pricePerDay={pricePerDay}
      />
    </>
  );
}