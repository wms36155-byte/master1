import { create } from "zustand";
import { Equipment } from "@/types/equipment.types";

type CartItem = Equipment & {
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (equipment: Equipment) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addToCart: (equipment) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === equipment.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === equipment.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...equipment, quantity: 1 }],
      };
    }),

  removeFromCart: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  increaseQuantity: (id: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (id: string) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
}));