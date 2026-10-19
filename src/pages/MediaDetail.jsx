import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Loader2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

export default function MediaDetailPage() {
  const { slug } = useParams();
  const { lang } = useApp();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const query = `
          query GetEnterpriseMediaBySlug($slug: ID!) {
            enterpriseMedia(id: $slug, idType: SLUG) {
              id
              title
              slug
              content
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              enterpriseMediaSettings {
                readTime
                englishTitle
                englishExcerpt
                englishContent
              }
              mediaCategories {
                nodes {
                  name
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
            body: JSON.stringify({
              query,
              variables: { slug },
            }),
          }
        );

        const json = await response.json();

        if (json.errors || !json.data?.enterpriseMedia) {
          setError(lang === "id" ? "Artikel Tidak Ditemukan" : "Article Not Found");
          return;
        }

        const post = json.data.enterpriseMedia;
        const plainContent = post.content ? post.content.replace(/<[^>]+>/g, "").trim() : "";
        const computedExcerpt = plainContent.slice(0, 150) + (plainContent.length > 150 ? "..." : "");

        const mapped = {
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
          content: {
            id: post.content || "",
            en: post.enterpriseMediaSettings?.englishContent || post.content || "",
          },
        };

        setArticle(mapped);
      } catch (err) {
        console.error("WP fetch error:", err);
        setError(lang === "id" ? "Gagal memuat artikel" : "Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug, lang]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm">{lang === "id" ? "Memuat isi artikel..." : "Loading article content..."}</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">
          {error || (lang === "id" ? "Artikel Tidak Ditemukan" : "Article Not Found")}
        </h2>
        <p className="mt-4 text-muted-foreground text-center max-w-md">
          {lang === "id" 
            ? "Maaf, artikel yang Anda cari tidak ada atau telah dihapus." 
            : "Sorry, the article you are looking for does not exist or has been removed."}
        </p>
        <Link to="/media" className="mt-8">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {lang === "id" ? "Kembali ke Media" : "Back to Media"}
          </Button>
        </Link>
      </div>
    );
  }

  const bodyContent = typeof article.content === "string" ? article.content : article.content[lang];

  return (
    <article className="min-h-screen pb-24" data-testid={`media-detail-${article.id}`}>
      <SEO
        title={`${article.title[lang]} - AstaEnterprise`}
        description={article.excerpt[lang]}
        image={article.image}
        canonical={`https://berkahemas.web.id/media/${article.slug}`}
        type="article"
      />
      {/* Navigation & Header */}
      <div className="max-w-3xl mx-auto px-6 pt-12 md:pt-16">
        <Link to="/media" className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors gap-2 mb-8">
          <ArrowLeft className="h-4 w-4" />
          {lang === "id" ? "Kembali ke Media" : "Back to Media"}
        </Link>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5A0F1B] dark:text-[#CBB37E]">
            {article.category}
          </span>
          <h1 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight font-medium">
            {article.title[lang]}
          </h1>
          
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-muted-foreground border-b border-border pb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime} {lang === "id" ? "baca" : "read"}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-3xl mx-auto px-6 mt-8">
        <div className="relative aspect-[21/9] rounded-lg overflow-hidden border border-border bg-muted">
          <img
            src={article.image}
            alt={article.title[lang]}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-3xl mx-auto px-6 mt-12">
        <div 
          className="prose dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-blockquote:border-[#5A0F1B] dark:prose-blockquote:border-[#CBB37E] prose-blockquote:bg-[hsl(var(--surface))] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-md text-base md:text-lg text-foreground/90 leading-relaxed space-y-6 wp-content-rendered"
          dangerouslySetInnerHTML={{ __html: bodyContent }}
        />
      </div>
    </article>
  );
}
