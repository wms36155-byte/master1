import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { Equipment } from "@/types/equipment.types";

import Button from "../ui/Button";

type Props = {
  equipment: Equipment;
};

export default function EquipmentCard({
  equipment,
}: Props) {
  return (
    <div className="bg-[#102E1C] rounded-3xl overflow-hidden border border-white/10 hover:border-green-500/40 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          {equipment.category}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">
              {equipment.name}
            </h3>

            <div className="flex items-center gap-2 text-white/60 mt-2">
              <MapPin size={16} />
              <span>{equipment.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span>{equipment.rating}</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-white/50 text-sm">
            Boshlang‘ich narx
          </p>

          <h2 className="text-3xl font-black text-green-400 mt-1">
            {equipment.pricePerHour.toLocaleString()} so‘m
          </h2>

          <span className="text-white/50 text-sm">
            / soatiga
          </span>
        </div>

        <div className="mt-6">
          <Link href={`/equipment/${equipment.id}`}>
            <Button className="w-full">
              Batafsil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}