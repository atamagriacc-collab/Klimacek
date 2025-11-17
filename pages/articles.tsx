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
            <div className="hidden md:flex space-x-1 lg:space-x-2 xl:space-x-3">
              <Link href="/weather-stations" className="px-2 lg:px-3 xl:px-4 py-2 text-white/80 hover:text-accent-yellow hover:bg-white/10 rounded-lg transition-all duration-200 text-xs lg:text-sm xl:text-base font-medium whitespace-nowrap">
                Stasiun Cuaca
              </Link>
              <Link href="/products" className="px-2 lg:px-3 xl:px-4 py-2 text-white/80 hover:text-accent-yellow hover:bg-white/10 rounded-lg transition-all duration-200 text-xs lg:text-sm xl:text-base font-medium whitespace-nowrap">
                Produk & Layanan
              </Link>
              <Link href="/articles" className="px-2 lg:px-3 xl:px-4 py-2 bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30 rounded-lg transition-all duration-200 text-xs lg:text-sm xl:text-base font-semibold">
                Artikel
              </Link>
              <Link href="/about" className="px-2 lg:px-3 xl:px-4 py-2 text-white/80 hover:text-accent-yellow hover:bg-white/10 rounded-lg transition-all duration-200 text-xs lg:text-sm xl:text-base font-medium whitespace-nowrap">
                Tentang Kami
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <>
                <div className="hidden sm:flex flex-col gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white/90 text-xs sm:text-sm">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-yellow" />
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
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium border border-white/20"
                >
                  <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-accent-yellow hover:bg-yellow-400 text-klimacek-brown-900 rounded-lg transition-all duration-200 text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl"
                >
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Daftar</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-klimacek-brown-900 text-white py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-yellow rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight text-white">
                Artikel & Insights
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-klimacek-brown-100 mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2">
                Jelajahi artikel terbaru tentang teknologi pertanian, IoT, dan inovasi agrikultur untuk masa depan yang lebih berkelanjutan
              </p>

              {/* Search Bar */}
              <div className="relative max-w-3xl mx-auto">
                <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-accent-yellow w-5 h-5 sm:w-6 sm:h-6" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-accent-yellow/30 text-klimacek-brown-900 placeholder-klimacek-brown-400 focus:outline-none focus:ring-4 focus:ring-accent-yellow/50 focus:border-accent-yellow transition-all text-sm sm:text-base md:text-lg shadow-2xl"
                />
              </div>

              {/* Write Article Button */}
              {user && (
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/articles/new"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-accent-yellow hover:bg-yellow-400 text-klimacek-brown-900 font-bold rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base md:text-lg"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap">Tulis Artikel Baru</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white border-b-2 border-accent-yellow/20 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-klimacek-brown-800 flex items-center justify-center gap-2">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-accent-yellow" />
                Filter Kategori
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl ${
                    selectedCategory === category
                      ? 'bg-klimacek-brown-900 text-white ring-2 sm:ring-4 ring-accent-yellow/50'
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
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-8 sm:py-12 md:py-16">
                <p className="text-sm sm:text-base text-klimacek-brown-600">Memuat artikel...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-8 sm:py-12 md:py-16">
                <p className="text-sm sm:text-base text-klimacek-brown-600">Tidak ada artikel ditemukan.</p>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && (
                  <div className="mb-8 sm:mb-12 lg:mb-16">
                    <div className="text-center mb-4 sm:mb-6 md:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-klimacek-brown-900 flex items-center justify-center gap-2 sm:gap-3 px-4">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent-yellow" />
                        Artikel Pilihan
                      </h2>
                    </div>
                    <Link href={`/articles/${featuredArticle.slug}`}>
                      <div className="group bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border-2 border-accent-yellow/20 hover:border-accent-yellow transform hover:-translate-y-1 sm:hover:-translate-y-2">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-64 sm:h-80 md:h-full overflow-hidden">
                            <img
                              src={featuredArticle.image}
                              alt={featuredArticle.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-klimacek-brown-900/80 group-hover:bg-klimacek-brown-900/60 transition-all duration-500 z-10"></div>
                            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20">
                              <span className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-accent-yellow text-klimacek-brown-900 text-xs sm:text-sm font-black rounded-full shadow-lg animate-pulse">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline">ARTIKEL UNGGULAN</span>
                                <span className="xs:hidden">UNGGULAN</span>
                              </span>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-20">
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {featuredArticle.tags?.slice(0, 3).map((tag, idx) => (
                                  <span key={idx} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-klimacek-brown-900 text-white text-xs sm:text-sm font-bold rounded-lg shadow-md">
                                {featuredArticle.category}
                              </span>
                              <span className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-klimacek-brown-600 font-semibold">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent-yellow" />
                                <span className="hidden xs:inline">{featuredArticle.readTime} menit baca</span>
                                <span className="xs:hidden">{featuredArticle.readTime} min</span>
                              </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-klimacek-brown-900 mb-3 sm:mb-4 md:mb-5 group-hover:text-accent-yellow transition-colors leading-tight">
                              {featuredArticle.title}
                            </h2>
                            <p className="text-klimacek-brown-600 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-4">
                              {featuredArticle.excerpt}
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t-2 border-klimacek-brown-100">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent-yellow flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-klimacek-brown-900" />
                                </div>
                                <div>
                                  <p className="font-bold text-sm sm:text-base text-klimacek-brown-900">{featuredArticle.author?.split(' ')[0] || 'Admin'}</p>
                                  <p className="text-xs sm:text-sm text-klimacek-brown-500">{new Date(featuredArticle.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                              </div>
                              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-accent-yellow text-klimacek-brown-900 font-bold rounded-xl group-hover:bg-yellow-400 transition-all text-sm sm:text-base whitespace-nowrap">
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
                  <div className="text-center mb-6 sm:mb-8 md:mb-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-klimacek-brown-900">Artikel Lainnya</h2>
                    <p className="text-sm sm:text-base text-klimacek-brown-600 mt-1 sm:mt-2 px-4">Jelajahi koleksi artikel pilihan kami</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {otherArticles.map((article) => (
                      <Link key={article.id} href={`/articles/${article.slug}`}>
                        <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col border-2 border-transparent hover:border-accent-yellow transform hover:-translate-y-1 sm:hover:-translate-y-2">
                          <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-klimacek-brown-900">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-klimacek-brown-900/70 group-hover:bg-klimacek-brown-900/50 transition-all duration-500"></div>
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                              <div className="px-2.5 sm:px-3 py-1 bg-accent-yellow text-klimacek-brown-900 text-xs font-black rounded-full shadow-lg">
                                #{article.category}
                              </div>
                            </div>
                            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10">
                              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                {article.tags?.slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="px-2 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 sm:p-5 md:p-6 lg:p-7 flex-1 flex flex-col bg-white">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                              <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-klimacek-brown-600 font-semibold">
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-yellow" />
                                <span className="hidden xs:inline">{article.readTime} menit</span>
                                <span className="xs:hidden">{article.readTime} min</span>
                              </span>
                              <span className="text-klimacek-brown-400 hidden xs:inline">•</span>
                              <span className="flex items-center gap-1 text-xs sm:text-sm text-klimacek-brown-600">
                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-yellow" />
                                {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-klimacek-brown-900 mb-3 sm:mb-4 group-hover:text-accent-yellow transition-colors line-clamp-2 leading-tight">
                              {article.title}
                            </h3>
                            <p className="text-klimacek-brown-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4 flex-1 leading-relaxed">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t-2 border-klimacek-brown-100">
                              <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-klimacek-brown-900 flex items-center justify-center flex-shrink-0">
                                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-yellow" />
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-klimacek-brown-900 truncate">{article.author?.split(' ')[0]}</span>
                              </div>
                              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent-yellow/10 text-accent-yellow font-bold rounded-lg group-hover:bg-accent-yellow group-hover:text-klimacek-brown-900 transition-all text-xs sm:text-sm whitespace-nowrap">
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
