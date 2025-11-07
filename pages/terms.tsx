import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { FileText, ChevronRight } from 'lucide-react';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Klimacek</title>
        <meta name="description" content="Terms of Service for Klimacek smart agriculture platform" />
      </Head>

      <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 transition-all duration-300">
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
              <Link href="/about" className="text-white/90 hover:text-white transition-colors text-sm lg:text-base">
                Tentang Kami
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="relative z-10 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-yellow rounded-full mb-6">
                <FileText className="w-8 h-8 text-klimacek-brown-900" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-white/80 text-lg">
                Last updated: January 2025
              </p>
            </div>

            {/* Content Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12">
              <div className="prose prose-lg max-w-none">

                {/* Introduction */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Welcome to Klimacek. These Terms of Service ("Terms") govern your access to and use of Klimacek's
                    smart agriculture platform, including our website, mobile applications, IoT devices, and related services
                    (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If you do not agree to these Terms, please do not use our Services. Klimacek reserves the right to
                    modify these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.
                  </p>
                </section>

                {/* Account Registration */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">2. Account Registration</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    To access certain features of our Services, you may be required to create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept all responsibility for activities that occur under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </section>

                {/* Use of Services */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">3. Use of Services</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others, including intellectual property rights</li>
                    <li>Transmit any harmful, threatening, or offensive content</li>
                    <li>Attempt to gain unauthorized access to our systems or networks</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Use the Services for any commercial purpose without our written consent</li>
                  </ul>
                </section>

                {/* IoT Devices and Data */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">4. IoT Devices and Data Collection</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our Services include IoT devices such as weather stations and agricultural sensors. By using these devices,
                    you acknowledge and agree that:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                    <li>Data collected by IoT devices will be transmitted to our servers for processing and analysis</li>
                    <li>You are responsible for the proper installation and maintenance of IoT devices</li>
                    <li>Environmental factors may affect device performance and data accuracy</li>
                    <li>We provide data and recommendations for informational purposes only</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    While we strive to provide accurate data, you acknowledge that environmental monitoring involves inherent
                    uncertainties and should not be relied upon as the sole basis for critical agricultural decisions.
                  </p>
                </section>

                {/* Subscription and Payment */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">5. Subscription and Payment</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Certain features of our Services require a paid subscription. By subscribing, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                    <li>Pay all applicable fees for the subscription plan you select</li>
                    <li>Provide accurate and complete billing information</li>
                    <li>Authorize us to charge your payment method on a recurring basis</li>
                    <li>Understand that subscriptions automatically renew unless cancelled</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    You may cancel your subscription at any time through your account settings. Cancellations take effect
                    at the end of the current billing period. No refunds will be provided for partial billing periods.
                  </p>
                </section>

                {/* Intellectual Property */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">6. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All content, features, and functionality of the Services, including but not limited to text, graphics,
                    logos, software, and data compilations, are the exclusive property of Klimacek and are protected by
                    international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You are granted a limited, non-exclusive, non-transferable license to access and use the Services for
                    personal or internal business purposes only. You may not reproduce, distribute, modify, or create
                    derivative works without our prior written consent.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">7. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To the maximum extent permitted by law, Klimacek and its affiliates shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages, including but not limited to loss of profits,
                    data, or crop yields, arising out of or related to your use of the Services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our total liability for any claims arising from your use of the Services shall not exceed the amount
                    you paid to Klimacek during the twelve (12) months preceding the claim.
                  </p>
                </section>

                {/* Disclaimer of Warranties */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">8. Disclaimer of Warranties</h2>
                  <p className="text-gray-700 leading-relaxed">
                    The Services are provided "as is" and "as available" without warranties of any kind, either express or
                    implied. Klimacek disclaims all warranties, including but not limited to implied warranties of
                    merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the
                    Services will be uninterrupted, secure, or error-free.
                  </p>
                </section>

                {/* Termination */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">9. Termination</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to suspend or terminate your access to the Services at any time, with or without
                    notice, for any reason, including violation of these Terms. Upon termination, your right to use the
                    Services will immediately cease, and we may delete your account and data.
                  </p>
                </section>

                {/* Governing Law */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">10. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia,
                    without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject
                    to the exclusive jurisdiction of the courts in Karanganyar, Central Java, Indonesia.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">11. Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-klimacek-brown-50 rounded-lg p-6 border-l-4 border-accent-yellow">
                    <p className="text-gray-800 font-semibold mb-2">Klimacek</p>
                    <p className="text-gray-700 text-sm">
                      Daratan, RT 2 RW 6, Senden, Tohudan, Colomadu<br />
                      Karanganyar, Jawa Tengah, Indonesia
                    </p>
                    <p className="text-gray-700 text-sm mt-2">
                      Email: <a href="mailto:info@klimacek.com" className="text-accent-yellow hover:underline">info@klimacek.com</a><br />
                      Phone: <a href="tel:+628123456789" className="text-accent-yellow hover:underline">+62 812-3456-789</a>
                    </p>
                  </div>
                </section>

              </div>

              {/* Back to Home Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link href="/">
                  <button className="w-full sm:w-auto bg-klimacek-brown-700 hover:bg-klimacek-brown-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center group">
                    Back to Home
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
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
