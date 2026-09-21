"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { articles, categories } from "@/data/articles";

function PengetahuanContent() {
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
    <div className="bg-[#fefcf8] min-h-screen">
      {/* Hero kecil */}
      <section className="bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <div className="text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase">Product Knowledge Hub</div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2">Pusat Pengetahuan Export Import Flora</h1>
            <p className="text-white/70 mt-3 leading-relaxed">Pelajari semua yang perlu kamu ketahui tentang ekspor-impor flora, regulasi, karantina, Incoterms, dan logistik cold chain — ditulis oleh tim agronomist & PPJK FloraTrade.</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari: phytosanitary, HS Code, cold chain..." className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
            <select value={active} onChange={(e) => handleCategoryChange(e.target.value)} className="px-5 py-3.5 rounded-full bg-white text-stone-900 text-sm font-semibold focus:outline-none">
              {categories.map((c) => (<option key={c.id} value={c.id}>{c.label}</option>))}
            </select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c.id} onClick={() => handleCategoryChange(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${active === c.id ? "bg-white text-emerald-900 border-white" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}`}>{c.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-stone-600">Menampilkan <b className="text-stone-900">{filtered.length}</b> artikel {active !== "semua" && <>di kategori <b className="text-emerald-700">{categories.find(c=>c.id===active)?.label}</b></>}</div>
          <Link href="/" className="text-sm font-semibold text-emerald-700 hover:underline">← Kembali ke Home</Link>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center text-stone-500">Tidak ada artikel ditemukan untuk “{search}”</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <Link key={a.id} href={`/pengetahuan/${a.slug}`} className="group bg-white rounded-[20px] border border-stone-200 overflow-hidden hover:shadow-xl transition flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-emerald-700 text-white">{a.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-stone-400">{new Date(a.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • {a.readingTime} • {a.author}</div>
                  <h3 className="font-bold text-stone-900 leading-tight mt-2 line-clamp-2 group-hover:text-emerald-700 transition">{a.title}</h3>
                  <p className="text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed flex-1">{a.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {a.tags.slice(0, 3).map((t) => (<span key={t} className="text-[11px] px-2 py-1 rounded-full bg-stone-100 text-stone-600">{t}</span>))}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-emerald-700">Baca Selengkapnya →</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Lead magnet */}
        <div className="mt-12 bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-[24px] p-6 lg:p-8 text-white flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="font-extrabold text-xl">Download Gratis: E-book Panduan Ekspor Flora</div>
            <p className="text-white/80 text-sm mt-1">60 halaman checklist: HS Code, dokumen, packaging, dan studi kasus UMKM. Masukkan email di form home untuk dapatkan.</p>
          </div>
          <Link href="/#kontak" className="px-6 py-3 rounded-full bg-white text-emerald-700 font-bold text-sm whitespace-nowrap">Ambil E-book Gratis →</Link>
        </div>
      </section>
    </div>
  );
}

export default function PengetahuanPage() {
  return (
    <Suspense fallback={<div className="bg-[#fefcf8] min-h-screen p-10 text-center text-stone-500">Memuat...</div>}>
      <PengetahuanContent />
    </Suspense>
  );
}
