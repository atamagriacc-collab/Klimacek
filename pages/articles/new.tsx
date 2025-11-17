import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../lib/auth-context';
import { ArrowLeft, Save, Eye, Tag, Upload } from 'lucide-react';
import { db } from '../../lib/firebase';
import { ref, push, set } from 'firebase/database';

export default function NewArticlePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Teknologi');
  const [tags, setTags] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Teknologi', 'Panduan', 'Lingkungan', 'Berita', 'Tutorial'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !excerpt || !content) {
      setError('Semua field wajib diisi');
      return;
    }

    setIsSaving(true);

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      const readTime = Math.ceil(content.split(' ').length / 200); // Estimate reading time

      const articleData = {
        title,
        slug,
        excerpt,
        content,
        author: user?.displayName || user?.email || 'Anonymous',
        authorEmail: user?.email || '',
        category,
        tags: tagsArray,
        image: '/images/default-article.jpg',
        publishedAt: new Date().toISOString(),
        readTime,
        views: 0,
        createdBy: user?.uid
      };

      if (db) {
        const articlesRef = ref(db, 'articles');
        const newArticleRef = push(articlesRef);
        await set(newArticleRef, articleData);

        router.push(`/articles/${slug}`);
      } else {
        setError('Database tidak tersedia');
      }
    } catch (err: any) {
      console.error('Error saving article:', err);
      setError(err.message || 'Gagal menyimpan artikel');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Tulis Artikel Baru - Klimacek</title>
        <meta name="description" content="Tulis dan publikasikan artikel Anda tentang pertanian dan teknologi" />
      </Head>

      <div className="min-h-screen bg-klimacek-cream-50">
        <Header />

        {/* Header Bar */}
        <div className="bg-white border-b border-klimacek-brown-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-klimacek-brown-600 hover:text-klimacek-brown-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Link>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPreview(!isPreview)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-klimacek-brown-300 text-klimacek-brown-700 rounded-lg hover:bg-klimacek-brown-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {isPreview ? 'Edit' : 'Preview'}
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-accent-yellow text-klimacek-brown-900 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 font-bold"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Menyimpan...' : 'Publikasikan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {isPreview ? (
            /* Preview Mode */
            <div className="bg-white rounded-xl shadow-lg p-8">
              <article className="max-w-4xl mx-auto">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-klimacek-brown-800 text-white text-sm font-semibold rounded-full">
                    {category}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-klimacek-brown-900 mb-4">{title || 'Judul Artikel'}</h1>
                <p className="text-xl text-klimacek-brown-600 mb-6">{excerpt || 'Ringkasan artikel...'}</p>
                <div className="mb-6 pb-6 border-b border-klimacek-brown-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-klimacek-brown-800 flex items-center justify-center text-white font-bold">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-klimacek-brown-900">
                        {user?.displayName || user?.email || 'User'}
                      </p>
                      <p className="text-sm text-klimacek-brown-500">
                        {new Date().toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-klimacek-brown-900
                    prose-p:text-klimacek-brown-700
                    prose-a:text-accent-yellow
                    prose-strong:text-klimacek-brown-900"
                  dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
                />
                {tags && (
                  <div className="mt-8 pt-6 border-t border-klimacek-brown-200">
                    <div className="flex flex-wrap gap-2">
                      {tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-klimacek-brown-100 text-klimacek-brown-700 text-sm rounded-full"
                        >
                          <Tag className="w-3 h-3" />
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                {/* Title */}
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-semibold text-klimacek-brown-900 mb-2">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul artikel yang menarik..."
                    className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0 text-klimacek-brown-900 placeholder-klimacek-brown-300"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="mb-6">
                  <label htmlFor="excerpt" className="block text-sm font-semibold text-klimacek-brown-900 mb-2">
                    Ringkasan Artikel *
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Tulis ringkasan singkat artikel Anda (2-3 kalimat)..."
                    rows={3}
                    className="w-full px-4 py-3 border border-klimacek-brown-300 rounded-lg focus:ring-2 focus:ring-klimacek-brown-800 focus:border-transparent text-klimacek-brown-700 placeholder-klimacek-brown-400"
                    required
                  />
                  <p className="mt-1 text-sm text-klimacek-brown-500">{excerpt.length}/200 karakter</p>
                </div>

                {/* Category & Tags Row */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-klimacek-brown-900 mb-2">
                      Kategori *
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-klimacek-brown-300 rounded-lg focus:ring-2 focus:ring-klimacek-brown-800 focus:border-transparent text-klimacek-brown-700"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-semibold text-klimacek-brown-900 mb-2">
                      Tags (pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="IoT, Smart Farming, Teknologi"
                      className="w-full px-4 py-3 border border-klimacek-brown-300 rounded-lg focus:ring-2 focus:ring-klimacek-brown-800 focus:border-transparent text-klimacek-brown-700 placeholder-klimacek-brown-400"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-semibold text-klimacek-brown-900 mb-2">
                    Konten Artikel *
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Mulai menulis artikel Anda di sini... Gunakan HTML untuk formatting."
                    rows={20}
                    className="w-full px-4 py-3 border border-klimacek-brown-300 rounded-lg focus:ring-2 focus:ring-klimacek-brown-800 focus:border-transparent text-klimacek-brown-700 placeholder-klimacek-brown-400 font-mono text-sm"
                    required
                  />
                  <p className="mt-2 text-sm text-klimacek-brown-500">
                    Tips: Gunakan HTML tags seperti &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt; untuk formatting
                  </p>
                </div>
              </div>

              {/* Helpful Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips Menulis Artikel yang Baik</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Gunakan judul yang menarik dan deskriptif</li>
                  <li>• Tulis ringkasan yang jelas dan informatif</li>
                  <li>• Struktur konten dengan heading dan paragraf yang rapi</li>
                  <li>• Sertakan contoh atau studi kasus yang relevan</li>
                  <li>• Gunakan tags yang spesifik untuk memudahkan pencarian</li>
                </ul>
              </div>
            </form>
          )}
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
