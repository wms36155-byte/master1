import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/shared/Footer";
import MotionProvider from "@/components/providers/MotionProvider";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "MasterLaser",
    template: "%s | MasterLaser",
  },
  description: "Heavy equipment rental platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#07130d] text-white antialiased">

        {/* TOASTER */}
        <Toaster position="top-right" />

        {/* PROVIDERS */}
        <AuthProvider>
          <MotionProvider>
            {children}
             <Footer />
          </MotionProvider>
        </AuthProvider>

      </body>
    </html>
  );
}