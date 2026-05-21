import { create } from "zustand";

type AdminStore = {
  isAdmin: boolean;

  login: (
    username: string,
    password: string
  ) => boolean;

  logout: () => void;
};

export const useAdminStore =
  create<AdminStore>((set) => ({
    isAdmin: false,

    login: (username, password) => {
      if (
        username === "admin" &&
        password === "12345"
      ) {
        set({
          isAdmin: true,
        });

        return true;
      }

      return false;
    },

    logout: () =>
      set({
        isAdmin: false,
      }),
  }));