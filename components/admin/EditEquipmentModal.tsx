"use client";

import { useEffect, useState } from "react";
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
  const { register, handleSubmit, reset } =
    useForm<CreateEquipmentDto>();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!equipment) return;

    setImageUrl(equipment.image || "");

    reset({
      name: equipment.name,
      category: equipment.category,
      pricePerHour: equipment.pricePerHour,
      pricePerDay: equipment.pricePerDay,
      pricePerMonth: equipment.pricePerMonth,
      location: equipment.location,
      rating: equipment.rating,
      description: equipment.description,
      operatorAvailable: equipment.operatorAvailable,
    });
  }, [equipment, reset]);

  if (!isOpen || !equipment) return null;

  const onSubmit = async (data: CreateEquipmentDto) => {
    try {
      await updateEquipment(equipment.id, {
        ...data,
        image: imageUrl,

        pricePerHour: Number(data.pricePerHour || 0),
        pricePerDay: Number(data.pricePerDay || 0),
        pricePerMonth: Number(data.pricePerMonth || 0),

        // ✅ FIXED
        rating: data.rating || 0,
      });

      toast.success("Texnika yangilandi");

      refetch();
      onClose();
    } catch {
      toast.error("Xatolik");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#102E1C] border border-white/10 rounded-3xl p-8">

        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-black">Tahrirlash</h2>
          <button onClick={onClose} className="text-3xl">×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-5">

          <input placeholder="Nomi" {...register("name")} className="input" />
          <input placeholder="Kategoriya" {...register("category")} className="input" />

          <div className="md:col-span-2">
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>

          <input type="number" placeholder="Soatlik narx" {...register("pricePerHour")} className="input" />
          <input type="number" placeholder="Kunlik narx" {...register("pricePerDay")} className="input" />
          <input type="number" placeholder="Oylik narx" {...register("pricePerMonth")} className="input" />

          <input placeholder="Location" {...register("location")} className="input" />

          {/* ✅ FIX */}
          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            {...register("rating", { valueAsNumber: true })}
            className="input"
          />

          <textarea
            placeholder="Description"
            {...register("description")}
            className="input md:col-span-2 h-32"
          />

          <label className="flex items-center gap-3 md:col-span-2">
            <input type="checkbox" {...register("operatorAvailable")} />
            <span>Operator mavjud</span>
          </label>

          <Button type="submit" className="md:col-span-2">
            Yangilash
          </Button>

        </form>
      </div>
    </div>
  );
}