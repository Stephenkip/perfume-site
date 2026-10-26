import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartUIProvider } from "@/components/cart/CartContext";
import { CartOverlay } from "@/components/cart/CartDrawer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OEA Perfumery — Alcohol-Free Fine Fragrance",
  description: "Alcohol-free fine fragrance. Scent profiles, collection, journal, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col antialiased text-ink selection:bg-terracotta selection:text-cream">
        <SmoothScroll>
          <CartUIProvider>
            <AnnouncementBar />
            <Header />
            {children}
            <Footer />
            <CartOverlay />
          </CartUIProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
