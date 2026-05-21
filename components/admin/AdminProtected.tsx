"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  useAdminStore,
} from "@/store/admin.store";

type Props = {
  children: React.ReactNode;
};

export default function AdminProtected({
  children,
}: Props) {
  const router = useRouter();

  const isAdmin = useAdminStore(
    (state) => state.isAdmin
  );

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return children;
}