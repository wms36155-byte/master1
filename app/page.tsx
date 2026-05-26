"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import Container from "@/components/shared/Container";

import { getEquipments } from "@/services/equipment.service";

import type {
  Equipment,
} from "@/types/equipment.types";

export default function HomePage() {
  const [
    equipments,
    setEquipments,
  ] = useState<
    Equipment[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  // =========================
  // FETCH EQUIPMENTS
  // =========================
  useEffect(() => {
    const fetchEquipments =
      async () => {
        try {
          setLoading(true);

          const data =
            await getEquipments();

          setEquipments(data);
        } catch (error) {
          console.error(
            "Fetch equipments error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchEquipments();
  }, []);

  // =========================
  // DYNAMIC CATEGORIES
  // =========================
  const categories =
    useMemo(() => {
      return [
        "all",

        ...new Set(
          equipments
            .map(
              (item) =>
                item.category
            )
            .filter(Boolean)
        ),
      ];
    }, [equipments]);

  // =========================
  // FILTERED EQUIPMENTS
  // =========================
  const filteredEquipments =
    useMemo(() => {
      return equipments.filter(
        (item) => {
          const matchesSearch =
            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            selectedCategory ===
            "all"
              ? true
              : item.category ===
                selectedCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      equipments,
      search,
      selectedCategory,
    ]);

  return (
    <main className="min-h-screen bg-[#07130C] text-white">
      <Navbar />

      <Hero />

      <section className="py-20">
        <Container>
          {/* HEADER */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black">
              Texnikalar
            </h2>

            <p className="text-white/60 mt-3 max-w-2xl">
              Siz uchun eng
              zamonaviy lazer va
              ishlab chiqarish
              texnikalari
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <input
              type="text"
              placeholder="Texnika qidirish..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 h-14 bg-[#102E1C] border border-white/10 rounded-2xl px-5 outline-none focus:border-[#22C55E] transition"
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
              className="h-14 min-w-[220px] bg-[#102E1C] border border-white/10 rounded-2xl px-5 outline-none focus:border-[#22C55E] transition"
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-[#102E1C]"
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({
                length: 6,
              }).map((_, i) => (
                <div
                  key={i}
                  className="h-[420px] rounded-3xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* EQUIPMENTS */}
          {!loading &&
            filteredEquipments.length >
              0 && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredEquipments.map(
                  (
                    equipment
                  ) => (
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
            )}

          {/* EMPTY */}
          {!loading &&
            filteredEquipments.length ===
              0 && (
              <div className="flex flex-col items-center justify-center text-center py-24 border border-white/10 rounded-3xl bg-white/5">
                <h3 className="text-3xl font-black">
                  Hech nima
                  topilmadi
                </h3>

                <p className="text-white/50 mt-4 max-w-md">
                  Boshqa texnika
                  nomini yozib
                  qayta qidirib
                  ko‘ring
                </p>
              </div>
            )}
        </Container>
      </section>
    </main>
  );
}