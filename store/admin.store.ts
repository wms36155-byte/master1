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
  create<AdminStore>(
    (set) => ({
      isAdmin: false,

      // LOGIN
      login: (
        username,
        password
      ) => {
        if (
          username ===
            "admin" &&
          password === "12345"
        ) {
          localStorage.setItem(
            "admin",
            "true"
          );

          set({
            isAdmin: true,
          });

          return true;
        }

        return false;
      },

      // LOGOUT
      logout: () => {
        localStorage.removeItem(
          "admin"
        );

        set({
          isAdmin: false,
        });
      },

      // CHECK AUTH
      checkAuth: () => {
        if (
          typeof window !==
          "undefined"
        ) {
          const admin =
            localStorage.getItem(
              "admin"
            );

          set({
            isAdmin:
              admin === "true",
          });
        }
      },
    })
  );