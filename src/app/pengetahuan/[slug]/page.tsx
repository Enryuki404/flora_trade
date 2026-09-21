import { articles } from "@/data/articles";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function mdToHtml(md: string) {
  // super minimal markdown -> html for demo (headings, tables, bold, blockquote, lists)
  let html = md
    .replace(/^### (.*$)/gim, '<h3 class="font-bold text-stone-900 mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-extrabold text-stone-900 mt-8 mb-3">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-xl my-4 text-sm text-stone-700">$1</blockquote>')
    .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc text-stone-700">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-stone-700">$1</li>')
    .replace(/\n\n/g, '</p><p class="mt-4 leading-relaxed text-stone-700">')
  ;
  // table quick
  html = html.replace(/\|/g, ' | ');
  return `<p class="mt-4 leading-relaxed text-stone-700">${html}</p>`;
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
        <Link href="/pengetahuan" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">← Kembali ke Product Knowledge</Link>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-6">
          <article className="bg-white rounded-[24px] border border-stone-200 overflow-hidden">
            <img src={article.coverImage} alt={article.title} className="w-full h-[380px] object-cover" />
            <div className="p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-emerald-700 text-white">{article.category}</span>
                <span className="text-xs text-stone-500">{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • {article.readingTime}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight tracking-tight">{article.title}</h1>
              <div className="flex items-center gap-3 mt-4 text-sm text-stone-500">
                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">{article.author[0]}</span>
                <span>Ditulis oleh <b className="text-stone-900">{article.author}</b></span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {article.tags.map((t) => (<span key={t} className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">{t}</span>))}
              </div>

              <div className="prose prose-stone max-w-none mt-8 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: mdToHtml(article.content) }} />

              <div className="mt-10 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-stone-900">Butuh bantuan ekspor flora ini?</div>
                  <div className="text-sm text-stone-600">Konsultasi gratis — kami bantu cek regulasi negara tujuan.</div>
                </div>
                <a href="https://wa.me/6281234567890?text=Halo%20FloraTrade%20mau%20konsultasi%20soal%20artikel%20" target="_blank" className="px-6 py-3 rounded-full bg-emerald-700 text-white font-bold text-sm whitespace-nowrap">Konsultasi via WA →</a>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="font-bold text-stone-900">Artikel Terbaru</div>
              <div className="mt-4 space-y-4">
                {latest.map((a) => (
                  <Link key={a.id} href={`/pengetahuan/${a.slug}`} className="flex gap-3 group">
                    <img src={a.coverImage} alt={a.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <div className="text-xs font-bold tracking-wide uppercase text-emerald-700">{a.category}</div>
                      <div className="text-sm font-semibold text-stone-900 leading-tight line-clamp-2 group-hover:text-emerald-700">{a.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="font-bold text-stone-900">Kategori</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {Array.from(new Set(articles.map(a=>a.category))).map((c) => (
                  <Link key={c} href={`/pengetahuan?kategori=${c}`} className="px-3 py-1.5 rounded-full bg-stone-100 text-xs font-semibold hover:bg-emerald-100 hover:text-emerald-700">{c}</Link>
                ))}
              </div>
            </div>

            <div className="bg-emerald-700 rounded-2xl p-6 text-white">
              <div className="font-bold">Mau Ekspor Minggu Ini?</div>
              <p className="text-sm text-white/80 mt-2">Dapatkan simulasi biaya & timeline gratis untuk komoditi flora kamu.</p>
              <Link href="/#kontak" className="mt-4 inline-block px-5 py-2.5 rounded-full bg-white text-emerald-700 font-bold text-sm w-full text-center">Konsultasi Gratis</Link>
            </div>

            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6">
                <div className="font-bold text-stone-900">Artikel Terkait</div>
                <div className="mt-3 space-y-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/pengetahuan/${r.slug}`} className="block text-sm font-semibold text-stone-700 hover:text-emerald-700">→ {r.title}</Link>
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
