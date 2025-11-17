import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Calendar, User, Clock, ArrowLeft, Tag, Share2, Bookmark, Eye } from 'lucide-react';
import { db } from '../../lib/firebase';
import { ref, onValue, update } from 'firebase/database';
import { Article, sampleArticles } from '../../lib/articles-data';
import { marked } from 'marked';


export default function ArticleDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!slug) return;

    // Check sample articles first
    const foundArticle = sampleArticles.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
      setLoading(false);

      // Increment views
      if (db) {
        const articleRef = ref(db, `articles/${slug}/views`);
        const currentViews = foundArticle.views || 0;
        update(ref(db, `articles/${slug}`), {
          views: currentViews + 1
        });
      }
      return;
    }

    // Load from Firebase
    if (db) {
      const articleRef = ref(db, `articles/${slug}`);
      onValue(articleRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setArticle({ id: slug as string, ...data });
          // Increment views
          update(articleRef, {
            views: (data.views || 0) + 1
          });
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [slug]);

  // Parse markdown content to HTML
  const parsedContent = useMemo(() => {
    if (!article?.content) return '';
    // Check if content is already HTML (starts with < tag)
    if (article.content.trim().startsWith('<')) {
      return article.content;
    }
    // Parse markdown to HTML
    return marked.parse(article.content, {
      breaks: true,
      gfm: true
    }) as string;
  }, [article?.content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-klimacek-cream-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-klimacek-brown-600">Memuat artikel...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-klimacek-cream-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-klimacek-brown-900 mb-4">Artikel Tidak Ditemukan</h1>
          <Link href="/articles" className="text-accent-yellow hover:underline">
            Kembali ke Artikel
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} - Klimacek</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <div className="min-h-screen bg-klimacek-cream-50">
        <Header />

        {/* Back Button */}
        <div className="bg-white border-b border-klimacek-brown-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-klimacek-brown-600 hover:text-klimacek-brown-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Artikel
            </Link>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-klimacek-brown-800 text-black text-sm font-semibold rounded-full">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-klimacek-brown-500">
                  <Clock className="w-4 h-4" />
                  {article.readTime} menit baca
                </span>
                <span className="flex items-center gap-1 text-sm text-klimacek-brown-500">
                  <Eye className="w-4 h-4" />
                  {article.views} views
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-klimacek-brown-900 mb-6">
                {article.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-klimacek-brown-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-klimacek-brown-800 flex items-center justify-center text-black font-bold">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-klimacek-brown-900">{article.author}</p>
                      <p className="text-sm text-klimacek-brown-500">
                        {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-klimacek-brown-100 rounded-lg transition-colors" title="Share">
                    <Share2 className="w-5 h-5 text-klimacek-brown-600" />
                  </button>
                  <button className="p-2 hover:bg-klimacek-brown-100 rounded-lg transition-colors" title="Bookmark">
                    <Bookmark className="w-5 h-5 text-klimacek-brown-600" />
                  </button>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-klimacek-brown-900
                prose-p:text-klimacek-brown-700
                prose-a:text-accent-yellow
                prose-strong:text-klimacek-brown-900
                prose-li:text-klimacek-brown-700"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-klimacek-brown-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-klimacek-brown-100 text-klimacek-brown-700 text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-white rounded-xl border border-klimacek-brown-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-klimacek-brown-800 flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-klimacek-brown-900 mb-2">
                    {article.author}
                  </h3>
                  <p className="text-klimacek-brown-600">
                    Penulis dan ahli di bidang pertanian modern, IoT, dan teknologi agrikultur.
                    Berpengalaman dalam mengimplementasikan solusi smart farming di berbagai wilayah Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}
