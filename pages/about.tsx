import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Leaf
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
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Aditya Wisnu Yudha Marsudi',
      role: 'Penggerak Bisnis & Pemasaran',
      description: 'Sebagai hustler, Aditya memimpin tim dengan peran strategis dalam menggerakkan aspek bisnis dan pemasaran Klimacek. Wisnu bertanggung jawab untuk merumuskan strategi pengembangan bisnis, menjalin kemitraan strategis, melakukan riset pasar, serta merancang dan mengeksekusi kampanye pemasaran. Dengan latar belakang dan pemahaman teknis dari Fisika, ia mampu mengintegrasikan keahliannya dalam pengambilan keputusan teknis dengan kemampuan membangun jaringan. Pengalaman organisasinya di Badan Eksekutif Mahasiswa (BEM) UNS dalam berbagai peran kepemimpinan dan kepanitiaan. Pengalaman lainnya seperti dalam startup bernama Seltive.id dan prestasi lomba Business Plan PENDIKAR 2025, semakin memperkuat kepemimpinannya dalam mengkoordinasikan kegiatan tim, mendorong inovasi dari sisi pasar, dan memastikan arah bisnis yang tepat dan berkelanjutan.',
      image: '/images/avatar-1.jpg',
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
      description: 'Mazka memegang peran kunci sebagai hacker yang bertanggung jawab atas seluruh aspek teknis pengembangan produk Klimacek, termasuk arsitektur sistem, pengembangan aplikasi mobile dan website, serta implementasi algoritma Artificial Intelligence (AI). Dengan keahlian mendalam dalam pemrograman (Python, Java, JavaScript, dll.) dan basis data, serta pemahaman kuat tentang machine learning dan deep learning, Mazka memastikan solusi digital yang dihasilkan inovatif, fungsional, dan scalable. Pengalamannya dalam berbagai kompetisi analisis data, hackathon di elevAIte Indonesia, dan proyek-proyek terkait statistika dan AI, salah satunya prestasi dalam Statistical Project for Smart Student membuktikan kapabilitasnya dalam menciptakan solusi praktis dari data kompleks, keterampilan yang sangat relevan dan krusial dalam pengembangan platform Klimacek.',
      image: '/images/avatar-2.jpg',
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
      description: 'Sebagai hipster dalam tim, Desnia berfokus pada aspek kreatif, estetika, dan pengalaman pengguna (UI/UX) produk Klimacek. Desnia bertanggung jawab merancang tampilan antarmuka (UI/UX) aplikasi mobile dan website agar intuitif, menarik, dan mudah digunakan oleh target pengguna. Selain itu, ia juga mengelola identitas visual merek (branding), membuat materi publikasi dan promosi, serta menyusun strategi pemasaran digital yang menarik dan efektif. Dengan pengalamannya sebagai Content Manager di LinkToWork dan prestasi lomba desain poster infografis di Enthusiastic Competition UII dan Festival Ilmiah Mahasiswa UNS, Desnia menunjukkan kemampuannya dalam mengkomunikasikan informasi kompleks melalui desain visual yang menarik dan pesan yang persuasif, keterampilan kunci dalam strategi branding dan pemasaran Klimacek agar mudah diterima pasar.',
      image: '/images/avatar-3.jpg',
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
      description: 'Dalam peran sebagai operator dan manajer operasional, Pramudya memastikan bahwa proses operasional sehari-hari dan produksi perangkat keras (KlimaStation) berjalan dengan lancar, efisien, dan sesuai standar kualitas. Berbekal keahlian dalam perancangan dan pembuatan alat serta instrumentasi sebagai mahasiswa Fisika, Jesril mengkoordinasikan kegiatan teknis terkait perakitan, pengujian, dan quality control KlimaStation. Partisipasinya dalam berbagai pelatihan instrumentasi dan proyek terkait pengembangan perangkat keras memberikan pemahaman mendalam tentang operasional perangkat untuk aplikasi di bidang pertanian dan perikanan modern, sehingga sangat kompeten dalam mengimplementasikan proses produksi Klimacek yang efisien dan menghasilkan produk berkualitas.',
      image: '/images/avatar-1.jpg',
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
      description: 'Divya bertugas mengelola seluruh aspek keuangan dan administrasi tim Klimacek. Tanggung jawabnya meliputi pembuatan Rencana Anggaran Biaya (RAB), pengelolaan arus kas, pembukuan, pelaporan keuangan, serta pengecekan kelengkapan administrasi internal dan eksternal (terkait perizinan awal dan kerjasama). Divya memastikan bahwa pengelolaan sumber daya keuangan tim berjalan secara transparan, akuntabel, dan efisien. Pengalamannya sebagai Koordinator Sekretaris dan Bendahara di event BEM UNS 2024 serta keterlibatannya sebagai Staf Sponsorship memberikan fondasi kuat dalam pengelolaan keuangan, administrasi proyek, dan pencarian sumber daya, keterampilan yang sangat relevan dalam perannya mengelola aspek finansial dan administratif Klimacek.',
      image: '/images/avatar-2.jpg',
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
              <Link href="/products" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Produk Kami
              </Link>
              <Link href="/about" className="text-white font-medium text-sm lg:text-base">
                Tentang Kami
              </Link>
            </div>
          </div>

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
        <div className="relative z-10 pb-8 sm:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Staggered Cards Layout */}
            <div className="space-y-8 sm:space-y-12">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  style={{
                    marginTop: index === 0 ? '0' : '3rem'
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full">
                    {/* Content Only Layout */}
                    <div className="text-center">
                      {/* Content */}
                      <div className="w-full">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">{member.name}</h2>
                        <p className="text-blue-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">{member.role}</p>
                        <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
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