import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Leaf,
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  Heart,
  MessageCircle,
  Send
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
      name: 'Lorem Ipsum',
      role: 'Chief Executive Officer',
      description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet laoreet. Aliquam in elementum tellus.',
      image: '/images/team-member-1.jpg',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'ceo@klimacek.com',
        website: '#'
      }
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      role: 'Chief Technology Officer',
      description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet laoreet. Aliquam in elementum tellus.',
      image: '/images/team-member-2.jpg',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'cto@klimacek.com',
        website: '#'
      }
    },
    {
      id: 3,
      name: 'Lorem Ipsum',
      role: 'Head of Operations',
      description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet laoreet. Aliquam in elementum tellus.',
      image: '/images/team-member-3.jpg',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        email: 'operations@klimacek.com',
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
        <nav className="relative z-20 flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold">Klimacek</span>
            </Link>
            <Link href="/weather-stations" className="text-white/90 hover:text-white transition-colors">
              Stasiun Cuaca
            </Link>
            <Link href="/products" className="text-white/90 hover:text-white transition-colors">
              Produk Kami
            </Link>
            <Link href="/about" className="text-white font-medium">
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

        {/* Team Members Section */}
        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-8">
            {/* Staggered Cards Layout */}
            <div className="space-y-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  style={{
                    marginTop: index === 0 ? '0' : index === 1 ? '2rem' : '2rem'
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full flex items-center space-x-8">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-300">
                        <img
                          src={member.image || '/images/default-avatar.jpg'}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h2>
                      <p className="text-gray-600 mb-4 text-sm">{member.role}</p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-6">
                        {member.description}
                      </p>

                      {/* Social Links */}
                      <div className="flex items-center space-x-3">
                        {member.socialLinks.facebook && (
                          <a
                            href={member.socialLinks.facebook}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                            aria-label="Facebook"
                          >
                            <Facebook className="w-4 h-4 text-gray-600" />
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a
                            href={member.socialLinks.twitter}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                            aria-label="Twitter"
                          >
                            <Twitter className="w-4 h-4 text-gray-600" />
                          </a>
                        )}
                        <a
                          href="#"
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                          aria-label="Like"
                        >
                          <Heart className="w-4 h-4 text-gray-600" />
                        </a>
                        <a
                          href="#"
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                          aria-label="Message"
                        >
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                        </a>
                        {member.socialLinks.instagram && (
                          <a
                            href={member.socialLinks.instagram}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                            aria-label="Instagram"
                          >
                            <Instagram className="w-4 h-4 text-gray-600" />
                          </a>
                        )}
                        <a
                          href="#"
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                          aria-label="Share"
                        >
                          <Globe className="w-4 h-4 text-gray-600" />
                        </a>
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