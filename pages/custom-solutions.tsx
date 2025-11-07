import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import {
  Check,
  Clock,
  Cpu,
  Zap,
  Brain,
  ChevronRight,
  Leaf,
  Smartphone,
  Activity,
  TrendingUp
} from 'lucide-react';

interface CustomToolPackage {
  name: string;
  scale: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}

export default function CustomSolutions() {
  const educationPricing = {
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
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-klimacek-brown-400 to-klimacek-brown-500'
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
      popular: true,
      color: 'from-klimacek-brown-500 to-klimacek-brown-600'
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
      icon: <Brain className="w-8 h-8" />,
      color: 'from-klimacek-brown-600 to-klimacek-brown-700'
    }
  ];

  return (
    <>
      <Head>
        <title>Edukasi & Custom Alat - Klimacek</title>
        <meta name="description" content="Layanan edukasi pertanian dan custom alat monitoring dengan teknologi IoT dan AI untuk pertanian modern" />
      </Head>

      <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 transition-all duration-300">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/Logo klimacek trans.jpg" alt="Klimacek Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
              <span className="text-xl sm:text-2xl font-bold text-white">Klimacek</span>
            </Link>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/weather-stations" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Stasiun Cuaca
              </Link>
              <Link href="/products" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Produk Kami
              </Link>
              <Link href="/custom-solutions" className="text-white font-medium text-sm lg:text-base">
                Edukasi & Custom
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Tentang Kami
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Edukasi & Custom Alat
              </h1>
              <p className="text-white/90 text-lg sm:text-xl mb-2 max-w-3xl mx-auto">
                Tingkatkan kemampuan pertanian Anda dengan edukasi berkualitas
              </p>
              <p className="text-white/80 text-base sm:text-lg max-w-3xl mx-auto">
                dan solusi IoT yang disesuaikan dengan kebutuhan lahan Anda
              </p>
            </div>

            {/* Education Section */}
            <div className="mb-12 sm:mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-white/20">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-gradient-to-br from-klimacek-brown-500 to-klimacek-brown-600 p-4 rounded-2xl">
                      <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                      {educationPricing.title}
                    </h2>
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-5xl sm:text-6xl font-bold text-klimacek-brown-700">
                        {educationPricing.price}
                      </span>
                      <span className="text-2xl text-gray-900 font-semibold ml-2">{educationPricing.period}</span>
                    </div>
                    <p className="text-gray-800 text-base sm:text-lg max-w-2xl mx-auto font-semibold">
                      {educationPricing.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8">
                    {educationPricing.features.map((feature, index) => (
                      <div key={index} className="flex items-start bg-klimacek-brown-50 rounded-xl p-3 sm:p-4 border border-klimacek-brown-200">
                        <Check className="w-5 h-5 text-green-700 mt-0.5 mr-3 flex-shrink-0 font-bold" />
                        <span className="text-sm sm:text-base text-gray-800 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Link href="/contact">
                      <button className="bg-klimacek-brown-700 hover:bg-klimacek-brown-800 text-white px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-2xl border-2 border-klimacek-brown-900">
                        Daftar Sekarang
                        <ChevronRight className="inline-block ml-2 w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Tools Section */}
            <div>
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Custom Alat Pertanian
                </h2>
                <p className="text-white/90 text-base sm:text-lg max-w-3xl mx-auto">
                  Pilih paket yang sesuai dengan skala dan kebutuhan pertanian Anda
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {customToolPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl transition-all transform hover:scale-105 flex flex-col ${
                      pkg.popular ? 'lg:scale-105 ring-4 ring-accent-yellow' : ''
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-yellow to-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ PALING POPULER
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`inline-flex bg-gradient-to-br ${pkg.color} p-4 rounded-2xl mb-4`}>
                        <div className="text-white">
                          {pkg.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-sm font-semibold text-klimacek-brown-600 mb-4 uppercase tracking-wide">
                        {pkg.scale}
                      </p>
                      <div className="mb-3">
                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-klimacek-brown-600 to-klimacek-brown-500 bg-clip-text text-transparent">
                          {pkg.price}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-800 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/contact" className="mt-auto">
                      <button
                        className={`w-full py-3 sm:py-4 px-6 rounded-full font-bold transition-all transform hover:scale-105 text-sm sm:text-base shadow-2xl border-2 ${
                          pkg.popular
                            ? 'bg-klimacek-brown-700 hover:bg-klimacek-brown-800 text-white border-klimacek-brown-900'
                            : 'bg-gray-900 hover:bg-black text-white border-black'
                        }`}
                      >
                        Pesan Sekarang
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Klimacek?
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto font-medium">
              Solusi pertanian modern yang terpercaya dengan teknologi terkini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-br from-klimacek-brown-500 to-klimacek-brown-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teknologi Terkini</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Menggunakan IoT, AI, dan machine learning untuk monitoring dan optimasi hasil panen
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-br from-klimacek-brown-500 to-klimacek-brown-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hasil Terbukti</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Meningkatkan efisiensi hingga 40% dan mengurangi pemborosan air hingga 60%
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-gradient-to-br from-klimacek-brown-500 to-klimacek-brown-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mudah Digunakan</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Interface intuitif dengan panduan lengkap dan dukungan tim ahli kami
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent-yellow py-12 sm:py-16 border-y-4 border-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Siap Meningkatkan Hasil Pertanian Anda?
          </h2>
          <p className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto font-bold">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik
          </p>
          <Link href="/contact">
            <button className="bg-klimacek-brown-900 hover:bg-black text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl border-2 border-black">
              Hubungi Kami Sekarang
              <ChevronRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
