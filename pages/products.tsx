import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Leaf
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

interface Product {
  name: string;
  description: string;
  specifications: string[];
  image: string;
}

export default function Products() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

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
      name: 'Custom',
      price: 'Custom',
      period: '/month',
      features: [
        { text: 'Enterprise', included: true },
        { text: 'Solusi kustomisasi untuk organisasi dan koperasi besar', included: true },
        { text: 'Instalasi stasiun cuaca khusus lokasi', included: true },
        { text: 'Dashboard analitik lanjutan multi-user', included: true },
        { text: 'API integration untuk sistem internal', included: true },
        { text: 'Dukungan teknis 24/7 dedicated', included: true },
        { text: 'Laporan custom sesuai kebutuhan', included: true }
      ],
      buttonText: 'Hubungi Admin',
      buttonStyle: 'bg-gray-800 hover:bg-gray-700 text-white'
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

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <>
      <Head>
        <title>Produk Kami - Klimacek</title>
        <meta name="description" content="Paket layanan dan produk Klimacek untuk solusi pertanian dan perikanan cerdas" />
      </Head>

      <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-xl sm:text-2xl font-bold">Klimacek</span>
            </Link>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/weather-stations" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Stasiun Cuaca
              </Link>
              <Link href="/products" className="text-white font-medium text-sm lg:text-base">
                Produk Kami
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Tentang Kami
              </Link>
            </div>
          </div>

        </nav>

        {/* Pricing Section */}
        <div className="relative z-10 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Paket Layanan Klimacek</h1>
              <p className="text-white/90 text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl mx-auto">
                Pilih paket yang sesuai dengan kebutuhan pertanian dan
                perikanan Anda. Mulai gratis atau upgrade untuk fitur lengkap.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-full p-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 sm:px-6 py-2 rounded-full transition text-sm sm:text-base ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-gray-900 font-medium'
                      : 'text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 sm:px-6 py-2 rounded-full transition text-sm sm:text-base ${
                    billingPeriod === 'yearly'
                      ? 'bg-white text-gray-900 font-medium'
                      : 'text-white'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl p-6 sm:p-8 ${
                    plan.popular ? 'xl:scale-105 shadow-2xl' : 'shadow-xl'
                  }`}
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

                  <button className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-medium transition text-sm sm:text-base ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Showcase Section */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 relative">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <button
                onClick={prevProduct}
                className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition mb-4 sm:mb-0 order-1 sm:order-none"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="flex-1 max-w-4xl mx-auto order-2 sm:order-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="flex justify-center order-2 md:order-1">
                    <img
                      src={products[currentProductIndex].image || '/images/p2mw 2.png'}
                      alt={products[currentProductIndex].name}
                      className="w-48 sm:w-56 md:w-64 h-auto"
                    />
                  </div>

                  <div className="text-center md:text-left order-1 md:order-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {products[currentProductIndex].name}
                    </h2>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      {products[currentProductIndex].description}
                    </p>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">Spesifikasi</h3>
                      <ul className="space-y-1 sm:space-y-2">
                        {products[currentProductIndex].specifications.map((spec, index) => (
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

              <button
                onClick={nextProduct}
                className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition mt-4 sm:mt-0 order-3 sm:order-none"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="flex justify-center mb-6 sm:mb-8">
            <Link href="/contact" className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Contact Us
            </Link>
          </div>

          <div className="text-center text-white/50 text-sm">
            © 2025 All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
}