import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Download,
  Leaf
} from 'lucide-react';

export default function Home() {
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
        <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-xl sm:text-2xl font-bold">Klimacek</span>
            </Link>

            {/* Nav Links - Hidden on mobile */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/weather-stations" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Stasiun Cuaca
              </Link>
              <Link href="/products" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Produk Kami
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Tentang Kami
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/login" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
              Login
            </Link>
            <Link href="/signup" className="px-3 py-1.5 sm:px-6 sm:py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm lg:text-base">
              Sign Up
            </Link>
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

                <button className="w-full bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Icons */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 mb-6 sm:mb-8">
            <Link href="/about" className="text-white/70 hover:text-white transition-colors text-sm">
              About
            </Link>
            <Link href="/features" className="text-white/70 hover:text-white transition-colors text-sm">
              Features
            </Link>
            <Link href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">
              Pricing
            </Link>
            <Link href="/gallery" className="text-white/70 hover:text-white transition-colors text-sm">
              Gallery
            </Link>
            <Link href="/team" className="text-white/70 hover:text-white transition-colors text-sm">
              Team
            </Link>
          </div>

          {/* Contact Button */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Link href="/contact" className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Contact Us
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/50 text-sm">
            © 2025 All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
}