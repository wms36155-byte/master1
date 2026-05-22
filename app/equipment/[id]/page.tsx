import Image from "next/image";

import {
  MapPin,
  Star,
} from "lucide-react";

import EquipmentDetailClient from "@/components/equipment/EquipmentDetailClient";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";

import Button from "@/components/ui/Button";

import {
  getEquipmentById,
} from "@/services/equipment.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EquipmentDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const equipment =
    await getEquipmentById(id);

  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* IMAGE */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-[120px] opacity-20" />

              <Image
                src={equipment.image}
                alt={equipment.name}
                width={1000}
                height={700}
                className="relative rounded-3xl border border-white/10 object-cover w-full h-[500px]"
              />
            </div>

            {/* CONTENT */}
            <div>
              {/* BADGES */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                  {equipment.category}
                </span>

                {equipment.operatorAvailable && (
                  <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm">
                    Operator mavjud
                  </span>
                )}
              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black mt-6 leading-tight">
                {equipment.name}
              </h1>

              {/* META */}
              <div className="flex items-center gap-6 mt-6 flex-wrap">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin size={18} />

                  <span>
                    {equipment.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-yellow-400">
                  <Star
                    size={18}
                    fill="currentColor"
                  />

                  <span>
                    {equipment.rating}
                  </span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-white/60 text-lg leading-relaxed mt-8">
                {equipment.description}
              </p>

              {/* PRICING */}
              <div className="grid md:grid-cols-3 gap-4 mt-10">
                {/* HOUR */}
                <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50">
                    Soatiga
                  </p>

                  <h2 className="text-2xl font-black text-green-400 mt-2">
                    {equipment.pricePerHour.toLocaleString()}{" "}
                    so‘m
                  </h2>
                </div>

                {/* DAY */}
                <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50">
                    Kuniga
                  </p>

                  <h2 className="text-2xl font-black text-green-400 mt-2">
                    {equipment.pricePerDay.toLocaleString()}{" "}
                    so‘m
                  </h2>
                </div>

                {/* MONTH */}
                <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50">
                    Oyiga
                  </p>

                  <h2 className="text-2xl font-black text-green-400 mt-2">
                    {equipment.pricePerMonth.toLocaleString()}{" "}
                    so‘m
                  </h2>
                </div>
              </div>

              {/* CLIENT BOOKING */}
              <div className="mt-10">
                <EquipmentDetailClient
                  equipmentName={
                    equipment.name
                  }
                  pricePerDay={
                    equipment.pricePerDay
                  }
                />
              </div>

             
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}