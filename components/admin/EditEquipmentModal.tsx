
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../ui/Button";

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
    formState: { isSubmitting },
  } = useForm<CreateEquipmentDto>();

  const [imageUrl, setImageUrl] =
    useState("");

  useEffect(() => {
    if (!equipment) return;

    setImageUrl(
      equipment.image || ""
    );

    reset({
      name: equipment.name,
      category: equipment.category,
      image: equipment.image || "",
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
  }, [equipment, reset]);

  if (!isOpen || !equipment)
    return null;

  const onSubmit = async (
    data: CreateEquipmentDto
  ) => {
    try {
      const updated =
        await updateEquipment(
          equipment.id,
          {
            ...data,
            image: imageUrl,
            pricePerHour:
              Number(
                data.pricePerHour
              ) || 0,
            pricePerDay:
              Number(
                data.pricePerDay
              ) || 0,
            pricePerMonth:
              Number(
                data.pricePerMonth
              ) || 0,
            rating:
              Number(
                data.rating
              ) || 5,
          }
        );

      if (!updated) {
        toast.error(
          "Yangilashda xatolik"
        );
        return;
      }

      toast.success(
        "Texnika yangilandi 🚜"
      );

      refetch();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        "Xatolik yuz berdi"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#102E1C] border border-white/10 p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black">
              ✏️ Texnikani tahrirlash
            </h2>

            <p className="text-white/40 mt-1">
              Texnika ma'lumotlarini yangilang
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            {...register("name")}
            placeholder="Nomi"
            className="input"
          />

          <input
            {...register("category")}
            placeholder="Kategoriya"
            className="input"
          />

          {/* IMAGE URL */}
          <div className="md:col-span-2 space-y-3">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(
                  e.target.value
                )
              }
              placeholder="Rasm URL"
              className="input w-full"
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-60 object-cover rounded-2xl border border-white/10"
              />
            )}
          </div>

          <input
            type="number"
            placeholder="Soatlik narx"
            {...register(
              "pricePerHour",
              {
                valueAsNumber: true,
              }
            )}
            className="input"
          />

          <input
            type="number"
            placeholder="Kunlik narx"
            {...register(
              "pricePerDay",
              {
                valueAsNumber: true,
              }
            )}
            className="input"
          />

          <input
            type="number"
            placeholder="Oylik narx"
            {...register(
              "pricePerMonth",
              {
                valueAsNumber: true,
              }
            )}
            className="input"
          />

          <input
            {...register("location")}
            placeholder="Joylashuv"
            className="input"
          />

          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            {...register(
              "rating",
              {
                valueAsNumber: true,
              }
            )}
            className="input"
          />

          <textarea
            {...register(
              "description"
            )}
            placeholder="Tavsif"
            className="input md:col-span-2 h-32"
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

          <div className="md:col-span-2 flex gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700"
            >
              Bekor qilish
            </Button>

            <Button
              type="submit"
              disabled={
                isSubmitting
              }
              className="flex-1"
            >
              {isSubmitting
                ? "Saqlanmoqda..."
                : "Saqlash"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

