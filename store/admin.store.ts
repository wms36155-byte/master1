import { create } from "zustand";

type AdminStore = {
  isAdmin: boolean;

  login: (
    username: string,
    password: string
  ) => boolean;

  logout: () => void;

  checkAuth: () => void;
};

export const useAdminStore =
  create<AdminStore>((set) => ({
    isAdmin: false,

    login: (username, password) => {
      if (
        username === "admin" &&
        password === "12345"
      ) {
        // STATE
        set({
          isAdmin: true,
        });

        // COOKIE
        document.cookie =
          "admin=true; path=/";

        // LOCAL STORAGE
        localStorage.setItem(
          "isAdmin",
          "true"
        );

        return true;
      }

      return false;
    },

    logout: () => {
      set({
        isAdmin: false,
      });

      document.cookie =
        "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      localStorage.removeItem(
        "isAdmin"
      );
    },

    checkAuth: () => {
      const admin =
        localStorage.getItem(
          "isAdmin"
        );

      if (admin === "true") {
        set({
          isAdmin: true,
        });
      }
    },
  }));