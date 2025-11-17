import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useAuth } from '../lib/auth-context';
import { track } from '@vercel/analytics';
import {
  Download,
  Leaf,
  LogIn,
  LogOut,
  User
} from 'lucide-react';

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <>
      <Head>
        <title>Klimacek - Part of Future Indonesia</title>
        <meta name="description" content="Klimacek menghadirkan solusi inovatif untuk mendatadapi tantangan perubahan iklim dalam sektor pertanian dan perikanan" />
      </Head>

      <div className="min-h-screen relative bg-cover bg-center" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 transition-all duration-300">
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo klimacek trans fix.png" alt="Klimacek Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
              <span className="text-xl sm:text-2xl font-bold text-white">Klimacek</span>
            </Link>

            {/* Nav Links - Hidden on mobile */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/weather-stations" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Stasiun Cuaca
              </Link>
              <Link href="/products" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Produk & Layanan
              </Link>
              <Link href="/articles" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Artikel
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Tentang Kami
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center space-x-2 text-white/90 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Daftar</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 flex items-center min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                <span className="block">Part of Future</span>
                <span className="block">Indonesia</span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto lg:mx-0">
                Klimacek menghadirkan solusi inovatif untuk menghadapi tantangan perubahan iklim dalam sektor pertanian dan perikanan. Dengan teknologi stasiun cuaca real-time dan rekomendasi AI, kami membantu petani dan nelayan membuat keputusan yang tepat untuk meningkatkan hasil panen hingga 70%.
              </p>

              <div className="mt-6 sm:mt-8">
                <p className="text-white/70 text-sm">Since 2025</p>
              </div>
            </div>

            {/* Right Content - Mobile App Card */}
            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full mx-4 sm:mx-0">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {/* Klimacek Mobile App mockup */}
                  <img
                    src="/images/iPhone 16 Pro.png"
                    alt="Klimacek Mobile App"
                    className="w-full h-auto max-w-xs sm:max-w-sm"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Klimacek Mobile</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm leading-relaxed">
                  Mengakses aplikasi yang digunakan untuk memonitoring hasil dari stasiun cuaca Climagrid berupa kemitaban, sejarah kemitaban, intensitas cahaya, curah hujan, kecepatan angin, arus panel surya, tegangan panel surya, dan watt panel surya untuk menghitung potensi sinar matahari.
                </p>

                <a
                  href="/downloads/klimacek-v1.0.1.apk"
                  download="KlimacekApp-v1.0.1.apk"
                  onClick={() => {
                    // Track download with Vercel Analytics
                    track('APK Download', {
                      version: '1.0.1',
                      platform: 'Android',
                      size: '11.8 MB'
                    });

                    // Track download with Google Analytics (if available)
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'download', {
                        event_category: 'APK',
                        event_label: 'KlimacekApp v1.0.1'
                      });
                    }
                  }}
                  className="w-full bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Download className="w-5 h-5" />
                  <span>Download APK</span>
                  <span className="text-xs opacity-75">(11.8 MB)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}