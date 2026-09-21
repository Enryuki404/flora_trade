import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { BrandProvider } from "@/context/BrandContext";
import { ThemeProvider } from "@/context/ThemeContext";

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

// inline script to avoid FOUC — runs before hydration, SSR safe
const themeInitScript = `
(function(){
  try{
    var t = localStorage.getItem('theme');
    var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (t === 'light' || t === 'dark') ? t : (m ? 'dark' : 'light');
    var r = document.documentElement;
    if(theme==='dark'){ r.classList.add('dark'); r.setAttribute('data-theme','dark'); }
    else { r.classList.remove('dark'); r.setAttribute('data-theme','light'); }
  }catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geist.variable} ${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
        <ThemeProvider>
          <BrandProvider>
            <Navbar />
            <main className="flex-1 bg-[var(--bg)] transition-colors duration-300">{children}</main>
            <Footer />
            <WhatsAppWidget />
          </BrandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
