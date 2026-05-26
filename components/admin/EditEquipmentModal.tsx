"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import ImageUpload from "../ui/ImageUpload";

import { Equipment, CreateEquipmentDto } from "@/types/equipment.types";
import { updateEquipment } from "@/services/equipment.service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment | null;
  refetch: () => void;
};

export default function EditEquipmentModal({
  isOpen,
  onClose,
  equipment,
  refetch,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateEquipmentDto>();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!equipment) return;

    setImageUrl(equipment.image || "");

    reset({
      name: equipment.name || "",
      category: equipment.category || "",
      pricePerHour: equipment.pricePerHour || 0,
      pricePerDay: equipment.pricePerDay || 0,
      pricePerMonth: equipment.pricePerMonth || 0,
      location: equipment.location || "",
      rating: equipment.rating || 0,
      description: equipment.description || "",
      operatorAvailable: equipment.operatorAvailable || false,
    });
  }, [equipment, reset]);

  if (!isOpen || !equipment) return null;

  const onSubmit = async (data: CreateEquipmentDto) => {
    try {
      await updateEquipment(equipment.id, {
        ...data,
        image: imageUrl,
        pricePerHour: Number(data.pricePerHour),
        pricePerDay: Number(data.pricePerDay),
        pricePerMonth: Number(data.pricePerMonth),
        rating: Number(data.rating),
      });

      toast.success("Texnika yangilandi");
      refetch();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-3">

      {/* MODAL */}
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f2a1b] border border-white/10 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold">
              ✏️ Texnikani tahrirlash
            </h2>
            <p className="text-white/40 text-xs">
              Ma’lumotlarni yangilang
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 p-5"
        >

          {/* NAME + CATEGORY */}
          <div className="grid grid-cols-2 gap-3">
            <input
              {...register("name")}
              className="input text-sm h-10"
              placeholder="Nomi"
            />

            <input
              {...register("category")}
              className="input text-sm h-10"
              placeholder="Kategoriya"
            />
          </div>

          {/* IMAGE */}
          <div>
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>

          {/* PRICES */}
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              {...register("pricePerHour", { valueAsNumber: true })}
              className="input text-sm h-10"
              placeholder="Soat"
            />

            <input
              type="number"
              {...register("pricePerDay", { valueAsNumber: true })}
              className="input text-sm h-10"
              placeholder="Kun"
            />

            <input
              type="number"
              {...register("pricePerMonth", { valueAsNumber: true })}
              className="input text-sm h-10"
              placeholder="Oy"
            />
          </div>

          {/* LOCATION + RATING */}
          <div className="grid grid-cols-2 gap-3">
            <input
              {...register("location")}
              className="input text-sm h-10"
              placeholder="Joylashuv"
            />

            <input
              type="number"
              step="0.1"
              {...register("rating", { valueAsNumber: true })}
              className="input text-sm h-10"
              placeholder="⭐"
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            {...register("description")}
            className="input text-sm h-20 resize-none"
            placeholder="Tavsif..."
          />

          {/* CHECKBOX */}
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" {...register("operatorAvailable")} />
            Operator mavjud
          </label>

          {/* ACTION */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-white/10 hover:bg-white/20 text-sm py-2"
            >
              Bekor
            </Button>

            <Button
              type="submit"
              className="w-1/2 text-sm py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}