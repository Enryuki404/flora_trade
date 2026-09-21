"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { articles, categories } from "@/data/articles";
import SafeImage from "@/components/SafeImage";
import { useBrand } from "@/context/BrandContext";

function PengetahuanContent() {
  const { brand } = useBrand();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<string>(() => {
    const param = searchParams.get("kategori");
    const allowed = categories.map((c) => c.id);
    return param && (allowed as string[]).includes(param) ? param : "semua";
  });

  useEffect(() => {
    const param = searchParams.get("kategori");
    const allowed = categories.map((c) => c.id);
    const next = param && (allowed as string[]).includes(param) ? param : "semua";
    if (next !== active) setActive(next);
  }, [searchParams, active]);

  const handleCategoryChange = (value: string) => {
    const allowed = categories.map((c) => c.id);
    const next = (allowed as string[]).includes(value) ? value : "semua";
    setActive(next);
    router.push(`?kategori=${next}`);
  };

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = active === "semua" || a.category === active;
      const q = search.toLowerCase();
      const matchSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, active]);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero kecil — brand-aware */}
      <section className="text-white transition-colors duration-300" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <div className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--brand-accent)" }}>Product Knowledge Hub</div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2">Pusat Pengetahuan Export Import Flora</h1>
            <p className="text-white/70 mt-3 leading-relaxed">Pelajari semua yang perlu kamu ketahui tentang ekspor-impor flora, regulasi, karantina, Incoterms, dan logistik cold chain — ditulis oleh tim agronomist & PPJK {brand.name}.</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari: phytosanitary, HS Code, cold chain..." className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-colors duration-300" style={{ ["--tw-ring-color" as string]: "var(--brand-accent)" } as React.CSSProperties} />
            </div>
            <select value={active} onChange={(e) => handleCategoryChange(e.target.value)} className="px-5 py-3.5 rounded-full bg-white text-stone-900 text-sm font-semibold focus:outline-none transition-colors duration-300">
              {categories.map((c) => (<option key={c.id} value={c.id}>{c.label}</option>))}
            </select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c.id} onClick={() => handleCategoryChange(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${active === c.id ? "bg-white border-white shadow" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}`} style={active === c.id ? { color: "var(--brand-primary)" } : undefined}>{c.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-visible">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm transition-colors duration-300" style={{ color: "var(--muted)" }}>Menampilkan <b style={{ color: "var(--text)" }}>{filtered.length}</b> artikel {active !== "semua" && <>di kategori <b className="transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>{categories.find(c=>c.id===active)?.label}</b></>}</div>
          <Link href="/" className="text-sm font-semibold hover:opacity-80 transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>← Kembali ke Home</Link>
        </div>

        {filtered.length === 0 ? (
          <div className="border rounded-2xl p-10 text-center transition-colors duration-300" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--muted)" }}>Tidak ada artikel ditemukan untuk “{search}”</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible pt-1 pb-2">
            {filtered.map((a) => (
              <Link key={a.id} href={`/pengetahuan/${a.slug}`} className="group rounded-[20px] border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col" style={{ backgroundColor: "var(--surface)", borderColor: "color-mix(in srgb, var(--brand-accent) 30%, var(--border))" }}>
                <div className="relative h-48 overflow-hidden isolate" style={{ backgroundColor: "var(--border)" }}>
                  <SafeImage
                    src={a.coverImage}
                    alt={a.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 z-10 text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white shadow-md transition-colors duration-300" style={{ backgroundColor: "var(--brand-primary)" }}>{a.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs transition-colors duration-300" style={{ color: "var(--muted)" }}>{new Date(a.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • {a.readingTime} • {a.author}</div>
                  <h3 className="font-bold leading-tight mt-2 line-clamp-2 transition-colors duration-300 group-hover:text-[var(--brand-primary)]" style={{ color: "var(--text)" }}>{a.title}</h3>
                  <p className="text-sm mt-2 line-clamp-2 leading-relaxed flex-1 transition-colors duration-300" style={{ color: "var(--muted)" }}>{a.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {a.tags.slice(0, 3).map((t) => (<span key={t} className="text-[11px] px-2 py-1 rounded-full transition-colors duration-300" style={{ backgroundColor: "var(--brand-light)", color: "var(--brand-primary)" }}>{t}</span>))}
                  </div>
                  <div className="mt-4 text-sm font-semibold transition-colors duration-300" style={{ color: "var(--brand-primary)" }}>Baca Selengkapnya →</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Lead magnet — brand gradient */}
        <div className="mt-12 rounded-[24px] p-6 lg:p-8 text-white flex flex-col lg:flex-row items-center gap-6 transition-colors duration-300" style={{ background: `linear-gradient(to right, var(--brand-primary), var(--brand-primary-hover))` }}>
          <div className="flex-1">
            <div className="font-extrabold text-xl">Download Gratis: E-book Panduan Ekspor Flora</div>
            <p className="text-white/80 text-sm mt-1">60 halaman checklist: HS Code, dokumen, packaging, dan studi kasus UMKM. Masukkan email di form home untuk dapatkan.</p>
          </div>
          <Link href="/#kontak" className="px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-colors duration-300 shadow" style={{ backgroundColor: "#fff", color: "var(--brand-primary)" }}>Ambil E-book Gratis →</Link>
        </div>
      </section>
    </div>
  );
}

export default function PengetahuanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-10 text-center transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--muted)" }}>Memuat...</div>}>
      <PengetahuanContent />
    </Suspense>
  );
}
