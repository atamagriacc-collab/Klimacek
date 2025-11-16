import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useAuth } from '../lib/auth-context';
import {
  Check,
  Clock,
  Smartphone,
  Activity,
  Brain,
  ArrowRight,
  ArrowLeft,
  LogIn,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: { text: string; included: boolean }[];
  buttonText: string;
  buttonStyle: string;
}

interface CustomToolPackage {
  name: string;
  scale: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

interface Product {
  name: string;
  description: string;
  specifications: string[];
  image: string;
}

export default function Products() {
  const { user, logout } = useAuth();
  const [showCustomTools, setShowCustomTools] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const customToolsRef = useRef<HTMLDivElement>(null);

  const scrollToCustomTools = () => {
    setShowCustomTools(true);
  };

  const scrollBackToSubscription = () => {
    setShowCustomTools(false);
  };

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Trial',
      price: 'Rp0',
      period: '/bulan',
      features: [
        { text: 'Mulai dengan fitur dasar untuk mengenal Klimacek', included: true },
        { text: 'Data cuaca dari 3 stasiun referensi', included: true },
        { text: 'Dashboard dengan grafik sederhana', included: true },
        { text: 'Prediksi cuaca 3 hari ke depan', included: true },
        { text: 'Dukungan email standar', included: true },
        { text: 'Data cuaca harian maksimal 1 bulan', included: true }
      ],
      buttonText: 'Mulai Gratis',
      buttonStyle: 'bg-gray-800 hover:bg-gray-700 text-white'
    },
    {
      name: 'Premium',
      price: 'Rp15.000',
      period: '/bulan',
      popular: true,
      features: [
        { text: 'Untuk petani dan nelayan yang membutuhkan data lengkap', included: true },
        { text: 'Akses semua stasiun cuaca Klimacek', included: true },
        { text: 'Alert cuaca ekstrem real-time', included: true },
        { text: 'Prediksi cuaca akurat 7 hari ke depan', included: true },
        { text: 'Rekomendasi AI untuk pertanian/perikanan', included: true },
        { text: 'Analisis tren iklim dan pola cuaca', included: true }
      ],
      buttonText: 'Pilih Premium',
      buttonStyle: 'bg-white hover:bg-gray-100 text-gray-900'
    },
    {
      name: '',
      price: 'Custom Alat Pertanian',
      period: '',
      features: [
        { text: 'Enterprise', included: true },
        { text: 'Solusi kustomisasi untuk organisasi dan koperasi besar', included: true },
        { text: 'Instalasi stasiun cuaca khusus lokasi', included: true },
        { text: 'Dashboard analitik lanjutan multi-user', included: true },
        { text: 'API integration untuk sistem internal', included: true },
        { text: 'Dukungan teknis 24/7 dedicated', included: true },
        { text: 'Laporan custom sesuai kebutuhan', included: true }
      ],
      buttonText: 'Show All Packages',
      buttonStyle: 'bg-gray-800 hover:bg-gray-700 text-white'
    }
  ];

  const educationService = {
    title: 'Edukasi Pertanian',
    price: 'Rp 40.000',
    period: '/jam',
    description: 'Pelatihan dan konsultasi pertanian modern dengan teknologi IoT dan AI',
    features: [
      'Konsultasi langsung dengan ahli pertanian',
      'Pelatihan penggunaan teknologi IoT untuk pertanian',
      'Tips dan trik optimasi hasil panen',
      'Analisis kondisi lahan dan rekomendasi tanaman',
      'Panduan penggunaan aplikasi Klimacek',
      'Materi edukasi komprehensif',
      'Sertifikat digital untuk peserta'
    ]
  };

  const customToolPackages: CustomToolPackage[] = [
    {
      name: 'Skala Kecil',
      scale: 'Monitoring',
      price: 'Rp 500.000',
      description: 'Solusi monitoring dasar untuk lahan kecil hingga menengah',
      features: [
        'Sensor suhu dan kelembaban',
        'Dashboard monitoring real-time',
        'Data logging 30 hari',
        'Notifikasi via WhatsApp',
        'Instalasi dan setup gratis',
        'Garansi 6 bulan',
        'Panduan penggunaan lengkap'
      ],
      icon: <Smartphone className="w-8 h-8" />
    },
    {
      name: 'Skala Sedang',
      scale: 'Monitoring + Otomatis',
      price: 'Rp 1.500.000',
      description: 'Sistem monitoring dengan kontrol otomatis untuk efisiensi maksimal',
      features: [
        'Semua fitur Skala Kecil',
        'Sistem irigasi otomatis',
        'Kontrol pompa air otomatis',
        'Multi-sensor (suhu, kelembaban, pH tanah)',
        'Dashboard analitik lanjutan',
        'Data logging 90 hari',
        'Mobile app iOS & Android',
        'Garansi 1 tahun',
        'Training & support 3 bulan'
      ],
      icon: <Activity className="w-8 h-8" />,
      popular: true
    },
    {
      name: 'Skala Besar',
      scale: 'Full Automation + AI',
      price: 'Rp 2.500.000',
      description: 'Solusi enterprise dengan AI untuk pertanian presisi tingkat lanjut',
      features: [
        'Semua fitur Skala Sedang',
        'Rekomendasi AI berbasis machine learning',
        'Prediksi hasil panen dengan AI',
        'Deteksi penyakit tanaman otomatis',
        'Optimasi jadwal irigasi dengan AI',
        'Integrasi data cuaca lokal',
        'Multi-zona monitoring',
        'API access untuk integrasi custom',
        'Dashboard enterprise multi-user',
        'Data logging unlimited',
        'Garansi 2 tahun',
        'Dedicated support 24/7'
      ],
      icon: <Brain className="w-8 h-8" />
    }
  ];

  const products: Product[] = [
    {
      name: 'KlimaStation',
      description: 'Merupakan stasiun cuaca yang digunakan untuk indikator dari berbagai sensor yang dapat dipantau melalui Aplikasi dan Website Klimacek.',
      specifications: [
        '8 sensor seperti kelembaban, temperatur suhu, intensitas cahaya, curah hujan, kecepatan angin atau anemometer, sensor tegangan sel surya, sensor watt sel surya, dan sensor arus sel surya yang terintegrasi',
        'Rangka tahan air (IP66)',
        'Baterai backup 72 jam',
        'Garansi 6 bulan'
      ],
      image: '/images/p2mw 2.png'
    }
  ];

  return (
    <>
      <Head>
        <title>Produk & Layanan - Klimacek</title>
        <meta name="description" content="Paket layanan dan produk Klimacek untuk solusi pertanian dan perikanan cerdas" />
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }

          .animate-fade-in-down {
            animation: fadeInDown 0.6s ease-out forwards;
          }

          .animate-slide-in-right {
            animation: slideInRight 0.6s ease-out forwards;
          }

          .animation-delay-100 {
            animation-delay: 0.1s;
            opacity: 0;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
            opacity: 0;
          }

          .animation-delay-300 {
            animation-delay: 0.3s;
            opacity: 0;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
            opacity: 0;
          }

          .animation-delay-500 {
            animation-delay: 0.5s;
            opacity: 0;
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/logo klimacek trans fix.png" alt="Klimacek Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                <span className="text-xl sm:text-2xl font-bold text-white">Klimacek</span>
              </Link>
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                <Link href="/weather-stations" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                  Stasiun Cuaca
                </Link>
                <Link href="/products" className="text-white font-medium text-sm lg:text-base">
                  Produk & Layanan
                </Link>
                <Link href="/about" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                  Tentang Kami
                </Link>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              {/* Hamburger Menu Button - Mobile Only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
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
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-md">
              <div className="px-4 py-4 space-y-3">
                <Link
                  href="/weather-stations"
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Stasiun Cuaca
                </Link>
                <Link
                  href="/products"
                  className="block px-4 py-3 text-white font-medium bg-white/10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produk & Layanan
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tentang Kami
                </Link>

                {/* Mobile Auth Buttons */}
                <div className="border-t border-white/10 pt-3 space-y-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-white/70 text-sm">
                        <User className="w-4 h-4 inline mr-2" />
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/signup"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Daftar</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Produk & Layanan Klimacek
              </h1>
              <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto">
                Solusi lengkap untuk pertanian dan perikanan modern dengan teknologi IoT dan AI
              </p>
            </div>

            {/* Container for sliding sections */}
            <div className="relative overflow-hidden">
              {/* Subscription + Education Section (Slides Out Left) */}
              <div
                className={`transition-all duration-700 ease-in-out ${
                  showCustomTools
                    ? 'opacity-0 -translate-x-full absolute invisible'
                    : 'opacity-100 translate-x-0 relative visible'
                }`}
              >
                {/* Subscription Plans Section */}
                <div className="mb-16 sm:mb-20">
                  <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Paket Berlangganan</h2>
                    <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
                      Akses data cuaca real-time dan rekomendasi AI untuk pertanian cerdas
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {pricingPlans.map((plan, planIndex) => (
                      <div
                        key={plan.name}
                        className={`relative bg-white rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
                          plan.popular ? 'xl:scale-105 shadow-2xl ring-4 ring-accent-yellow' : 'shadow-xl'
                        }`}
                        style={{
                          transitionDelay: showCustomTools ? '0ms' : `${planIndex * 100}ms`
                        }}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm">
                            PALING POPULER
                          </div>
                        )}

                        <div className="text-center mb-4 sm:mb-6">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {plan.price}
                            <span className="text-base sm:text-lg font-normal text-gray-600">{plan.period}</span>
                          </h3>
                          <p className="text-lg sm:text-xl font-semibold text-gray-700">{plan.name}</p>
                        </div>

                        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-600">{feature.text}</span>
                            </div>
                          ))}
                        </div>

                        {plan.buttonText === 'Show All Packages' ? (
                          <button
                            onClick={scrollToCustomTools}
                            className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-medium transition-all hover:scale-105 text-sm sm:text-base ${plan.buttonStyle}`}
                          >
                            {plan.buttonText}
                          </button>
                        ) : (
                          <a
                            href={`https://wa.me/6281911998210?text=${encodeURIComponent(
                              `Halo kak, saya mau tanya tanya terkait paket ${plan.name} Klimacek`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-medium transition-all hover:scale-105 text-sm sm:text-base ${plan.buttonStyle} inline-block text-center`}
                          >
                            {plan.buttonText}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Service Section */}
                <div className="mb-16 sm:mb-20">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Layanan Edukasi</h2>
                <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
                  Tingkatkan pengetahuan pertanian Anda dengan konsultasi ahli
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                      {educationService.title}
                    </h3>
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-5xl sm:text-6xl font-bold text-klimacek-brown-700">
                        {educationService.price}
                      </span>
                      <span className="text-2xl text-gray-900 font-semibold ml-2">{educationService.period}</span>
                    </div>
                    <p className="text-gray-800 text-base sm:text-lg max-w-2xl mx-auto font-semibold">
                      {educationService.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8">
                    {educationService.features.map((feature, index) => (
                      <div key={index} className="flex items-start bg-klimacek-brown-50 rounded-xl p-3 sm:p-4 border border-klimacek-brown-200">
                        <Check className="w-5 h-5 text-green-700 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-800 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <a
                      href={`https://wa.me/6281911998210?text=${encodeURIComponent(
                        'Halo kak, saya mau tanya tanya terkait layanan Edukasi Pertanian Klimacek'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-klimacek-brown-700 hover:bg-klimacek-brown-800 text-white px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-2xl border-2 border-klimacek-brown-900"
                    >
                      Daftar Sekarang
                    </a>
                  </div>
                </div>
              </div>
                </div>
              </div>

              {/* Custom Hardware Section - Timeline/Progression Style (Slides In Right) */}
              <div
                ref={customToolsRef}
                className={`transition-all duration-700 ease-in-out ${
                  showCustomTools
                    ? 'opacity-100 translate-x-0 relative visible'
                    : 'opacity-0 translate-x-full absolute invisible'
                }`}
              >
              {/* Back Button */}
              {showCustomTools && (
                <div className="flex justify-start mb-8 animate-fade-in">
                  <button
                    onClick={scrollBackToSubscription}
                    className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Kembali ke Paket Berlangganan</span>
                  </button>
                </div>
              )}

              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 animate-fade-in-down">
                  Custom Alat Pertanian
                </h2>
                <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-6 animate-fade-in-down animation-delay-100">
                  Pilih solusi IoT yang sesuai dengan perjalanan bisnis pertanian Anda
                </p>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full animate-fade-in-down animation-delay-200">
                  <span className="text-white/80 text-sm">Dari Monitoring Dasar</span>
                  <ArrowRight className="w-4 h-4 text-accent-yellow" />
                  <span className="text-white/80 text-sm">hingga Full AI Automation</span>
                </div>
              </div>

              {/* Timeline Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Connection Line - Desktop */}
                <div className={`hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-klimacek-brown-300 via-accent-yellow to-klimacek-brown-700 mx-24 ${
                  showCustomTools ? 'animate-fade-in animation-delay-200' : 'opacity-0'
                }`}></div>

                {/* Timeline Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
                  {customToolPackages.map((pkg, index) => (
                    <div
                      key={index}
                      className={`relative ${showCustomTools ? 'animate-slide-in-right' : ''}`}
                      style={{
                        animationDelay: showCustomTools ? `${index * 200 + 300}ms` : '0ms',
                        opacity: showCustomTools ? 0 : 1
                      }}
                    >
                      {/* Step Number Circle */}
                      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 relative z-10 ${
                        pkg.popular
                          ? 'bg-gradient-to-br from-accent-yellow to-yellow-400 text-gray-900 ring-4 ring-white shadow-2xl'
                          : 'bg-white text-klimacek-brown-700 shadow-xl'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Arrow Between Steps - Desktop Only */}
                      {index < customToolPackages.length - 1 && (
                        <div className="hidden lg:block absolute top-8 -right-12 z-20">
                          <ArrowRight className={`w-8 h-8 ${pkg.popular ? 'text-accent-yellow' : 'text-white/60'}`} />
                        </div>
                      )}

                      {/* Content Card */}
                      <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl transition-all hover:shadow-3xl ${
                        pkg.popular ? 'ring-4 ring-accent-yellow transform lg:scale-105' : ''
                      }`}>
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-yellow to-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-30">
                            ⭐ PALING POPULER
                          </div>
                        )}

                        {/* Icon & Title */}
                        <div className="text-center mb-6">
                          <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                            pkg.popular
                              ? 'bg-gradient-to-br from-accent-yellow to-yellow-400'
                              : 'bg-gradient-to-br from-klimacek-brown-500 to-klimacek-brown-600'
                          }`}>
                            <div className={pkg.popular ? 'text-gray-900' : 'text-white'}>
                              {pkg.icon}
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {pkg.name}
                          </h3>
                          <div className="inline-block bg-klimacek-brown-100 px-3 py-1 rounded-full mb-4">
                            <p className="text-xs font-bold text-klimacek-brown-700 uppercase tracking-wide">
                              {pkg.scale}
                            </p>
                          </div>

                          <div className="mb-3">
                            <span className="text-3xl sm:text-4xl font-bold text-klimacek-brown-700">
                              {pkg.price}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm font-medium">
                            {pkg.description}
                          </p>
                        </div>

                        {/* Features - Compact */}
                        <div className="space-y-2 mb-6 border-t border-gray-200 pt-4">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Fitur Unggulan:</p>
                          {pkg.features.slice(0, 4).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-xs text-gray-700">{feature}</span>
                            </div>
                          ))}
                          {pkg.features.length > 4 && (
                            <p className="text-xs text-klimacek-brown-600 font-semibold pt-2">
                              +{pkg.features.length - 4} fitur lainnya
                            </p>
                          )}
                        </div>

                        {/* CTA Button */}
                        <a
                          href={`https://wa.me/6281911998210?text=${encodeURIComponent(
                            `Halo kak, saya mau tanya tanya terkait paket ${pkg.scale} ${pkg.name} Klimacek`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-3 px-6 rounded-full font-bold transition-all transform hover:scale-105 text-sm shadow-xl inline-block text-center ${
                            pkg.popular
                              ? 'bg-gradient-to-r from-accent-yellow to-yellow-400 hover:from-yellow-400 hover:to-accent-yellow text-gray-900'
                              : 'bg-klimacek-brown-700 hover:bg-klimacek-brown-800 text-white'
                          }`}
                        >
                          Konsultasi Gratis →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className={`text-center mt-12 ${
                  showCustomTools ? 'animate-fade-in animation-delay-500' : 'opacity-0'
                }`}>
                  <p className="text-white/90 text-lg mb-4">Tidak yakin paket mana yang cocok?</p>
                  <a
                    href={`https://wa.me/6281911998210?text=${encodeURIComponent(
                      'Halo kak, saya mau konsultasi terkait paket Custom Alat Pertanian yang cocok untuk kebutuhan saya'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white hover:bg-gray-100 text-klimacek-brown-900 px-8 py-3 rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-2xl"
                  >
                    Hubungi Tim Kami untuk Konsultasi
                  </a>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Showcase Section */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div className="flex justify-center order-2 md:order-1">
                  <img
                    src={products[0].image || '/images/p2mw 2.png'}
                    alt={products[0].name}
                    className="w-48 sm:w-56 md:w-64 h-auto"
                  />
                </div>

                <div className="text-center md:text-left order-1 md:order-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {products[0].name}
                  </h2>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    {products[0].description}
                  </p>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">Spesifikasi</h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {products[0].specifications.map((spec, index) => (
                        <li key={index} className="flex items-start text-left">
                          <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
                          <span className="text-xs sm:text-sm text-gray-600">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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