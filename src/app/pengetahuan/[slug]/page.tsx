import { articles, categories } from "@/data/articles";
import Link from "next/link";
import { notFound } from "next/navigation";
import SafeImage, { SafeThumb } from "@/components/SafeImage";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mdToHtml(md: string): string {
  // Trusted source: src/data/articles.ts (internal) — tetap escape HTML untuk cegah XSS
  // jika konten suatu saat berasal dari input user/CMS. Sanitizer ringan tanpa DOMPurify/isomorphic-dompurify.
  const trimmed = md.trim();
  if (!trimmed) return "";
  const escaped = escapeHtml(trimmed);
  const inline = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  const blocks = escaped.split(/\n\s*\n/);
  const out: string[] = [];

  const isSeparatorRow = (row: string) => /^[\s|:\-]+$/.test(row) && row.includes("---");

  const buildTable = (block: string): string => {
    const rows = block
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);
    const filtered = rows.filter((r) => !isSeparatorRow(r));
    if (filtered.length === 0) return "";
    const headerCells = filtered[0]
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c !== "");
    const bodyRows = filtered.slice(1);
    const thead =
      headerCells.length > 0
        ? `<thead><tr>${headerCells.map((c) => `<th class="border border-stone-200 px-3 py-2 text-left font-bold text-stone-900" style="background: var(--brand-light, #ECFDF5)">${inline(c)}</th>`).join("")}</tr></thead>`
        : "";
    const tbody =
      bodyRows.length > 0
        ? `<tbody>${bodyRows
            .map((r) => {
              const cells = r
                .split("|")
                .map((c) => c.trim())
                .filter((c) => c !== "");
              // skip malformed empty rows
              if (cells.length === 0) return "";
              return `<tr>${cells.map((c) => `<td class="border border-stone-200 px-3 py-2 text-stone-700">${inline(c)}</td>`).join("")}</tr>`;
            })
            .join("")}</tbody>`
        : "";
    return `<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse">${thead}${tbody}</table></div>`;
  };

  for (const block of blocks) {
    const b = block.trim();
    if (!b) continue;

    // table detection: block contains pipe and every non-empty line contains pipe
    const lines = b.split("\n");
    const nonEmptyLines = lines.map((l) => l.trim()).filter(Boolean);
    const isTableBlock =
      nonEmptyLines.length >= 1 &&
      nonEmptyLines.every((l) => l.includes("|")) &&
      nonEmptyLines.some((l) => l.split("|").filter((c) => c.trim() !== "").length >= 2);

    if (isTableBlock) {
      out.push(buildTable(b));
      continue;
    }

    // heading H2 / H3 (single line block)
    if (/^###\s+/.test(b)) {
      const content = b.replace(/^###\s+/, "").trim();
      out.push(`<h3 class="font-bold text-stone-900 mt-6 mb-2">${inline(content)}</h3>`);
      continue;
    }
    if (/^##\s+/.test(b)) {
      const content = b.replace(/^##\s+/, "").trim();
      out.push(`<h2 class="text-xl font-extrabold text-stone-900 mt-8 mb-3">${inline(content)}</h2>`);
      continue;
    }

    // blockquote: one or multiple lines starting with >
    if (/^>\s?/.test(b)) {
      const qLines = b
        .split("\n")
        .map((l) => l.replace(/^>\s?/, "").trim())
        .filter(Boolean);
      const joined = qLines.map((l) => inline(l)).join("<br>");
      out.push(`<blockquote class="rounded-r-xl my-4 text-sm text-stone-700 p-4" style="border-left:4px solid var(--brand-primary, #0F7A4B); background: var(--brand-light, #ECFDF5)">${joined}</blockquote>`);
      continue;
    }

    // unordered list block: all lines start with -
    if (nonEmptyLines.length > 0 && nonEmptyLines.every((l) => /^\-\s+/.test(l))) {
      const items = nonEmptyLines.map((l) => {
        const text = l.replace(/^\-\s+/, "").trim();
        return `<li class="ml-6 list-disc text-stone-700">${inline(text)}</li>`;
      });
      out.push(`<ul class="my-4 space-y-1.5">${items.join("")}</ul>`);
      continue;
    }

    // ordered list block: all lines start with digit.
    if (nonEmptyLines.length > 0 && nonEmptyLines.every((l) => /^\d+\.\s+/.test(l))) {
      const items = nonEmptyLines.map((l) => {
        const text = l.replace(/^\d+\.\s+/, "").trim();
        return `<li class="ml-6 list-decimal text-stone-700">${inline(text)}</li>`;
      });
      out.push(`<ol class="my-4 space-y-1.5">${items.join("")}</ol>`);
      continue;
    }

    // fallback paragraph: collapse single newlines to space, trim, no unclosed <p>
    const para = b.replace(/\n/g, " ").trim();
    if (para) {
      out.push(`<p class="mt-4 leading-relaxed text-stone-700">${inline(para)}</p>`);
    }
  }

  return out.join("\n");
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();
  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
  const latest = articles.slice(0, 4);

  return (
    <div className="bg-[#fefcf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/pengetahuan" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-colors duration-300" style={{ color: "var(--brand-primary, #0F7A4B)" }}>← Kembali ke Product Knowledge</Link>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-6">
          <article className="bg-white rounded-[24px] border border-stone-200 overflow-hidden shadow-sm">
            <div className="relative w-full h-[380px] overflow-hidden bg-stone-100">
              <SafeImage src={article.coverImage} alt={article.title} sizes="(max-width: 1024px) 100vw, 700px" className="object-cover" />
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-white transition-colors duration-300" style={{ backgroundColor: "var(--brand-primary, #0F7A4B)" }}>{article.category}</span>
                <span className="text-xs text-stone-500">{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • {article.readingTime}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight tracking-tight">{article.title}</h1>
              <div className="flex items-center gap-3 mt-4 text-sm text-stone-500">
                <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300" style={{ backgroundColor: "var(--brand-light, #ECFDF5)", color: "var(--brand-primary, #0F7A4B)" }}>{article.author[0]}</span>
                <span>Ditulis oleh <b className="text-stone-900">{article.author}</b></span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {article.tags.map((t) => (<span key={t} className="text-xs px-2.5 py-1 rounded-full text-stone-600 transition-colors duration-300" style={{ backgroundColor: "var(--brand-light, #ECFDF5)" }}>{t}</span>))}
              </div>

              <div className="prose prose-stone max-w-none mt-8 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: mdToHtml(article.content) }} />

              <div className="mt-10 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300 border" style={{ backgroundColor: "var(--brand-light, #ECFDF5)", borderColor: "color-mix(in srgb, var(--brand-accent, #34D399) 40%, #e7e5e4)" }}>
                <div>
                  <div className="font-bold text-stone-900">Butuh bantuan ekspor flora ini?</div>
                  <div className="text-sm text-stone-600">Konsultasi gratis — kami bantu cek regulasi negara tujuan.</div>
                </div>
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo FloraTrade mau konsultasi soal artikel: ${article.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-white font-bold text-sm whitespace-nowrap transition-colors duration-300 hover:opacity-95"
                  style={{ backgroundColor: "var(--brand-primary, #0F7A4B)" }}
                >
                  Konsultasi via WA →
                </a>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <div className="font-bold text-stone-900">Artikel Terbaru</div>
              <div className="mt-4 space-y-4">
                {latest.map((a) => (
                  <Link key={a.id} href={`/pengetahuan/${a.slug}`} className="flex gap-3 group">
                    <SafeThumb src={a.coverImage} alt={a.title} />
                    <div>
                      <div className="text-xs font-bold tracking-wide uppercase transition-colors duration-300" style={{ color: "var(--brand-primary, #0F7A4B)" }}>{a.category}</div>
                      <div className="text-sm font-semibold text-stone-900 leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-[var(--brand-primary)]">{a.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <div className="font-bold text-stone-900">Kategori</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories
                  .filter((cat) => cat.id !== "semua")
                  .map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/pengetahuan?kategori=${encodeURIComponent(cat.id)}`}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold hover:opacity-80 transition-colors duration-300"
                      style={{ backgroundColor: "var(--brand-light, #ECFDF5)", color: "var(--brand-primary, #0F7A4B)" }}
                    >
                      {cat.label}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 text-white transition-colors duration-300" style={{ background: `linear-gradient(to bottom right, var(--brand-primary, #0F7A4B), var(--brand-primary-hover, #0D6A41))` }}>
              <div className="font-bold">Mau Ekspor Minggu Ini?</div>
              <p className="text-sm text-white/80 mt-2">Dapatkan simulasi biaya & timeline gratis untuk komoditi flora kamu.</p>
              <Link href="/#kontak" className="mt-4 inline-block px-5 py-2.5 rounded-full bg-white font-bold text-sm w-full text-center transition-colors duration-300 hover:bg-stone-50" style={{ color: "var(--brand-primary, #0F7A4B)" }}>Konsultasi Gratis</Link>
            </div>

            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <div className="font-bold text-stone-900">Artikel Terkait</div>
                <div className="mt-3 space-y-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/pengetahuan/${r.slug}`} className="block text-sm font-semibold hover:opacity-80 transition-colors duration-300" style={{ color: "var(--brand-primary, #0F7A4B)" }}>→ {r.title}</Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
