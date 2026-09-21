import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">🌿</div>
              <div>
                <div className="font-bold text-white leading-none">FloraTrade</div>
                <div className="text-[11px] tracking-[0.18em] text-emerald-400 font-semibold uppercase">Nusantara</div>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Spesialis jasa export-import komoditi flora non-tambang. Kami bantu UMKM dan agribisnis Indonesia tembus pasar global — legal, segar, tepat waktu.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="/#" aria-label="Instagram FloraTrade" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition text-sm">ig</a>
              <a href="/#" aria-label="LinkedIn FloraTrade" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition text-sm">in</a>
              <a href="/#" aria-label="YouTube FloraTrade" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition text-sm">yt</a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white mb-4">Navigasi</div>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/#layanan" className="hover:text-white">Layanan</Link></li>
              <li><Link href="/pengetahuan" className="hover:text-white">Product Knowledge</Link></li>
              <li><Link href="/#tentang" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link href="/#kontak" className="hover:text-white">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-4">Layanan</div>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>Jasa Export Flora (Tanaman Hias, Bunga)</li>
              <li>Jasa Import Benih & Bibit</li>
              <li>Cold Chain & Reefer Logistics</li>
              <li>Phytosanitary & Karantina</li>
              <li>Customs Clearance (PEB/PIB)</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-4">Kontak</div>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>📍 Jl. Flora Raya No.88, Lembang — Bandung<br />Gudang Karantina: Pelabuhan Tanjung Priok & Bandara Soetta</li>
              <li>📧 halo@floratrade.id</li>
              <li>📞 +62 812-3456-7890 (WA 24/7)</li>
              <li>🕘 Senin–Sabtu 08.00–17.00 WIB</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-stone-500">
          <span>© 2026 FloraTrade Nusantara. All rights reserved.</span>
          <span className="flex gap-4"><a href="/#privacy" className="hover:text-white">Kebijakan Privasi</a><a href="/#terms" className="hover:text-white">Syarat Layanan</a></span>
        </div>
      </div>
    </footer>
  );
}
