import Image from "next/image";

import { MapPin, Star } from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";

import EquipmentDetailClient from "@/components/equipment/EquipmentDetailClient";

import {
  getEquipmentById,
} from "@/services/equipment.service";

type Props = {
  params: {
    id: string;
  };
};

export default async function EquipmentDetailPage({
  params,
}: Props) {
  const equipment =
    await getEquipmentById(
      params.id
    );

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Equipment topilmadi
      </div>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">

            {/* IMAGE */}
            <div>
              <Image
                src={
                  equipment.image ||
                  "/placeholder.jpg"
                }
                alt={equipment.name}
                width={1000}
                height={700}
                className="w-full h-[500px] object-cover rounded-3xl"
              />
            </div>

            {/* CONTENT */}
            <div>

              <h1 className="text-5xl font-black">
                {equipment.name}
              </h1>

              <div className="flex gap-6 mt-5">

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

              <p className="text-white/60 mt-8">
                {equipment.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mt-10">

                <div className="bg-[#102E1C] p-5 rounded-2xl">
                  <p className="text-white/50">
                    Soatiga
                  </p>

                  <h2 className="text-green-400 text-2xl font-black mt-2">
                    {Number(
                      equipment.pricePerHour
                    ).toLocaleString()}{" "}
                    so‘m
                  </h2>
                </div>

                <div className="bg-[#102E1C] p-5 rounded-2xl">
                  <p className="text-white/50">
                    Kuniga
                  </p>

                  <h2 className="text-green-400 text-2xl font-black mt-2">
                    {Number(
                      equipment.pricePerDay
                    ).toLocaleString()}{" "}
                    so‘m
                  </h2>
                </div>

                <div className="bg-[#102E1C] p-5 rounded-2xl">
                  <p className="text-white/50">
                    Oyiga
                  </p>

                  <h2 className="text-green-400 text-2xl font-black mt-2">
                    {Number(
                      equipment.pricePerMonth
                    ).toLocaleString()}{" "}
                    so‘m
                  </h2>
                </div>

              </div>

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