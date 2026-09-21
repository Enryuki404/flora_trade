# Transfer Knowledge — FloraTrade Nusantara (Percakapan Lengkap)

> **Tanggal:** 2 Sep 2026  
> **Project:** Landing Page Export-Import Flora Non-Tambang  
> **Lokasi:** `C:\website-imp-ext`  
> **Stack:** Next.js 16.3.4 (App Router, Turbopack) + Tailwind CSS 4 + TypeScript  
> **Online sementara:** https://0f890129ad1200.lhr.life (SSH tunnel via localhost.run, pid ssh 2332 → `localhost:3000`)

---

## 1. Request Awal
**User:** Landing page import-export fokus komoditi non-tambang terutama **flora** (tanaman hias, bunga potong, benih, umbi, rempah). Struktur sesuai MD 10 section + Product Knowledge Hub + CMS schema `Article`.

**Jawab:** Dibuat brand **FloraTrade Nusantara** dengan tema emerald-flora.

---

## 2. Scaffold Project
```powershell
# Node v24.19.0, npm 11.17.0 (install via winget OpenJS.NodeJS.LTS)
npx --yes create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install
```
- `src/app/layout.tsx:1` → metadata SEO, font Geist + Plus Jakarta Sans
- `src/app/globals.css:1` → `@import "tailwindcss"`
- `src/components/Navbar.tsx:1` → sticky navbar + dropdown Layanan & Product Knowledge, CTA WA
- `src/components/Footer.tsx:1` → 4 kolom
- `src/components/WhatsAppWidget.tsx:1` → floating WA

**Data:** `src/data/articles.ts:1` → 9 artikel flora (alur ekspor monstera, HS Code 0601-0604, phytosanitary e-Phyto, FOB/CIF, cold chain, dll.) + `categories:13`.

**Landing `src/app/page.tsx:1` (10 section):**
1. Hero (gradient emerald + card shipment 1.200 Monstera → Amsterdam)
2. Trust Signals (Counter animasi 500+ shipment, 10+ tahun, 50+ negara, 24/7)
3. Layanan Utama (4 kartu flora)
4. Product Knowledge Preview (3 featured)
5. Kenapa Memilih Kami (agrnomist + data logger)
6. Testimoni (3 UMKM) + studi kasus
7. FAQ accordion (6 Q&A)
8. CTA + Form (validasi + success state + WA)
9. Footer

**Knowledge Hub:**
- `src/app/pengetahuan/page.tsx:1` → hero kecil + search + filter kategori + grid 3 kolom
- `src/app/pengetahuan/[slug]/page.tsx:1` → `generateStaticParams`, mdToHtml, sidebar (terbaru/kategori/CTA)

Build: `npm run build` → 14 halaman static SSG ✓

---

## 3. Fix Watchpack Error (Windows)
**Error:** 
```
Watchpack Error (initial scan): EINVAL: invalid argument, lstat 'C:\DumpStack.log.tmp'
lstat 'C:\System Volume Information' / 'C:\pagefile.sys' / 'C:\swapfile.sys'
```
**Penyebab:** Workspace root `/` → Next scan `C:\` termasuk file system Windows.

**Fix `next.config.ts:1`:**
```ts
import path from "path";
import fs from "fs";
const systemFileRe = /DumpStack\.log\.tmp|pagefile\.sys|swapfile\.sys|System Volume Information/;
 // patch fs.lstat/lstatSync → fake stats untuk file system
outputFileTracingRoot: path.resolve(process.cwd()),
turbopack: { root: path.resolve(process.cwd()) },
webpack: (config) => { config.watchOptions.ignored = [ /DumpStack.*/, /pagefile.*/, ... ]; return config; }
```
+ buat fake `.git/HEAD` biar Next anggap `C:\website-imp-ext` sebagai workspace root.

**Verifikasi:** `npm run dev -- --port 3001` → `Ready in 1012ms`, `HTTP 200` tanpa stderr, `npm run build` tetap OK.

---

## 4. Apache Reverse Proxy
**User:** "sepertinya perlu apache deh bro untuk aksesnya"

**Jawab:** Next.js = Node.js, Apache jadi pintu depan (port 80 → 3000).

**Config `apache-floratrade.conf:1`:**
```apache
<VirtualHost *:80>
  ServerName localhost
  ProxyPreserveHost On
  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/
  RewriteCond %{HTTP:Upgrade} websocket [NC]
  RewriteRule ^/?(.*) "ws://127.0.0.1:3000/$1" [P,L]
</VirtualHost>
```
- Lokasi XAMPP: `C:\xampp\apache\conf\extra\httpd-floratrade.conf` + include di `httpd.conf`
- Modul: `proxy_module`, `proxy_http`, `proxy_wstunnel`, `rewrite`, `headers`
- Production: `npm run build` + `npm run start -- --port 3000` (pm2: `ecosystem.config.js:1`)

**Status XAMPP:** `winget install ApacheFriends.Xampp.8.2` masih download background (pid 8988) → `C:\xampp` belum ada saat itu, tapi config sudah siap.

---

## 5. Online Website
**User:** "bisa kamu buat itu menjadi online website?"

**Jawab:** Production `localhost:3000` ditunnel via SSH `localhost.run`:
```powershell
# prod sudah jalan pid 7800 → status 200
C:\Windows\System32\OpenSSH\ssh.exe -o StrictHostKeyChecking=no -R 80:localhost:3000 nokey@localhost.run
# log: C:\temp\ssh.log → https://0f890129ad1200.lhr.life (aktif, status 200, HTML FloraTrade)
```
- Tunnel temporary, URL ganti tiap restart. Keep alive via `C:\temp\start-ssh.bat` + `Start-Process`.
- Alternatif `localtunnel` dicoba tapi butuh deps `y18n` → pivot ke `ssh` lebih stabil.
- Localtunnel copy ke `C:\temp\lt` juga dicoba.

---

## 6. Deploy via Git
**User:** "cara deploynya? adanya cuma lewat git saja"

**Jawab:** Dibuat `DEPLOY-GIT.md:1` + `ecosystem.config.js:1` + `.gitignore:1`.

**Opsi A (Vercel via GitHub):**
```bash
git init; git add .; git commit -m "feat: FloraTrade"
git remote add origin https://github.com/USERNAME/floratrade.git
git push -u origin main
# Vercel → Import Project → auto deploy → https://floratrade.vercel.app
```

**Opsi B (VPS Apache via bare repo + post-receive hook):**
```bash
# VPS: /opt/git/floratrade.git → hooks/post-receive → checkout → npm ci → npm run build → pm2 restart
git remote add vps ssh://user@IP/opt/git/floratrade.git
git push vps main
```
Git belum terinstall di PC ini (`where git` = False, winget MinGit timeout) → panduan manual untuk laptop user.

---

## 7. Move ke OpenCode di Laptop
**User:** "bisa ngga aku move ini ke open code di pc ku? soalnya aku memakai laptop?"

**Jawab:** Dibuat ZIP:
- Full 73MB: `C:\temp\website-imp-ext.zip`
- Clean 124KB (tanpa node_modules/.next): `C:\temp\website-imp-ext-clean.zip` + `C:\temp\clean\` (33 file)

**Cara pindah:**
1. ZIP: `Expand-Archive C:\temp\website-imp-ext-clean.zip -DestinationPath C:\website-imp-ext` → `npm install` → `npm run dev`
2. Git: `git clone https://github.com/USER/floratrade.git` → `npm install`
3. Buka OpenCode: `cd C:\website-imp-ext; opencode` atau `File → Open Folder`

Syarat laptop: Node.js 20+ (`node -v`).

---

## 8. Transfer Knowledge Hub
**User:** "kalo transfer knowledge dulu gmana bro" → "bagaimana perintah untuk opencode di pcku membaca transfer knowledge dari laptopku?"

**Jawab:**
- Sumber: `src/data/articles.ts:27` (tambah artikel baru tinggal push object)
- Hub: `src/app/pengetahuan/page.tsx:1` (search/filter), `[slug]/page.tsx:1` (detail + sidebar)
- CMS future: ganti static fetch ke Sanity/Strapi/Contentful.
- Perintah OpenCode di PC (setelah file ke-copy):
```
baca src/data/articles.ts dan rangkum kategori
baca src/data/articles.ts:27
baca DEPLOY-GIT.md dan jelaskan deploy via git
```
- Persistent: tambah ke `AGENTS.md:1` biar auto-load.

---

## 9. File Penting
| File | Fungsi |
|------|--------|
| `src/data/articles.ts:1` | 9 artikel + kategori |
| `src/app/page.tsx:1` | Landing 10 section |
| `src/app/pengetahuan/page.tsx:1` | Hub search/filter |
| `src/app/pengetahuan/[slug]/page.tsx:1` | Detail SSG |
| `next.config.ts:1` | Fix Watchpack + tracing |
| `apache-floratrade.conf:1` | Reverse proxy Apache |
| `DEPLOY-GIT.md:1` | Panduan deploy Git |
| `ecosystem.config.js:1` | PM2 |
| `TRANSFER-KNOWLEDGE.md` (ini) | Rangkuman percakapan |

---

## 10. Status Akhir
- ✅ Landing flora + Knowledge Hub jalan (build 14 pages)
- ✅ Watchpack fix (fs.lstat patch)
- ✅ Apache config siap
- ✅ Production `localhost:3000` (pid 7800) + tunnel online `https://0f890129ad1200.lhr.life` (pid ssh 2332)
- ✅ ZIP clean + panduan Git siap untuk pindah ke laptop OpenCode
- ⏳ Git & XAMPP install via winget masih background (timeout download, perlu manual `winget install Git.Git` di laptop)
- Next: push ke GitHub → clone di laptop → `npm install` → `opencode` → `baca src/data/articles.ts`

---
*Generate otomatis dari percakapan 2 Sep 2026 — FloraTrade Nusantara.*
