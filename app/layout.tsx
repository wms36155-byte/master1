import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MotionProvider from "@/components/providers/MotionProvider";
import AuthProvider from "@/components/providers/AuthProvider";
export const metadata: Metadata = {
  title: "MasterLaser",
  description: "Heavy equipment rental platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body>
  <Toaster position="top-right" />

  <AuthProvider>
    <MotionProvider>
      {children}
    </MotionProvider>
  </AuthProvider>
</body>
    </html>
  );
}