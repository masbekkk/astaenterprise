import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import NewsletterForm from "@/components/NewsletterForm";
import { mediaCategories } from "@/data/content";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

export default function MediaPage() {
  const { t, lang } = useApp();
  const [active, setActive] = useState("all");
  
  // Dynamic WPGraphQL State
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch WPGraphQL Data
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const query = `
          query GetEnterpriseMedias {
            enterpriseMedias(first: 100) {
              nodes {
                id
                title
                slug
                date
                content
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                enterpriseMediaSettings {
                  readTime
                  englishTitle
                  englishExcerpt
                }
                enterprisePlatforms {
                  nodes {
                    slug
                  }
                }
                mediaCategories {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        `;

        const response = await fetch(
          process.env.REACT_APP_WORDPRESS_API_URL || "https://admin.astaemas.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        const json = await response.json();

        if (json.errors) {
          throw new Error(json.errors[0].message || "GraphQL Error");
        }

        const nodes = json.data?.enterpriseMedias?.nodes || [];

        if (nodes.length === 0) {
          setArticles([]);
          return;
        }

        // Map and filter articles targeting Asta Enterprise
        const mapped = nodes
          .filter((post) =>
            post.enterprisePlatforms?.nodes?.some(
              (platform) => platform.slug === "asta-enterprise"
            )
          )
          .map((post) => {
            const plainContent = post.content ? post.content.replace(/<[^>]+>/g, "").trim() : "";
            const computedExcerpt = plainContent.slice(0, 150) + (plainContent.length > 150 ? "..." : "");
            return {
              id: post.id,
              slug: post.slug,
              category: post.mediaCategories?.nodes?.[0]?.name || "Gold Business Insight",
              readTime: post.enterpriseMediaSettings?.readTime || "5 min",
              date: new Date(post.date).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
                year: "numeric",
                month: "short",
              }),
              image: post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?auto=format&fit=crop&w=1400&q=80",
              title: {
                id: post.title,
                en: post.enterpriseMediaSettings?.englishTitle || post.title,
              },
              excerpt: {
                id: computedExcerpt,
                en: post.enterpriseMediaSettings?.englishExcerpt || computedExcerpt,
              },
            };
          });

        setArticles(mapped);
      } catch (err) {
        console.error("Failed to fetch articles from WordPress:", err);
        setError(err.message || "Failed to fetch articles");
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [lang]);

  // Reset pagination on category change
  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  // Filtered list
  const filtered = useMemo(() => {
    if (active === "all") return articles;
    return articles.filter((a) => a.category === active);
  }, [active, articles]);

  // Paginated slice
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const featured = articles[0];

  return (
    <div data-testid="media-page">
      <SEO
        title={lang === "id" ? "Media & Edukasi Emas - AstaEnterprise" : "Media & Gold Education - AstaEnterprise"}
        description={lang === "id" ? "Wawasan industri ritel emas, update harga, taksiran, teknologi, dan tips bisnis dari tim ahli AstaEnterprise." : "Insights into the gold retail industry, price updates, appraisals, technology, and business tips from AstaEnterprise."}
        canonical="https://berkahemas.web.id/media"
        keywords="berita emas, edukasi emas, harga emas hari ini, tips bisnis emas, berita asta enterprise, gold news, gold education, gold price today"
      />
      <section className="border-b border-border" data-testid="media-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <SectionHeader
            eyebrow={t.mediaPage.eyebrow}
            title={t.mediaPage.title}
            sub={t.mediaPage.sub}
            className="max-w-4xl"
          />
        </div>
      </section>

      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-muted-foreground gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm">{lang === "id" ? "Memuat berita terbaru..." : "Loading latest media..."}</p>
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <section className="border-b border-border" data-testid="media-featured">
              <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
                <Link to={`/media/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={featured.image}
                        alt={featured.title[lang]}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#5A0F1B] dark:text-[#CBB37E]">
                      {lang === "id" ? "Pilihan Editor" : "Editor's Pick"} · {featured.category}
                    </span>
                    <h2 className="mt-5 font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
                      {featured.title[lang]}
                    </h2>
                    <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                      {featured.excerpt[lang]}
                    </p>
                    <p className="mt-6 text-xs text-muted-foreground">
                      {featured.date} · {featured.readTime} {lang === "id" ? "baca" : "read"}
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Filter + grid */}
          <section id="articles" className="border-b border-border" data-testid="media-articles">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
              <div className="flex flex-wrap items-center gap-2 mb-12" data-testid="media-filter">
                <button
                  onClick={() => setActive("all")}
                  data-testid="media-filter-all"
                  className={`h-9 px-4 rounded-full text-xs tracking-wide border transition-colors ${
                    active === "all"
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground border-border hover:border-foreground"
                  }`}
                >
                  {t.mediaPage.filterAll}
                </button>
                {mediaCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    data-testid={`media-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`h-9 px-4 rounded-full text-xs tracking-wide border transition-colors ${
                      active === c
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {paginated.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground text-sm">
                    {lang === "id" ? "Tidak ada artikel di kategori ini." : "No articles found in this category."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
                  {paginated.map((a, i) => (
                    <Link
                      to={`/media/${a.slug}`}
                      key={a.id}
                      data-testid={`media-article-${a.id}`}
                      className="group flex flex-col"
                    >
                      <motion.article
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                        className="flex flex-col h-full"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-muted">
                          <img
                            src={a.image}
                            alt={a.title[lang]}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="mt-6 flex-1">
                          <span className="text-[10px] uppercase tracking-[0.22em] text-[#5A0F1B] dark:text-[#CBB37E]">
                            {a.category}
                          </span>
                          <h3 className="mt-3 font-serif text-2xl tracking-tight leading-snug">
                            {a.title[lang]}
                          </h3>
                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {a.excerpt[lang]}
                          </p>
                          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {a.date} · {a.readTime}
                            </span>
                            <ArrowUpRight className="h-4 w-4 group-hover:text-foreground transition-colors" />
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16" data-testid="media-pagination">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-9 px-3 rounded-md border border-border hover:bg-muted"
                  >
                    {lang === "id" ? "Sebelumnya" : "Previous"}
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, idx) => {
                    const pageNum = idx + 1;
                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-9 w-9 rounded-md text-xs font-semibold border transition-all ${
                          isCurrent
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-foreground border-border hover:border-foreground"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3 rounded-md border border-border hover:bg-muted"
                  >
                    {lang === "id" ? "Berikutnya" : "Next"}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Newsletter */}
      <section className="bg-[hsl(var(--surface))]" data-testid="media-newsletter">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {lang === "id" ? "Newsletter" : "Newsletter"}
            </span>
            <h2 className="mt-5 font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05]">
              {t.mediaPage.newsletterTitle}
            </h2>
            <p className="mt-5 max-w-lg text-base text-muted-foreground">
              {t.mediaPage.newsletterSub}
            </p>
          </div>
          <div>
            <NewsletterForm source="media" />
          </div>
        </div>
      </section>
    </div>
  );
}
