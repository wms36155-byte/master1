"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/shared/Navbar";

import Hero from "@/components/home/Hero";

import EquipmentCard from "@/components/equipment/EquipmentCard";

import Container from "@/components/shared/Container";

import {
  getEquipments,
} from "@/services/equipment.service";

import {
  Equipment,
} from "@/types/equipment.types";

export default function HomePage() {
  const [equipments, setEquipments] =
    useState<Equipment[]>([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  useEffect(() => {
    const fetchData =
      async () => {
        const data =
          await getEquipments();

        setEquipments(data);
      };

    fetchData();
  }, []);

  // DYNAMIC CATEGORIES
  const categories = [
    "all",

    ...new Set(
      equipments.map(
        (item) => item.category
      )
    ),
  ];

  // FILTER
  const filteredEquipments =
    equipments.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "all"
          ? true
          : item.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <main>
      <Navbar />

      <Hero />

      <section className="py-20">
        <Container>
          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              type="text"
              placeholder="Texnika qidirish..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 bg-[#102E1C] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <select
              value={
                selectedCategory
              }
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="bg-[#102E1C] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          {/* EQUIPMENTS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEquipments.map(
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

          {/* EMPTY */}
          {filteredEquipments.length ===
            0 && (
            <div className="text-center py-20">
              <h2 className="text-4xl font-black">
                Hech nima topilmadi
              </h2>

              <p className="text-white/50 mt-4">
                Boshqa texnika
                qidirib ko‘ring
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}