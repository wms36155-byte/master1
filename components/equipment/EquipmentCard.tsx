"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { MapPin, Star, Heart, ShoppingCart } from "lucide-react";

import Button from "../ui/Button";

import { Equipment } from "@/types/equipment.types";
import { useCartStore } from "@/store/cart.store";
import { useFavoriteStore } from "@/store/favorite.store";

type Props = {
  equipment: Equipment;
};

export default function EquipmentCard({ equipment }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);

  const isFavorite = useFavoriteStore((s) =>
    s.isFavorite(equipment.id)
  );

  const handleAddToCart = () => {
    addToCart(equipment);
    toast.success("Savatchaga qo‘shildi 🛒");
  };

  const handleFavorite = () => {
    toggleFavorite(equipment);

    toast.success(
      isFavorite
        ? "Favoritesdan olib tashlandi"
        : "Favoritesga qo‘shildi"
    );
  };

  return (
    <div className="group bg-[#0f2a1b] border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.02] transition shadow-xl shadow-black/30">

      {/* IMAGE */}
      <div className="relative h-60 overflow-hidden">

        <Image
          src={equipment.image || "/placeholder.jpg"}
          alt={equipment.name}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        {/* FAVORITE */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"
        >
          <Heart
            size={18}
            className={
              isFavorite
                ? "text-red-500 fill-red-500"
                : "text-white"
            }
          />
        </button>

        {/* PRICE BADGE */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl">
          <span className="text-green-400 text-sm font-bold">
            {equipment.pricePerHour.toLocaleString()} so‘m / soat
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">

        {/* TITLE */}
        <div>
          <h2 className="text-xl font-bold">
            {equipment.name}
          </h2>

          <p className="text-white/40 text-sm">
            {equipment.category}
          </p>
        </div>

        {/* LOCATION + RATING */}
        <div className="flex justify-between text-sm">

          <div className="flex items-center gap-2 text-white/60">
            <MapPin size={14} />
            {equipment.location}
          </div>

          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="text-white">
              {equipment.rating}
            </span>
          </div>
        </div>

        {/* PRICES */}
        <div className="grid grid-cols-2 text-xs text-white/50 gap-2">
          <div>
            Kun:{" "}
            <span className="text-white">
              {equipment.pricePerDay.toLocaleString()}
            </span>
          </div>

          <div>
            Oy:{" "}
            <span className="text-white">
              {equipment.pricePerMonth.toLocaleString()}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-white/40 text-sm line-clamp-2">
          {equipment.description}
        </p>

        {/* OPERATOR */}
        <div className="text-xs">
          {equipment.operatorAvailable ? (
            <span className="text-green-400">
              ✔ Operator mavjud
            </span>
          ) : (
            <span className="text-white/40">
              Operator yo‘q
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <Button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Savatchaga qo‘shish
        </Button>

      </div>
    </div>
  );
}