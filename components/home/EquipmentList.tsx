"use client";

import { useEffect, useMemo, useState } from "react";

import Container from "../shared/Container";
import EquipmentCard from "../equipment/EquipmentCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

import { Equipment } from "@/types/equipment.types";
import { getEquipments } from "@/services/equipment.service";

export default function EquipmentList() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("Barchasi");

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

  const filteredEquipments = useMemo(() => {
    return equipments.filter((equipment) => {
      const matchesSearch = equipment.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Barchasi"
          ? true
          : equipment.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [equipments, search, selectedCategory]);

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
        <div className="mb-10">
          <span className="text-green-400">
            Mashhur texnikalar
          </span>

          <h2 className="text-4xl font-black mt-2">
            Top texnikalar
          </h2>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <CategoryFilter
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEquipments.map((equipment) => (
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