import { create } from "zustand";
import { Equipment } from "@/types/equipment.types";

type FavoriteStore = {
  favorites: Equipment[];
  toggleFavorite: (equipment: Equipment) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  toggleFavorite: (equipment) => {
    const exists = get().favorites.find(
      (item) => item.id === equipment.id
    );

    if (exists) {
      set({
        favorites: get().favorites.filter(
          (item) => item.id !== equipment.id
        ),
      });
    } else {
      set({
        favorites: [...get().favorites, equipment],
      });
    }
  },

  isFavorite: (id) => {
    return !!get().favorites.find(
      (item) => item.id === id
    );
  },
}));