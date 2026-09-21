import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "FloraTrade Nusantara — Jasa Export Import Flora Terpercaya",
  description: "Spesialis export-import komoditi flora non-tambang: tanaman hias, bunga potong, benih, umbi, dan rempah. Urus phytosanitary, karantina, cold chain sampai tujuan. 500+ shipment, 50+ negara.",
  keywords: ["ekspor tanaman hias", "jasa export flora", "import benih", "phytosanitary certificate", "cold chain flora"],
  openGraph: {
    title: "FloraTrade Nusantara — Ekspor Flora Indonesia ke Dunia",
    description: "Solusi export import flora mudah, legal, segar sampai tujuan.",
    type: "website",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geist.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fefcf8]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
