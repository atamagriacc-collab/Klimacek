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
        <nav className="relative z-20 flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold">Klimacek</span>
            </Link>
            <Link href="/weather-stations" className="text-white/90 hover:text-white transition-colors">
              Stasiun Cuaca
            </Link>
            <Link href="/products" className="text-white font-medium">
              Produk Kami
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors">
              Tentang Kami
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white/90 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Pricing Section */}
        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4">Paket Layanan Klimacek</h1>
              <p className="text-white/90 text-lg mb-6">
                Pilih paket yang sesuai dengan kebutuhan pertanian dan<br />
                perikanan Anda. Mulai gratis atau upgrade untuk fitur lengkap.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-full p-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-2 rounded-full transition ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-gray-900 font-medium'
                      : 'text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-6 py-2 rounded-full transition ${
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
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl p-8 ${
                    plan.popular ? 'scale-105 shadow-2xl' : 'shadow-xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm">
                      PALING POPULER
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {plan.price}
                      <span className="text-lg font-normal text-gray-600">{plan.period}</span>
                    </h3>
                    <p className="text-xl font-semibold text-gray-700">{plan.name}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-3 px-6 rounded-full font-medium transition ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Showcase Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 relative">
            <div className="flex items-center justify-between">
              <button
                onClick={prevProduct}
                className="p-3 hover:bg-gray-100 rounded-full transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex-1 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="flex justify-center">
                    <img
                      src={products[currentProductIndex].image || '/images/p2mw 2.png'}
                      alt={products[currentProductIndex].name}
                      className="w-64 h-auto"
                    />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {products[currentProductIndex].name}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {products[currentProductIndex].description}
                    </p>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Spesifikasi</h3>
                      <ul className="space-y-2">
                        {products[currentProductIndex].specifications.map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span className="text-sm text-gray-600">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={nextProduct}
                className="p-3 hover:bg-gray-100 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <div className="flex justify-center space-x-8 mb-8">
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

          <div className="flex justify-center mb-8">
            <Link href="/contact" className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
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