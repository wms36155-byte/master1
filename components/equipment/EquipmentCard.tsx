"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import {
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import Button from "../ui/Button";

import { Equipment } from "@/types/equipment.types";

import { useCartStore } from "@/store/cart.store";
import { useFavoriteStore } from "@/store/favorite.store";

type Props = {
  equipment: Equipment;
};

export default function EquipmentCard({
  equipment,
}: Props) {
  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const toggleFavorite =
    useFavoriteStore(
      (state) =>
        state.toggleFavorite
    );

  const isFavorite =
    useFavoriteStore((state) =>
      state.isFavorite(
        String(equipment.id)
      )
    );

  const handleFavorite = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    toggleFavorite(equipment);

    toast.success(
      isFavorite
        ? "Favoritesdan olib tashlandi"
        : "Favoritesga qo‘shildi"
    );
  };

  return (
    <div className="bg-[#102E1C] rounded-3xl overflow-hidden border border-white/10">

      {/* IMAGE */}
      <div className="relative">

        {/* FAVORITE */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 z-10 bg-black/50 w-11 h-11 rounded-full flex items-center justify-center"
        >
          <Heart
            size={20}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-white"
            }
          />
        </button>

        <img
          src={
            equipment.image ||
            "/placeholder.jpg"
          }
          alt={equipment.name}
          className="w-full h-60 object-cover"
        />

      </div>

      {/* CONTENT */}
      <div className="p-5">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {equipment.name}
            </h2>

            <div className="flex items-center gap-2 text-white/60 mt-2">
              <MapPin size={16} />
              <span>
                {equipment.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-yellow-400">
            <Star
              size={16}
              fill="currentColor"
            />

            <span>
              {equipment.rating}
            </span>
          </div>

        </div>

        {/* PRICE */}
        <div className="mt-6">
          <p className="text-white/50 text-sm">
            Boshlang‘ich narx
          </p>

          <h1 className="text-3xl font-black text-green-400">
            {Number(
              equipment.pricePerHour
            ).toLocaleString()}{" "}
            so‘m
          </h1>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">

          {/* DETAIL PAGE */}
          <Link
            href={`/equipment/${equipment.id}`}
            className="flex-1"
          >
            <Button className="w-full">
              Batafsil
            </Button>
          </Link>

          <Button
            className="px-5 bg-white/10"
            onClick={() => {
              addToCart(equipment);

              toast.success(
                "Savatchaga qo‘shildi"
              );
            }}
          >
            +
          </Button>

        </div>
      </div>
    </div>
  );
}