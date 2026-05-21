import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MotionProvider from "@/components/providers/MotionProvider";

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

  <MotionProvider>
    {children}
  </MotionProvider>
</body>
    </html>
  );
}