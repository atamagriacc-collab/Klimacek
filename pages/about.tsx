import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useAuth } from '../lib/auth-context';
import {
  Leaf,
  LogIn,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
}

export default function About() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Aditya Wisnu Yudha Marsudi',
      role: 'Penggerak Bisnis & Pemasaran',
      description: 'Memimpin strategi bisnis dan pemasaran Klimacek dengan pengalaman di BEM UNS dan startup Seltive.id. Bertanggung jawab dalam pengembangan bisnis, kemitraan strategis, dan kampanye pemasaran.',
      image: '/images/Klimacek_Aditya Wisnu Yudha Marsudi.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'aditya@klimacek.com',
        website: '#'
      }
    },
    {
      id: 2,
      name: 'Mazka Buana Hidayat',
      role: 'Ahli Teknologi & Pengembang Produk',
      description: 'Mengembangkan arsitektur sistem, aplikasi mobile, website, dan implementasi AI untuk Klimacek. Ahli dalam Python, JavaScript, machine learning, dan deep learning dengan pengalaman kompetisi data science.',
      image: '/images/Klimacek_Mazka Buana Hidayat.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'mazka@klimacek.com',
        website: '#'
      }
    },
    {
      id: 3,
      name: 'Desnia Anindy Irni Hareva',
      role: 'Desainer & Branding',
      description: 'Merancang UI/UX aplikasi dan website Klimacek yang intuitif serta mengelola identitas visual dan branding. Berpengalaman sebagai Content Manager dengan prestasi dalam lomba desain infografis.',
      image: '/images/Klimacek_Desnia Anindy Irni Hareva.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'desnia@klimacek.com',
        website: '#'
      }
    },
    {
      id: 4,
      name: 'Pramudya Jesril Pratama',
      role: 'Manajemen Operasional & Proses',
      description: 'Mengelola operasional dan produksi KlimaStation dengan fokus pada perakitan, pengujian, dan quality control. Ahli dalam perancangan instrumentasi dengan pengalaman pengembangan perangkat keras.',
      image: '/images/Klimacek_Pramudya Jesril Pratama.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'pramudya@klimacek.com',
        website: '#'
      }
    },
    {
      id: 5,
      name: 'Divya Zahranika',
      role: 'Pengelola Finansial & Administratif',
      description: 'Mengelola keuangan dan administrasi Klimacek termasuk RAB, arus kas, dan pembukuan. Berpengalaman sebagai Koordinator Bendahara di BEM UNS dengan fokus pengelolaan keuangan yang transparan dan akuntabel.',
      image: '/images/Klimacek_Divya Zahranika.png',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'divya@klimacek.com',
        website: '#'
      }
    }
  ];

  return (
    <>
      <Head>
        <title>Tentang Kami - Klimacek</title>
        <meta name="description" content="Kenali tim di balik Klimacek - solusi cerdas untuk pertanian dan perubahan iklim" />
      </Head>

      <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

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
                <Link href="/products" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                  Produk & Layanan
                </Link>
                <Link href="/about" className="text-white font-medium text-sm lg:text-base">
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
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produk & Layanan
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-3 text-white font-medium bg-white/10 rounded-lg"
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

        {/* Header Section */}
        <div className="relative z-10 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Profil Tim
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Kenali tim ahli di balik Klimacek - solusi cerdas untuk menghadapi tantangan perubahan iklim dalam sektor pertanian dan perikanan
            </p>
            
            {/* Team Structure Overview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Struktur Tim</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 text-white">
                <div className="bg-white/20 rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Hustler</h3>
                  <p className="text-sm text-white">Bisnis & Pemasaran</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Hacker</h3>
                  <p className="text-sm text-white">Teknologi & Pengembangan</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Hipster</h3>
                  <p className="text-sm text-white">Desain & Branding</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Operator</h3>
                  <p className="text-sm text-white">Operasional & Proses</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Administrator</h3>
                  <p className="text-sm text-white">Finansial & Administratif</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="relative z-10 py-20 sm:py-24 lg:py-32 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Section Header - Enhanced */}
            <div className="text-center mb-16 sm:mb-20">
              {/* Main Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Tim <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Klimacek</span>
              </h2>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="h-px w-32 bg-gradient-to-r from-blue-400 via-green-400 to-blue-400"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400"></div>
              </div>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Profesional berpengalaman yang berdedikasi untuk kesuksesan Klimacek
              </p>
            </div>

            {/* Team Grid with Decorative Elements */}
            <div className="relative">
              {/* Grid Background Pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="relative group"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Decorative Corner Accent */}
                    <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-blue-400/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-green-400/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                      {/* Card Content */}
                      <div className="flex flex-col sm:flex-row">
                        {/* Image Section */}
                        <div className="sm:w-2/5 relative h-64 sm:h-80 md:h-96">
                          <div className="absolute inset-0 overflow-hidden bg-gray-100">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent"></div>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col">
                          {/* Name & Role */}
                          <div className="mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                              {member.name}
                            </h3>
                            <p className="text-blue-600 font-semibold text-sm sm:text-base">
                              {member.role}
                            </p>
                          </div>

                          {/* Divider */}
                          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-green-500 mb-4"></div>

                          {/* Description */}
                          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed flex-grow">
                            {member.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}