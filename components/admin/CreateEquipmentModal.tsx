"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../ui/Button";

import { CreateEquipmentDto } from "@/types/equipment.types";
import { createEquipment } from "@/services/equipment.service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function CreateEquipmentModal({
  isOpen,
  onClose,
  refetch,
}: Props) {
  const { register, handleSubmit, reset } =
    useForm<CreateEquipmentDto>();

  const [imageUrl, setImageUrl] = useState("");

  if (!isOpen) return null;

  const onSubmit = async (data: CreateEquipmentDto) => {
    try {
      await createEquipment({
        ...data,
        image: imageUrl,

        pricePerHour: Number(data.pricePerHour || 0),
        pricePerDay: Number(data.pricePerDay || 0),
        pricePerMonth: Number(data.pricePerMonth || 0),

        rating: data.rating || 5,
      });

      toast.success("Texnika qo‘shildi 🚜");

      reset();
      setImageUrl("");
      refetch();
      onClose();
    } catch {
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#102E1C] border border-white/10 rounded-3xl p-8">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-black">
            Texnika qo‘shish
          </h2>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            placeholder="Nomi"
            {...register("name")}
            className="input"
          />

          <input
            placeholder="Kategoriya"
            {...register("category")}
            className="input"
          />

          {/* IMAGE URL */}
          <div className="md:col-span-2 space-y-3">
            <input
              type="url"
              placeholder="Rasm URL"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(e.target.value)
              }
              className="input w-full"
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-60 object-cover rounded-xl border border-white/10"
              />
            )}
          </div>

          <input
            type="number"
            placeholder="Soatlik narx"
            {...register("pricePerHour")}
            className="input"
          />

          <input
            type="number"
            placeholder="Kunlik narx"
            {...register("pricePerDay")}
            className="input"
          />

          <input
            type="number"
            placeholder="Oylik narx"
            {...register("pricePerMonth")}
            className="input"
          />

          <input
            placeholder="Joylashuv"
            {...register("location")}
            className="input"
          />

          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            {...register("rating", {
              valueAsNumber: true,
            })}
            className="input"
          />

          <textarea
            placeholder="Description"
            {...register("description")}
            className="input md:col-span-2 h-32"
          />

          <label className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              {...register("operatorAvailable")}
            />
            <span>Operator mavjud</span>
          </label>

          <Button
            type="submit"
            className="md:col-span-2"
          >
            Saqlash
          </Button>
        </form>
      </div>
    </div>
  );
}