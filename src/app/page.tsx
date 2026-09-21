"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { articles } from "@/data/articles";
import { waLink } from "@/lib/constants";
import SafeImage from "@/components/SafeImage";
import { useBrand } from "@/context/BrandContext";
import { hexToRgba } from "@/lib/brand";

// — Helper: animated counter —
function Counter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [target]);
  return <span>{count}{suffix}</span>;
}

const layanan = [
  {
    icon: "🌱",
    title: "Jasa Export Flora",
    desc: "Tanaman hias, bunga potong, benih, umbi & rempah. Kami urus karantina + phytosanitary sampai lolos negara tujuan.",
    href: "/#kontak",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: "🌸",
    title: "Jasa Import Benih & Bibit",
    desc: "Import bibit unggul legal dengan izin Kementan, karantina, dan perhitungan bea masuk transparan.",
    href: "/#kontak",
    color: "bg-amber-50 border-amber-200",
  },
  {
    icon: "❄️",
    title: "Freight Forwarding Cold Chain",
    desc: "Air freight 2-4 hari & reefer sea freight dengan data logger suhu real-time. Flora tetap segar.",
    href: "/#kontak",
    color: "bg-sky-50 border-sky-200",
  },
  {
    icon: "📄",
    title: "Konsultasi Dokumen & Karantina",
    desc: "PEB/PIB, Certificate of Origin, HS Code flora, fumigasi — semua beres tanpa pusing.",
    href: "/#kontak",
    color: "bg-stone-50 border-stone-200",
  },
];

const faqs = [
  { q: "Berapa lama proses phytosanitary untuk flora?", a: "2–3 hari kerja di Balai Karantina Pertanian. Untuk e-Phyto elektronik bisa lebih cepat jika dokumen lengkap dan tanaman sehat. Kami bantu pre-inspection agar lolos 1x." },
  { q: "Dokumen apa saja yang diperlukan untuk ekspor tanaman hias?", a: "Wajib: NIB/NPWP, PEB, Invoice + Packing List (nama latin), Phytosanitary Certificate, Certificate of Origin, dan fumigation cert jika pakai palet kayu." },
  { q: "Apakah bisa kirim sampel dalam jumlah kecil (5-20 tanaman)?", a: "Bisa! Kami ada layanan LCL Air Freight khusus sampel. Cocok untuk test market ke Belanda/Jepang. Biaya mulai $80–$150 untuk 10 tanaman dengan packaging ventilated." },
  { q: "Bagaimana cara menghitung bea masuk import benih?", a: "Berdasarkan CIF × kurs × tarif HS 1209 (0–10%) + PPN 11% + PPh. Hubungi kami untuk simulasi gratis sesuai HS spesifik benih kamu." },
  { q: "Apakah melayani door-to-door sampai buyer di luar negeri?", a: "Ya, DDP/DDU door-to-door hingga alamat buyer di 50+ negara. Termasuk customs clearance di negara tujuan via agen kami." },
  { q: "Apakah tanaman dijamin hidup sampai tujuan?", a: "Kami gunakan packaging ventilated + sphagnum steril + data logger + asuransi perishable. Tingkat kelangsungan hidup 96–98% untuk air freight. Jika mati karena handling kami, ada garansi claim." },
];

export default function Home() {
  const { brand } = useBrand();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const preview = articles.filter(a => a.featured).slice(0, 3);

  // hero overlay gradient derived from brand.primary with alpha
  const heroOverlay = `linear-gradient(to right, ${hexToRgba(brand.colors.primary, 0.92)}, ${hexToRgba(brand.colors.primary, 0.75)}, ${hexToRgba(brand.colors.primary, 0.38)})`;

  return (
    <div className="bg-[var(--bg)] transition-colors duration-300">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&auto=format&fit=crop&q=80"
            alt="Flora export"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 transition-colors duration-300" style={{ background: heroOverlay }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide border border-white/20 mb-5">
                <span className="w-2 h-2 rounded-full animate-pulse transition-colors duration-300" style={{ backgroundColor: "var(--brand-accent)" }} /> SPESIALIS FLORA NON-TAMBANG • SEJAK 2014
              </div>
              <h1 className="text-[32px] sm:text-5xl lg:text-[52px] font-extrabold leading-[0.95] tracking-tight">
                Ekspor Flora<br />
                <span className="transition-colors duration-300" style={{ color: "var(--brand-accent)" }}>Indonesia</span> ke<br />
                Dunia — Mudah,<br />
                Segar, Legal.
              </h1>
              <p className="mt-5 text-white/90 text-base sm:text-lg max-w-xl leading-relaxed">
                Kami bantu urus <b>phytosanitary, karantina, bea cukai & cold chain</b> sampai tujuan. Fokus kembangkan kebun & bisnis, biarkan kami yang urus sisanya.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/#kontak" className="px-7 py-3.5 rounded-full font-bold text-sm shadow-lg hover:opacity-95 transition-all duration-300 text-center" style={{ backgroundColor: "var(--brand-primary)", color: "#fff" }}>Mulai Konsultasi Gratis →</a>
                <Link href="/pengetahuan" className="px-7 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition duration-300 text-center">Pelajari Prosesnya</Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-white/80">
                <span className="flex items-center gap-1.5">✅ Phytosanitary Guarantee</span>
                <span className="flex items-center gap-1.5">❄️ Cold Chain</span>
                <span className="flex items-center gap-1.5">📦 50+ Negara</span>
              </div>
            </div>

            {/* Hero Card — FIXED: use SafeImage with valid src + brand-aware fallback */}
            <div className="hidden lg:block">
              <div className="rounded-[24px] shadow-2xl p-3 max-w-md ml-auto transition-colors duration-300" style={{ backgroundColor: "var(--surface)" }}>
                <div className="rounded-2xl overflow-hidden relative h-[300px]" style={{ backgroundColor: "var(--border)" }}>
                  <SafeImage
                    src="https://images.unsplash.com/photo-1463936575829-25148e1db1b6?w=700&auto=format&fit=crop&q=80"
                    alt="Monstera Variegata"
                    sizes="400px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 backdrop-blur rounded-2xl p-4 flex items-center justify-between shadow-lg transition-colors duration-300" style={{ backgroundColor: "color-mix(in srgb, var(--surface) 95%, transparent)" }}>
                    <div>
                      <div className="text-xs transition-colors duration-300" style={{ color: "var(--muted)" }}>Shipment Terbaru</div>
                      <div className="font-bold text-sm transition-colors duration-300" style={{ color: "var(--text)" }}>1.200 Monstera Variegata → Amsterdam</div>
                      <div className="text-xs font-semibold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>● Delivered • 3 hari • 98% live arrival</div>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-300" style={{ backgroundColor: "var(--brand-primary)" }}>✓</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[
                    { v: "500+", l: "Shipment" },
                    { v: "98%", l: "Live Arrival" },
                    { v: "4.9/5", l: "Rating" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl p-3 text-center transition-colors duration-300 border" style={{ backgroundColor: "var(--brand-light)", borderColor: "var(--brand-accent)" }}>
                      <div className="font-extrabold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>{s.v}</div>
                      <div className="text-[11px] transition-colors duration-300" style={{ color: "var(--muted)" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="border-y transition-colors duration-300" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="text-xs font-bold tracking-widest uppercase transition-colors duration-300" style={{ color: "var(--muted)" }}>Dipercaya & Terasosiasi</div>
            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold transition-colors duration-300" style={{ color: "var(--muted)" }}>
              <span className="px-3 py-1.5 rounded-full border transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>ALFI/ILFA</span>
              <span className="px-3 py-1.5 rounded-full border transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>IATA Cargo</span>
              <span className="px-3 py-1.5 rounded-full border transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>Badan Karantina</span>
              <span className="px-3 py-1.5 rounded-full border transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>CEISA 4.0</span>
              <span className="px-3 py-1.5 rounded-full border transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>e-Phyto</span>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              { n: 500, label: "Shipment Sukses", sub: "Flora ke 50+ negara" },
              { n: 10, suffix: "+ Tahun", label: "Pengalaman", sub: "Sejak 2014" },
              { n: 50, label: "Negara Tujuan", sub: "EU, ME, Asia, US" },
              { n: 24, suffix: "/7", label: "Support & Tracking", sub: "Update real-time" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border p-6 text-center transition-colors duration-300" style={{ backgroundColor: "var(--brand-light)", borderColor: "color-mix(in srgb, var(--brand-accent) 50%, var(--border))" }}>
                <div className="text-3xl font-extrabold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}><Counter target={s.n} suffix={s.suffix || "+"} /></div>
                <div className="font-semibold text-sm mt-1 transition-colors duration-300" style={{ color: "var(--text)" }}>{s.label}</div>
                <div className="text-xs transition-colors duration-300" style={{ color: "var(--muted)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>Layanan Utama</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight transition-colors duration-300" style={{ color: "var(--text)" }}>Semua Urusan Flora,<br />Kami Bereskan.</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed transition-colors duration-300" style={{ color: "var(--muted)" }}>Fokus di komoditi non-tambang — tanaman hias, bunga potong, benih, umbi & rempah. Bukan general forwarder yang coba-coba handle flora.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layanan.map((l) => (
            <div key={l.title} className={`rounded-[20px] border p-6 hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1`} style={{ backgroundColor: "var(--surface)", borderColor: "color-mix(in srgb, var(--brand-accent) 35%, var(--border))" }}>
              <div className="w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl shadow-sm transition-colors duration-300" style={{ backgroundColor: "var(--brand-light)", borderColor: "var(--brand-accent)" }}>{l.icon}</div>
              <h3 className="font-bold mt-4 transition-colors duration-300" style={{ color: "var(--text)" }}>{l.title}</h3>
              <p className="text-sm mt-2 leading-relaxed flex-1 transition-colors duration-300" style={{ color: "var(--muted)" }}>{l.desc}</p>
              <a href={l.href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all duration-300" style={{ color: "var(--brand-primary)" }}>Selengkapnya →</a>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT KNOWLEDGE PREVIEW */}
      <section className="border-y py-16 lg:py-20 overflow-visible transition-colors duration-300" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>Product Knowledge Hub</div>
              <h2 className="text-3xl font-extrabold mt-2 tracking-tight transition-colors duration-300" style={{ color: "var(--text)" }}>Panduan & Artikel Terbaru</h2>
              <p className="text-sm mt-2 transition-colors duration-300" style={{ color: "var(--muted)" }}>Edukasi ekspor-impor flora — dari HS Code sampai cold chain.</p>
            </div>
            <Link href="/pengetahuan" className="px-5 py-2.5 rounded-full border text-sm font-semibold transition duration-300 hover:opacity-80" style={{ borderColor: "var(--brand-accent)", color: "var(--brand-primary)", backgroundColor: "var(--surface)" }}>Lihat Semua Artikel →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible pt-1 pb-2">
            {preview.map((a) => (
              <Link key={a.id} href={`/pengetahuan/${a.slug}`} className="group rounded-[20px] border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col" style={{ backgroundColor: "var(--bg)", borderColor: "color-mix(in srgb, var(--brand-accent) 30%, var(--border))" }}>
                <div className="relative h-48 overflow-hidden isolate" style={{ backgroundColor: "var(--border)" }}>
                  <SafeImage
                    src={a.coverImage}
                    alt={a.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 z-10 text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white shadow-md transition-colors duration-300" style={{ backgroundColor: "var(--brand-primary)" }}>
                    {a.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs transition-colors duration-300" style={{ color: "var(--muted)" }}>{new Date(a.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} • {a.readingTime}</span>
                  </div>
                  <h3 className="font-bold leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-[var(--brand-primary)]" style={{ color: "var(--text)" }}>{a.title}</h3>
                  <p className="text-sm mt-2 line-clamp-2 leading-relaxed transition-colors duration-300" style={{ color: "var(--muted)" }}>{a.excerpt}</p>
                  <div className="mt-4 text-sm font-semibold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>Baca Selengkapnya →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KENAPA MEMILIH KAMI */}
      <section id="tentang" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>Kenapa FloraTrade?</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight leading-none transition-colors duration-300" style={{ color: "var(--text)" }}>Bukan Sekadar<br />Forwarder. Kami<br /><span className="transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>Ahli Flora.</span></h2>
            <p className="mt-4 leading-relaxed transition-colors duration-300" style={{ color: "var(--muted)" }}>Forwarder umum sering gagal di karantina karena tidak paham phytosanitary. Kami spesialis — setiap shipment didampingi agronomist & PPJK bersertifikat.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                { t: "Harga Transparan", d: "Rincian jelas: freight, karantina, PEB, bea. Tanpa hidden fee. Simulasi dulu, baru jalan.", i: "💰" },
                { t: "Tracking Real-time + Logger", d: "Suhu & lokasi live via dashboard. Data logger disertakan untuk claim garansi.", i: "📍" },
                { t: "Tim Agronomist & PPJK", d: "10+ tahun handle flora. Tahu trik bare-root, moss steril, heat pack.", i: "👨‍🌾" },
                { t: "Jaringan 50+ Negara", d: "Agen karantina di NL, JP, US, UAE. Bantu clearance di negara tujuan.", i: "🌍" },
              ].map((k) => (
                <div key={k.t} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 border" style={{ backgroundColor: "var(--brand-light)", borderColor: "var(--brand-accent)" }}>{k.i}</div>
                  <div>
                    <div className="font-bold text-sm transition-colors duration-300" style={{ color: "var(--text)" }}>{k.t}</div>
                    <div className="text-xs leading-relaxed mt-1 transition-colors duration-300" style={{ color: "var(--muted)" }}>{k.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full h-[480px] rounded-[24px] overflow-hidden shadow-xl" style={{ backgroundColor: "var(--border)" }}>
              <Image
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80"
                alt="Greenhouse"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl shadow-xl border p-5 flex gap-4 max-w-sm transition-colors duration-300" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: "var(--border)" }}>
                <Image
                  src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200&auto=format&fit=crop"
                  alt="flowers"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-sm transition-colors duration-300" style={{ color: "var(--text)" }}>Ekspor Perdana UMKM Lolos 100%</div>
                <div className="text-xs mt-1 transition-colors duration-300" style={{ color: "var(--muted)" }}>Ibu Sari, Bandung — 300 Aglaonema ke Dubai, tanpa reject karantina.</div>
                <div className="text-xs font-semibold mt-2 transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>★★★★★ 4.9/5 dari 200+ UMKM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="text-white py-16 lg:py-20 transition-colors duration-300" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--brand-accent)" }}>Testimoni & Studi Kasus</div>
            <h2 className="text-3xl font-extrabold mt-2 tracking-tight">Dipercaya Petani, UMKM & Eksportir</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { name: "Riko — Kebun Variegata Bogor", quote: "Dulu 40% tanaman mati di jalan. Bareng FloraTrade, live arrival 98% ke Belanda. Packaging dia memang beda.", role: "Eksportir Monstera & Philodendron", stars: "★★★★★" },
              { name: "Sari — UMKM Lembang", quote: "Baru pertama ekspor 50 bunga potong ke Singapura. Dibimbing dari nol — HS Code sampai PC. Sekarang rutin tiap minggu!", role: "Petani Bunga Krisan", stars: "★★★★★" },
              { name: "Pak Hadi — Wonogiri", quote: "Porang kami sekarang ekspor 20 ton/bulan ke China. Harga 3x lipat. FloraTrade bantu dari sortasi sampai FOB.", role: "Ketua Kelompok Tani", stars: "★★★★★" },
            ].map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-6 transition-colors duration-300">
                <div className="text-sm transition-colors duration-300" style={{ color: "var(--brand-accent)" }}>{t.stars}</div>
                <p className="mt-3 text-white/90 leading-relaxed text-sm">“{t.quote}”</p>
                <div className="mt-5">
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-white/60">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-center transition-colors duration-300" style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}>
            <div className="flex-1">
              <div className="text-xs font-bold tracking-widest uppercase transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>Studi Kasus</div>
              <div className="font-extrabold text-xl mt-1">Berhasil Import Benih Premium dari Thailand Tanpa Hambatan</div>
              <p className="text-sm mt-2 transition-colors duration-300" style={{ color: "var(--muted)" }}>Klien import 500kg benih sayur hibrida. Kami urus SIP Kementan + karantina 2 hari, bea hemat 30% dengan HS yang tepat.</p>
            </div>
            <div className="flex gap-6 text-center">
              <div><div className="text-2xl font-extrabold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>2 Hari</div><div className="text-xs transition-colors duration-300" style={{ color: "var(--muted)" }}>Clearance</div></div>
              <div><div className="text-2xl font-extrabold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>-30%</div><div className="text-xs transition-colors duration-300" style={{ color: "var(--muted)" }}>Bea Masuk</div></div>
              <div><div className="text-2xl font-extrabold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>100%</div><div className="text-xs transition-colors duration-300" style={{ color: "var(--muted)" }}>Lolos Karantina</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center">
          <div className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>FAQ</div>
          <h2 className="text-3xl font-extrabold mt-2 tracking-tight transition-colors duration-300" style={{ color: "var(--text)" }}>Pertanyaan yang Sering Ditanya</h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded-2xl overflow-hidden transition-colors duration-300" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-sm pr-4 transition-colors duration-300" style={{ color: "var(--text)" }}>{f.q}</span>
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? "text-white" : ""}`} style={openFaq === i ? { backgroundColor: "var(--brand-primary)", borderColor: "var(--brand-primary)" } : { backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--muted)" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div className="px-5 pb-5 text-sm leading-relaxed transition-colors duration-300" style={{ color: "var(--muted)" }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA + FORM */}
      <section id="kontak" className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--brand-accent)" }}>Siap Ekspor?</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight leading-none">Konsultasi Gratis.<br />Mulai Ekspor <span className="transition-colors duration-300" style={{ color: "var(--brand-accent)" }}>Minggu Ini.</span></h2>
              <p className="text-white/70 mt-4 leading-relaxed">Ceritakan komoditi flora kamu — kami kasih roadmap, estimasi biaya & timeline gratis. No commitment.</p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex gap-3"><span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">📞</span><div><div className="font-semibold">WhatsApp 24/7</div><div className="text-white/60">+62 812-3456-7890 • Balas &lt; 1 jam</div></div></div>
                <div className="flex gap-3"><span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">📧</span><div><div className="font-semibold">halo@floratrade.id</div><div className="text-white/60">Konsultasi via email juga bisa</div></div></div>
              </div>
              <div className="mt-8 backdrop-blur rounded-2xl p-4 border transition-colors duration-300" style={{ backgroundColor: "color-mix(in srgb, var(--brand-primary) 20%, transparent)", borderColor: "color-mix(in srgb, var(--brand-accent) 30%, transparent)" }}>
                <div className="text-sm font-bold">🎁 Bonus untuk 10 pendaftar pertama bulan ini:</div>
                <div className="text-sm text-white/80 mt-1">E-book “Panduan Lengkap Ekspor Flora untuk UMKM” (PDF 60 hal) + checklist HS Code flora.</div>
              </div>
            </div>

            <div className="rounded-[24px] p-6 lg:p-8 shadow-xl transition-colors duration-300" style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}>
              {formStatus === "success" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto transition-colors duration-300" style={{ backgroundColor: "var(--brand-light)", color: "var(--brand-primary)" }}>✓</div>
                  <div className="font-extrabold text-xl mt-4" style={{ color: "var(--text)" }}>Permintaan Terkirim!</div>
                  <p className="text-sm mt-2 transition-colors duration-300" style={{ color: "var(--muted)" }}>Tim kami akan hubungi via WhatsApp dalam 1 jam kerja. Cek WA kamu ya 🌿</p>
                  <button onClick={() => setFormStatus("idle")} className="mt-6 px-6 py-2.5 rounded-full border font-semibold text-sm transition-colors duration-300" style={{ borderColor: "var(--brand-accent)", color: "var(--text)" }}>Kirim lagi</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormStatus("success"); }} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold transition-colors duration-300" style={{ color: "var(--text)" }}>Nama Lengkap *</label>
                    <input required placeholder="Budi Santoso" className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", ["--tw-ring-color" as string]: "var(--brand-primary)" } as React.CSSProperties} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold transition-colors duration-300" style={{ color: "var(--text)" }}>Email *</label>
                      <input required type="email" placeholder="budi@email.com" className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", ["--tw-ring-color" as string]: "var(--brand-primary)" } as React.CSSProperties} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold transition-colors duration-300" style={{ color: "var(--text)" }}>No. HP / WhatsApp *</label>
                      <input required placeholder="0812xxxx" className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", ["--tw-ring-color" as string]: "var(--brand-primary)" } as React.CSSProperties} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold transition-colors duration-300" style={{ color: "var(--text)" }}>Jenis Kebutuhan *</label>
                    <select required className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", ["--tw-ring-color" as string]: "var(--brand-primary)" } as React.CSSProperties}>
                      <option value="">Pilih kebutuhan</option>
                      <option>Export Flora (Tanaman Hias/Bunga)</option>
                      <option>Import Benih/Bibit</option>
                      <option>Keduanya</option>
                      <option>Konsultasi Dokumen/Karantina</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold transition-colors duration-300" style={{ color: "var(--text)" }}>Pesan</label>
                    <textarea rows={4} placeholder="Contoh: Mau ekspor 200 Aglaonema ke Belanda, butuh bantuan PC & freight..." className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none transition-colors duration-300" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", ["--tw-ring-color" as string]: "var(--brand-primary)" } as React.CSSProperties} />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-full text-white font-bold text-sm hover:opacity-95 transition-all duration-300 shadow" style={{ backgroundColor: "var(--brand-primary)" }}>Kirim Permintaan →</button>
                  <a href={waLink("Halo FloraTrade mau konsultasi")} target="_blank" rel="noopener noreferrer" className="block w-full py-3.5 rounded-full border text-center font-semibold text-sm transition duration-300 hover:opacity-80" style={{ borderColor: "var(--brand-accent)", color: "var(--brand-primary)", backgroundColor: "var(--surface)" }}>💬 Chat WhatsApp Langsung</a>
                  <p className="text-[11px] text-center transition-colors duration-300" style={{ color: "var(--muted)" }}>Dengan mengirim form, kamu setuju dengan Kebijakan Privasi kami.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
