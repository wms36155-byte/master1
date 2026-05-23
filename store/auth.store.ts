"use client";

import { create }
from "zustand";

type User = {
  id: number;

  fullName: string;

  email: string;

  role: "admin" | "user";
};

type AuthStore = {
  user: User | null;

  token: string | null;

  login: (
    user: User,
    token: string
  ) => void;

  logout: () => void;

  loadUser: () => void;
};

export const useAuthStore =
  create<AuthStore>((set) => ({

    user: null,

    token: null,

    login: (user, token) => {

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      set({
        user,
        token,
      });
    },

    logout: () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      set({
        user: null,
        token: null,
      });
    },

    loadUser: () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const user =
        localStorage.getItem(
          "user"
        );

      if (
        token &&
        user
      ) {

        set({
          token,
          user: JSON.parse(user),
        });

      }
    },
  }));