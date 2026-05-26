"use client";

import { useState, useCallback, memo } from "react";

import Button from "../ui/Button";
import BookingModal from "./BookingModal";

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

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* BOOKING */}
        <Button onClick={openModal} className="flex-1">
          Buyurtma berish
        </Button>

        {/* OPERATOR */}
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

      {/* MODAL */}
      <BookingModal
        isOpen={open}
        onClose={closeModal}
        equipmentName={equipmentName}
        pricePerDay={pricePerDay}
      />
    </>
  );
}

export default memo(EquipmentDetailClient);