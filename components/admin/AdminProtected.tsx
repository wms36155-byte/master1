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
    const hasCookie =
      document.cookie.includes(
        "admin=true"
      );

    if (!isAdmin && !hasCookie) {
      router.push("/admin/login");
    }
  }, [isAdmin, router]);

  return <>{children}</>;
}