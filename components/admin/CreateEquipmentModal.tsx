"use client";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import Button from "../ui/Button";

import {
  CreateEquipmentDto,
} from "@/types/equipment.types";

import {
  createEquipment,
} from "@/services/equipment.service";

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
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateEquipmentDto>();

  if (!isOpen) return null;

  const onSubmit = async (
    data: CreateEquipmentDto
  ) => {
    try {
      await createEquipment({
        ...data,

        pricePerHour: Number(
          data.pricePerHour
        ),

        pricePerDay: Number(
          data.pricePerDay
        ),

        pricePerMonth: Number(
          data.pricePerMonth
        ),

        rating: Number(data.rating),
      });

      toast.success(
        "Texnika qo‘shildi"
      );

      reset();

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
            Texnika qo‘shish
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

          <input
            placeholder="Image URL"
            {...register("image")}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none md:col-span-2"
          />

          <input
            type="number"
            placeholder="Soatlik narx"
            {...register("pricePerHour")}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="Kunlik narx"
            {...register("pricePerDay")}
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="Oylik narx"
            {...register("pricePerMonth")}
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
            {...register("description")}
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
            Saqlash
          </Button>
        </form>
      </div>
    </div>
  );
}