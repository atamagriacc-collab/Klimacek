import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-klimacek-brown-900 via-klimacek-brown-800 to-klimacek-brown-900 text-white">
      {/* Main Footer Content */}
      <div className="border-t-4 border-accent-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-yellow rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <img
                    src="/logo klimacek trans fix.png"
                    alt="Klimacek Logo"
                    className="h-14 w-14 rounded-full relative z-10 ring-2 ring-accent-yellow/30 group-hover:ring-accent-yellow transition-all"
                  />
                </div>
                <span className="text-2xl font-bold text-white group-hover:text-accent-yellow transition-colors">Klimacek</span>
              </Link>
              <p className="text-klimacek-brown-100 text-sm leading-relaxed mb-6">
                Climate intelligence for smart agriculture. Empowering farmers with data-driven tools, IoT, and AI for a sustainable future.
              </p>
              {/* Social Media */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-klimacek-brown-300 uppercase tracking-wide">Follow Us:</span>
                <a
                  href="https://www.instagram.com/klimacek.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-klimacek-brown-700/50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-white">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-yellow"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-klimacek-brown-100 hover:text-accent-yellow transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-klimacek-brown-100 hover:text-accent-yellow transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Products & Services
                  </Link>
                </li>
                <li>
                  <Link href="/weather-stations" className="text-klimacek-brown-100 hover:text-accent-yellow transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    Weather Stations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-klimacek-brown-100 hover:text-accent-yellow transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent-yellow transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-yellow"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <svg className="w-5 h-5 text-accent-yellow mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-klimacek-brown-100 text-sm">Mon-Fri: 08.00 - 17.00</span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-5 h-5 text-accent-yellow mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-klimacek-brown-100 text-sm leading-relaxed">
                    Daratan, RT 2 RW 6, Senden, Tohudan, Colomadu, Karanganyar, Jawa Tengah
                  </span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-5 h-5 text-accent-yellow mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+628123456789" className="text-klimacek-brown-100 hover:text-accent-yellow transition-colors text-sm">
                    +62 812-3456-789
                  </a>
                </li>
                <li className="flex items-start group">
                  <svg className="w-5 h-5 text-accent-yellow mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:klimacekacc@gmail.com" className="text-klimacek-brown-100 hover:text-accent-yellow transition-colors text-sm">
                    klimacekacc@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 relative inline-block">
                Newsletter
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-yellow"></span>
              </h4>
              <p className="text-klimacek-brown-100 text-sm mb-4">
                Subscribe to get the latest updates and news about smart agriculture.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-klimacek-brown-700/50 border border-klimacek-brown-600 rounded-lg text-white placeholder-klimacek-brown-300 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all text-sm"
                    aria-label="Newsletter email"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent-yellow hover:bg-yellow-500 text-klimacek-brown-900 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-accent-yellow/50 transform hover:-translate-y-0.5 text-sm"
                >
                  Subscribe Now
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-klimacek-brown-700/50 bg-klimacek-brown-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-klimacek-brown-300 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Klimacek. All rights reserved. Made with passion for sustainable agriculture.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-klimacek-brown-300 hover:text-accent-yellow transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-klimacek-brown-300 hover:text-accent-yellow transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}