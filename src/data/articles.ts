export type Category = "dasar" | "regulasi" | "incoterms" | "dokumen" | "logistik" | "tips";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
}

export const categories: { id: Category | "semua"; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "dasar", label: "Dasar Export Import" },
  { id: "regulasi", label: "Regulasi & Bea Cukai" },
  { id: "incoterms", label: "Incoterms" },
  { id: "dokumen", label: "Dokumen" },
  { id: "logistik", label: "Logistik & Pengiriman" },
  { id: "tips", label: "Tips & Studi Kasus" },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "alur-ekspor-tanaman-hias-indonesia",
    title: "Alur Ekspor Tanaman Hias Indonesia: Dari Kebun ke Rotterdam",
    excerpt: "Panduan lengkap alur ekspor tanaman hias — mulai dari sertifikat karantina, phytosanitary certificate, hingga penanganan cold chain.",
    content: `
## Mengapa Tanaman Hias Indonesia Laris di Pasar Global?

Indonesia adalah surga biodiversitas. Philodendron, Monstera variegata, Aglaonema, Anthurium — semuanya diburu kolektor Eropa, Timur Tengah, dan AS dengan harga 5-10x lipat.

### 1. Persiapan Dokumen Wajib
- **NPWP & NIB** sebagai eksportir
- **Sertifikat Karantina Pertanian (KT-12)** dari Badan Karantina Pertanian
- **Phytosanitary Certificate (PC)** — wajib untuk semua komoditi flora
- **Certificate of Origin (SKA)** Form D/E untuk preferensi tarif
- **PEB (Pemberitahuan Ekspor Barang)** via CEISA 4.0

### 2. Standar Packaging Flora
Tanaman hias tidak bisa asal packing. Gunakan:
- Media tanam steril (sphagnum moss / cocopeat steril)
- Box ventilated dengan kelembaban 80-85%
- Heat pack atau gel pack tergantung musim tujuan

> Tips: Untuk EU, pastikan tanaman bebas soil sesuai regulasi EU 2019/2072. Gunakan bare-root + moss steril.

### 3. Logistik
- **Air Freight** untuk tanaman hias premium (2-4 hari, suhu 18-22°C)
- **Sea Freight Reefer** untuk volume besar (bunga potong, benih)

Studi kasus: UMKM Bandung ekspor 2000 Aglaonema ke Belanda dengan air freight 3 hari, retensi hidup 98% dengan packaging ventilated + PC.
    `,
    category: "dasar",
    tags: ["tanaman hias", "ekspor flora", "phytosanitary"],
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
    author: "Tim FloraTrade",
    publishedAt: "2026-08-28",
    readingTime: "6 menit",
    featured: true,
  },
  {
    id: "2",
    slug: "hs-code-flora-cara-menentukannya",
    title: "Panduan HS Code Flora: Jangan Salah Klasifikasi, Bea Bisa Bengkak",
    excerpt: "Salah HS Code untuk flora bisa ditahan karantina. Pelajari HS 0601-0604 untuk tanaman hidup, bunga potong, dan dedaunan.",
    content: `
## HS Code Khusus Flora

| Komoditi | HS Code | Bea Masuk Impor (EU) |
|---|---|---|
| Tanaman hidup, umbi, akar | 0601 | 0-8% |
| Tanaman hidup lain (anggrek, dll) | 0602 | 0-6% |
| Bunga potong segar | 0603 | 8-12% |
| Dedaunan & ranting dekoratif | 0604 | 5-10% |

### Cara Menentukan HS Code yang Benar
1. Cek BTKI 2022 via INSW
2. Konsultasi ke Balai Karantina atau forwarder spesialis flora
3. Jika ragu, ajukan **Penetapan Klasifikasi** ke DJBC

Salah klasifikasi = penahanan karantina + denda. Jangan ambil risiko.
    `,
    category: "regulasi",
    tags: ["HS Code", "Bea Cukai", "BTKI"],
    coverImage: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop",
    author: "Rina Kusuma, Customs Expert",
    publishedAt: "2026-08-20",
    readingTime: "5 menit",
    featured: true,
  },
  {
    id: "3",
    slug: "phytosanitary-certificate-lolos-karantina",
    title: "Phytosanitary Certificate: Kunci Lolos Karantina Negara Tujuan",
    excerpt: "Tanpa PC, tanaman kamu pasti ditolak. Ini step-by-step pengurusan PC di Karantina Pertanian.",
    content: `
## Apa itu Phytosanitary Certificate?

Dokumen yang menyatakan tanaman bebas dari Organisme Pengganggu Tumbuhan Karantina (OPTK) sesuai ISPM 12.

### Alur PC:
1. Daftar di aplikasi **e-Phyto Indonesia**
2. Pemeriksaan fisik di lab karantina (2-3 hari)
3. Fumigasi jika diperlukan (methyl bromide)
4. Terbit PC elektronik (e-Phyto) — langsung terkirim ke NPPO negara tujuan

Biaya: Rp 150-500rb per shipment. Jauh lebih murah dari risiko reject di Rotterdam.
    `,
    category: "dokumen",
    tags: ["phytosanitary", "karantina", "e-Phyto"],
    coverImage: "https://images.unsplash.com/photo-1463936575829-25148e1db1b6?w=800&auto=format&fit=crop",
    author: "Dr. Budi Hartono",
    publishedAt: "2026-08-15",
    readingTime: "4 menit",
    featured: true,
  },
  {
    id: "4",
    slug: "fob-cif-exw-untuk-flora-mana-paling-aman",
    title: "FOB vs CIF vs EXW untuk Ekspor Flora: Mana yang Paling Aman?",
    excerpt: "Flora itu barang hidup dan fragile. Salah pilih Incoterms bisa bikin claim asuransi ditolak.",
    content: `
## Rekomendasi Incoterms untuk Flora

- **FOB (Free On Board)**: Paling umum. Risiko pindah ke buyer saat barang naik kapal/pesawat. Cocok jika buyer punya forwarder sendiri.
- **CIF (Cost Insurance Freight)**: Kamu tanggung freight + asuransi. Lebih menarik untuk buyer baru, tapi pastikan asuransi cover "perishable goods".
- **EXW (Ex Works)**: Jangan untuk flora pemula — buyer urus semua, termasuk karantina di Indonesia yang rumit.

> Untuk tanaman hias premium, gunakan **CPT/CIP Air Freight** dengan asuransi perishable + klausul "live arrival guarantee".
    `,
    category: "incoterms",
    tags: ["Incoterms 2020", "FOB", "CIF"],
    coverImage: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=800&auto=format&fit=crop",
    author: "Andi Wijaya",
    publishedAt: "2026-08-10",
    readingTime: "5 menit",
  },
  {
    id: "5",
    slug: "fcl-vs-lcl-untuk-benih-dan-bunga-potong",
    title: "FCL vs LCL vs Air Freight: Pilihan Logistik untuk Benih & Bunga Potong",
    excerpt: "Bunga potong butuh 2-4°C sepanjang jalan. Salah pilih kontainer, bunga layu sebelum sampai.",
    content: `
## Perbandingan Moda

**Air Freight** — Bunga potong (mela, krisan), tanaman variegata. 1-3 hari, suhu terkontrol, biaya $4-6/kg.

**Reefer LCL** — Benih, umbi, tanaman keras. Digabung, suhu 15°C, cocok untuk 1-5 CBM percobaan.

**Reefer FCL 40ft** — Ekspor massal ke Jepang/Timur Tengah. 5000-8000 bibit per kontainer.

Tips: Selalu minta **data logger suhu** dan jangan matikan cold chain dari farm hingga bandara.
    `,
    category: "logistik",
    tags: ["cold chain", "air freight", "reefer"],
    coverImage: "https://images.unsplash.com/photo-1498556734294-d924985f9a80?w=800&auto=format&fit=crop",
    author: "Tim Logistik FloraTrade",
    publishedAt: "2026-08-05",
    readingTime: "6 menit",
  },
  {
    id: "6",
    slug: "cara-hitung-bea-masuk-untuk-import-benih",
    title: "Cara Hitung Bea Masuk Import Benih & Bibit Unggul dari Thailand",
    excerpt: "Mau import benih monstera atau benih sayur premium? Ini simulasi hitung bea masuk + PPN + PPh nya.",
    content: `
## Simulasi Impor Benih 100kg @ USD 2000

- CIF: USD 2000
- Kurs: Rp 16.500
- HS 1209.91 (benih untuk ditanam): BM 5%
- PPN 11%, PPh 7.5% (jika punya API-P)

Total pungutan sekitar **Rp 7.8jt** di luar biaya karantina.

Wajib: **Surat Izin Pemasukan Benih** dari Kementan + Karantina.
    `,
    category: "regulasi",
    tags: ["impor benih", "bea masuk"],
    coverImage: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?w=800&auto=format&fit=crop",
    author: "Dian Sastro",
    publishedAt: "2026-07-28",
    readingTime: "4 menit",
  },
  {
    id: "7",
    slug: "tips-memilih-freight-forwarder-flora",
    title: "Tips Memilih Freight Forwarder Spesialis Flora (Jangan Asal Murah!)",
    excerpt: "Forwarder general belum tentu paham phytosanitary. Ini checklist wajib sebelum kamu pilih.",
    content: `
## Checklist Forwarder Flora

✅ Punya izin PPJK + anggota ALFI/ILFA
✅ Pernah handle PC & KT-12 minimal 20 shipment flora
✅ Punya gudang karantina transit dengan suhu terkontrol
✅ Bisa tracking real-time + data logger
✅ Koneksi dengan airline yang terima live plants (Garuda, SQ, Emirates)

Red flag: Menjanjikan "tanpa karantina" — itu ilegal dan pasti bermasalah.
    `,
    category: "tips",
    tags: ["freight forwarder", "tips ekspor"],
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    author: "Tim FloraTrade",
    publishedAt: "2026-07-20",
    readingTime: "5 menit",
  },
  {
    id: "8",
    slug: "studi-kasus-umkm-ekspor-porang-ke-china",
    title: "Studi Kasus: UMKM Porang & Kunir Putih Tembus Pasar China 20 Ton/Bulan",
    excerpt: "Dari petani lokal Wonogiri sampai supply chain ekspor umbi-umbian yang now jadi superfood global.",
    content: `
## Dari Lokal ke Global

Kelompok tani Wonogiri dibina FloraTrade mulai dari sortasi, pengeringan, hingga chip porang standar ekspor (kadar glukomanan >15%).

Hasil: Kontrak 20 ton/bulan dengan buyer Yunnan, harga FOB Semarang USD 2.8/kg — naik 3x dari harga lokal.
    `,
    category: "tips",
    tags: ["studi kasus", "porang", "UMKM"],
    coverImage: "https://images.unsplash.com/photo-1524598171347-4416da3a3705?w=800&auto=format&fit=crop",
    author: "Tim FloraTrade",
    publishedAt: "2026-07-12",
    readingTime: "7 menit",
  },
  {
    id: "9",
    slug: "dokumen-wajib-ekspor-flora-peb-bl-invoice",
    title: "Dokumen Wajib Ekspor Flora: PEB, Invoice, Packing List & Bill of Lading",
    excerpt: "Checklist 7 dokumen yang bikin shipment flora kamu tidak tertahan di pelabuhan.",
    content: `
## Checklist Dokumen

1. Invoice & Packing List detail (nama latin wajib)
2. PEB via CEISA
3. Phytosanitary Certificate
4. Certificate of Origin
5. Fumigation Certificate (jika pakai kayu palet)
6. Bill of Lading / AWB
7. Surat Keterangan Asal Benih (untuk benih)

Nama latin harus sesuai IPNI, contoh: *Monstera deliciosa* bukan "monstera jumbo".
    `,
    category: "dokumen",
    tags: ["PEB", "BL", "dokumen ekspor"],
    coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
    author: "Siti Nurhaliza",
    publishedAt: "2026-07-02",
    readingTime: "5 menit",
  },
];
