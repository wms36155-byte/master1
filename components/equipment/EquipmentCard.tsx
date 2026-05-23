"use client";

import Link from "next/link";

import {
  MapPin,
  Star,
  Heart,
} from "lucide-react";

import { Equipment } from "@/types/equipment.types";

import Button from "../ui/Button";

import toast from "react-hot-toast";

import { useCartStore } from "@/store/cart.store";

import {
  useFavoriteStore,
} from "@/store/favorite.store";

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
        Number(equipment.id)
      )
    );

  return (
    <div className="bg-[#102E1C] rounded-3xl overflow-hidden border border-white/10 hover:border-green-500/40 transition-all duration-300 group">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        {/* FAVORITE */}
        <button
          onClick={(e) => {
            e.preventDefault();

            toggleFavorite(
              equipment
            );

            toast.success(
              isFavorite
                ? "Favoritesdan olib tashlandi"
                : "Favoritesga qo‘shildi"
            );
          }}
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all"
        >
          <Heart
            size={22}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-white"
            }
          />
        </button>

        {/* IMAGE */}
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* CATEGORY */}
        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          {equipment.category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TOP */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold line-clamp-1">
              {equipment.name}
            </h3>

            <div className="flex items-center gap-2 text-white/60 mt-2">
              <MapPin size={16} />

              <span className="text-sm">
                {equipment.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-yellow-400 shrink-0">
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

          <h2 className="text-3xl font-black text-green-400 mt-1">
            {equipment.pricePerHour.toLocaleString()}{" "}
            so‘m
          </h2>

          <span className="text-white/50 text-sm">
            / soatiga
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-6">
          <Link
            href={`/equipment/${equipment.id}`}
            className="flex-1"
          >
            <Button className="w-full">
              Batafsil
            </Button>
          </Link>

          <Button
            className="bg-white/10 hover:bg-white/20 px-5"
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