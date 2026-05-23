"use client";

import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import EquipmentCard from "@/components/equipment/EquipmentCard";

import {
  useFavoriteStore,
} from "@/store/favorite.store";

export default function FavoritesPage() {
  const favorites =
    useFavoriteStore(
      (state) =>
        state.favorites
    );

  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          <h1 className="text-5xl font-black mb-10">
            Saqlangan texnikalar
          </h1>

          {favorites.length ===
          0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-black">
                Hozircha saqlangan
                texnikalar yo‘q
              </h2>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {favorites.map(
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
          )}
        </Container>
      </section>
    </main>
  );
}