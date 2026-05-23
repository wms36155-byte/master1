"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/shared/Navbar";

import Container from "@/components/shared/Container";

import EquipmentCard from "@/components/equipment/EquipmentCard";

import {
  getEquipments,
} from "@/services/equipment.service";

import {
  Equipment,
} from "@/types/equipment.types";

export default function EquipmentPage() {
  const [equipments, setEquipments] =
    useState<Equipment[]>([]);

  useEffect(() => {
    const fetchData =
      async () => {
        const data =
          await getEquipments();

        setEquipments(data);
      };

    fetchData();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          <div className="mb-12">
            <h1 className="text-5xl font-black">
              Texnikalar
            </h1>

            <p className="text-white/50 mt-4">
              Professional texnikalarni
              ijaraga oling
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {equipments.map(
              (equipment) => (
                <EquipmentCard
                  key={
                    equipment.id
                  }
                  equipment={
                    equipment
                  }
                />
              )
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}