"use client";

import { useEffect } from "react";

import {
  useAdminStore,
} from "@/store/admin.store";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({
  children,
}: Props) {
  const checkAuth = useAdminStore(
    (state) => state.checkAuth
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}