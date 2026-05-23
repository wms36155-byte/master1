"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const admin =
      localStorage.getItem(
        "admin"
      );

    if (
      admin !== "true"
    ) {
      router.push("/admin/login");
    }
  }, []);

  return <>{children}</>;
}