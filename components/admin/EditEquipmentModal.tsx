"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { useState } from "react";
import ImageUpload from "../ui/ImageUpload";
import {
  Equipment,
  CreateEquipmentDto,
} from "@/types/equipment.types";

import {
  updateEquipment,
} from "@/services/equipment.service";

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
  } = useForm<CreateEquipmentDto>();
  
const [imageUrl, setImageUrl] =
  useState("");
  useEffect(() => {
    if (equipment) {
      setImageUrl(equipment.image);
      reset({
        name: equipment.name,
        category: equipment.category,
        image: equipment.image,

        pricePerHour:
          equipment.pricePerHour,

        pricePerDay:
          equipment.pricePerDay,

        pricePerMonth:
          equipment.pricePerMonth,

        operatorAvailable:
          equipment.operatorAvailable,

        location: equipment.location,

        rating: equipment.rating,

        description:
          equipment.description,
      });
    }
  }, [equipment, reset]);

  if (!isOpen || !equipment)
    return null;

  const onSubmit = async (
    data: CreateEquipmentDto
  ) => {
    try {
      await updateEquipment(
        equipment.id,
        {
          ...data,

          pricePerHour: Number(
            data.pricePerHour
          ),
image: imageUrl,
          pricePerDay: Number(
            data.pricePerDay
          ),

          pricePerMonth: Number(
            data.pricePerMonth
          ),

          rating: Number(
            data.rating
          ),
        }
      );

      toast.success(
        "Texnika yangilandi"
      );

      refetch();

      onClose();
    } catch (error) {
      toast.error("Xatolik");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#102E1C] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black">
            Texnikani tahrirlash
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-white/60"
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
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            placeholder="Kategoriya"
            {...register("category")}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

         <div className="md:col-span-2">
  <ImageUpload
    value={imageUrl}
    onChange={setImageUrl}
  />
</div>

          <input
            type="number"
            placeholder="Soatlik narx"
            {...register(
              "pricePerHour"
            )}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="Kunlik narx"
            {...register(
              "pricePerDay"
            )}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="Oylik narx"
            {...register(
              "pricePerMonth"
            )}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            placeholder="Location"
            {...register("location")}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            {...register("rating")}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <textarea
            placeholder="Description"
            {...register(
              "description"
            )}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2 h-32"
          />

          <label className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              {...register(
                "operatorAvailable"
              )}
            />

            <span>
              Operator mavjud
            </span>
          </label>

          <Button
            type="submit"
            className="md:col-span-2"
          >
            Yangilash
          </Button>
        </form>
      </div>
    </div>
  );
}