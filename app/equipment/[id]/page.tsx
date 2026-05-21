import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import EquipmentDetailClient from "@/components/equipment/EquipmentDetailClient";
import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";

import { getEquipmentById } from "@/services/equipment.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EquipmentDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const equipment = await getEquipmentById(id);

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
              <div className="flex items-center gap-3">
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                  {equipment.category}
                </span>

                {equipment.operatorAvailable && (
                  <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm">
                    Operator mavjud
                  </span>
                )}
              </div>

              <h1 className="text-5xl font-black mt-6">
                {equipment.name}
              </h1>

              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin size={18} />
                  <span>{equipment.location}</span>
                </div>

                <div className="flex items-center gap-2 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <span>{equipment.rating}</span>
                </div>
              </div>

              <p className="text-white/60 text-lg leading-relaxed mt-8">
                {equipment.description}
              </p>

              {/* PRICING */}
              <div className="grid md:grid-cols-3 gap-4 mt-10">
                <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50">
                    Soatiga
                  </p>

                  <h2 className="text-2xl font-black text-green-400 mt-2">
                    {equipment.pricePerHour.toLocaleString()}
                  </h2>
                </div>

                <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50">
                    Kuniga
                  </p>

                  <h2 className="text-2xl font-black text-green-400 mt-2">
                    <EquipmentDetailClient
  equipmentName={equipment.name}
  pricePerDay={equipment.pricePerDay}
/>
                  </h2>
                </div>

                <div className="bg-[#102E1C] border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50">
                    Oyiga
                  </p>

                  <h2 className="text-2xl font-black text-green-400 mt-2">
                    {equipment.pricePerMonth.toLocaleString()}
                  </h2>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-10">
                <Button className="flex-1">
                  Buyurtma berish
                </Button>

                <Button className="bg-white/10 hover:bg-white/20 flex-1">
                  Operator bilan
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}