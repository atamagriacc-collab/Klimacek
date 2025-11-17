import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import { Calendar, User, Clock, Search, Tag, TrendingUp, Edit, Plus, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { db } from '../lib/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import { Article, sampleArticles } from '../lib/articles-data';
import { getSubscriptionInfo, formatPlanName, getPlanBadgeColor, SubscriptionInfo } from '../lib/subscription-utils';


export default function ArticlesPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);

  const categories = ['All', 'Teknologi', 'Panduan', 'Lingkungan'];

  // Fetch subscription info when user changes
  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        console.log('[Articles] Fetching subscription for user:', user.email);
        const info = await getSubscriptionInfo(user);
        console.log('[Articles] Subscription info received:', info);
        setSubscriptionInfo(info);
      } else {
        console.log('[Articles] No user, clearing subscription info');
        setSubscriptionInfo(null);
      }
    };
    fetchSubscription();
  }, [user]);

  useEffect(() => {
    // Load articles from Firebase
    if (db) {
      const articlesRef = ref(db, 'articles');
      onValue(articlesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedArticles: Article[] = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setArticles([...sampleArticles, ...loadedArticles]);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <>
      <Head>
        <title>Artikel & Blog - Klimacek</title>
        <meta name="description" content="Baca artikel terbaru tentang teknologi pertanian, IoT, dan inovasi agrikultur dari Klimacek" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-klimacek-brown-900/95 border-b border-accent-yellow/30 shadow-lg flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 transition-all duration-300">
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-yellow/20 rounded-full blur-md group-hover:bg-accent-yellow/40 transition-all"></div>
                <img src="/logo klimacek trans fix.png" alt="Klimacek Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full relative z-10 ring-2 ring-accent-yellow/50 group-hover:ring-accent-yellow transition-all transform group-hover:scale-105" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-accent-yellow">Klimacek</span>
            </Link>

            {/* Nav Links - Hidden on mobile */}
            <div className="hidden md:flex space-x-2 lg:space-x-3">
              <Link href="/weather-stations" className="px-4 py-2 text-white/80 hover:text-accent-yellow hover:bg-white/10 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium">
                Stasiun Cuaca
              </Link>
              <Link href="/products" className="px-4 py-2 text-white/80 hover:text-accent-yellow hover:bg-white/10 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium">
                Produk & Layanan
              </Link>
              <Link href="/articles" className="px-4 py-2 bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30 rounded-lg transition-all duration-200 text-sm lg:text-base font-semibold">
                Artikel
              </Link>
              <Link href="/about" className="px-4 py-2 text-white/80 hover:text-accent-yellow hover:bg-white/10 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium">
                Tentang Kami
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden sm:flex flex-col gap-1 px-3 py-2 bg-white/10 rounded-lg text-white/90 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-accent-yellow" />
                    <span className="font-medium">{user.email?.split('@')[0]}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`${subscriptionInfo ? getPlanBadgeColor(subscriptionInfo.plan, subscriptionInfo.is_expired) : 'bg-gray-500'} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                      {subscriptionInfo ? (
                        <>
                          {formatPlanName(subscriptionInfo.plan)}
                          {subscriptionInfo.is_expired && ' (Expired)'}
                        </>
                      ) : (
                        'Loading...'
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-sm font-medium border border-white/20"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-2 px-4 py-2 bg-accent-yellow hover:bg-yellow-400 text-klimacek-brown-900 rounded-lg transition-all duration-200 text-sm font-bold shadow-lg hover:shadow-xl"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Daftar</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-klimacek-brown-900 text-white py-20 lg:py-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-yellow rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white">
                Artikel & Insights
              </h1>

              <p className="text-xl md:text-2xl text-klimacek-brown-100 mb-10 leading-relaxed">
                Jelajahi artikel terbaru tentang teknologi pertanian, IoT, dan inovasi agrikultur untuk masa depan yang lebih berkelanjutan
              </p>

              {/* Search Bar */}
              <div className="relative max-w-3xl mx-auto">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-accent-yellow w-6 h-6" />
                <input
                  type="text"
                  placeholder="Cari artikel berdasarkan judul atau topik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-accent-yellow/30 text-klimacek-brown-900 placeholder-klimacek-brown-400 focus:outline-none focus:ring-4 focus:ring-accent-yellow/50 focus:border-accent-yellow transition-all text-lg shadow-2xl"
                />
              </div>

              {/* Write Article Button */}
              {user && (
                <div className="mt-8">
                  <Link
                    href="/articles/new"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent-yellow hover:bg-yellow-400 text-klimacek-brown-900 font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Tulis Artikel Baru
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white border-b-2 border-accent-yellow/20 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-klimacek-brown-800 flex items-center justify-center gap-2">
                <Tag className="w-5 h-5 text-accent-yellow" />
                Filter Kategori
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl ${
                    selectedCategory === category
                      ? 'bg-klimacek-brown-900 text-white ring-4 ring-accent-yellow/50'
                      : 'bg-white text-klimacek-brown-700 hover:bg-accent-yellow/10 border-2 border-klimacek-brown-200 hover:border-accent-yellow'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-klimacek-brown-600">Memuat artikel...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-klimacek-brown-600">Tidak ada artikel ditemukan.</p>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && (
                  <div className="mb-16">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-klimacek-brown-900 flex items-center justify-center gap-3">
                        <TrendingUp className="w-8 h-8 text-accent-yellow" />
                        Artikel Pilihan
                      </h2>
                    </div>
                    <Link href={`/articles/${featuredArticle.slug}`}>
                      <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border-2 border-accent-yellow/20 hover:border-accent-yellow transform hover:-translate-y-2">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-80 md:h-full overflow-hidden">
                            <img
                              src={featuredArticle.image}
                              alt={featuredArticle.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-klimacek-brown-900/80 group-hover:bg-klimacek-brown-900/60 transition-all duration-500 z-10"></div>
                            <div className="absolute top-6 left-6 z-20">
                              <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent-yellow text-klimacek-brown-900 text-sm font-black rounded-full shadow-lg animate-pulse">
                                <TrendingUp className="w-4 h-4" />
                                ARTIKEL UNGGULAN
                              </span>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 z-20">
                              <div className="flex flex-wrap gap-2">
                                {featuredArticle.tags?.slice(0, 3).map((tag, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="p-10 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-5">
                              <span className="px-4 py-2 bg-klimacek-brown-900 text-white text-sm font-bold rounded-lg shadow-md">
                                {featuredArticle.category}
                              </span>
                              <span className="flex items-center gap-2 text-base text-klimacek-brown-600 font-semibold">
                                <Clock className="w-5 h-5 text-accent-yellow" />
                                {featuredArticle.readTime} menit baca
                              </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-klimacek-brown-900 mb-5 group-hover:text-accent-yellow transition-colors leading-tight">
                              {featuredArticle.title}
                            </h2>
                            <p className="text-klimacek-brown-600 text-lg mb-6 leading-relaxed line-clamp-4">
                              {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t-2 border-klimacek-brown-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent-yellow flex items-center justify-center">
                                  <User className="w-5 h-5 text-klimacek-brown-900" />
                                </div>
                                <div>
                                  <p className="font-bold text-klimacek-brown-900">{featuredArticle.author?.split(' ')[0] || 'Admin'}</p>
                                  <p className="text-sm text-klimacek-brown-500">{new Date(featuredArticle.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                              </div>
                              <div className="px-6 py-3 bg-accent-yellow text-klimacek-brown-900 font-bold rounded-xl group-hover:bg-yellow-400 transition-all">
                                Baca →
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Article Grid */}
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-klimacek-brown-900">Artikel Lainnya</h2>
                    <p className="text-klimacek-brown-600 mt-2">Jelajahi koleksi artikel pilihan kami</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map((article) => (
                      <Link key={article.id} href={`/articles/${article.slug}`}>
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col border-2 border-transparent hover:border-accent-yellow transform hover:-translate-y-2">
                          <div className="relative h-56 overflow-hidden bg-klimacek-brown-900">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-klimacek-brown-900/70 group-hover:bg-klimacek-brown-900/50 transition-all duration-500"></div>
                            <div className="absolute top-4 right-4 z-10">
                              <div className="px-3 py-1 bg-accent-yellow text-klimacek-brown-900 text-xs font-black rounded-full shadow-lg">
                                #{article.category}
                              </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 z-10">
                              <div className="flex flex-wrap gap-1">
                                {article.tags?.slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="p-7 flex-1 flex flex-col bg-white">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="flex items-center gap-2 text-sm text-klimacek-brown-600 font-semibold">
                                <Clock className="w-4 h-4 text-accent-yellow" />
                                {article.readTime} menit
                              </span>
                              <span className="text-klimacek-brown-400">•</span>
                              <span className="flex items-center gap-1 text-sm text-klimacek-brown-600">
                                <Calendar className="w-4 h-4 text-accent-yellow" />
                                {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-klimacek-brown-900 mb-4 group-hover:text-accent-yellow transition-colors line-clamp-2 leading-tight">
                              {article.title}
                            </h3>
                            <p className="text-klimacek-brown-600 text-base mb-6 line-clamp-4 flex-1 leading-relaxed">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t-2 border-klimacek-brown-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-klimacek-brown-900 flex items-center justify-center">
                                  <User className="w-4 h-4 text-accent-yellow" />
                                </div>
                                <span className="text-sm font-bold text-klimacek-brown-900 truncate">{article.author?.split(' ')[0]}</span>
                              </div>
                              <div className="px-4 py-2 bg-accent-yellow/10 text-accent-yellow font-bold rounded-lg group-hover:bg-accent-yellow group-hover:text-klimacek-brown-900 transition-all text-sm">
                                Baca
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
