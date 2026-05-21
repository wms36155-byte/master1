"use client";

import { useEffect, useState } from "react";

import Container from "../shared/Container";
import EquipmentCard from "../equipment/EquipmentCard";

import { Equipment } from "@/types/equipment.types";
import { getEquipments } from "@/services/equipment.service";

export default function EquipmentList() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const data = await getEquipments();

        setEquipments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <h1>Loading...</h1>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-20">
      <Container>
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-green-400">
              Mashhur texnikalar
            </span>

            <h2 className="text-4xl font-black mt-2">
              Top texnikalar
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {equipments.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}