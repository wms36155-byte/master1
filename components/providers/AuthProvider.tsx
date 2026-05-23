"use client";

import { useEffect } from "react";

import {
  useAdminStore,
} from "@/store/admin.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth =
    useAdminStore(
      (state) =>
        state.checkAuth
    );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}