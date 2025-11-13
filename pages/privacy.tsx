import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { Shield, ChevronRight } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Klimacek</title>
        <meta name="description" content="Privacy Policy for Klimacek smart agriculture platform" />
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
                <Shield className="w-8 h-8 text-klimacek-brown-900" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Privacy Policy
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
                    At Klimacek, we are committed to protecting your privacy and ensuring the security of your personal
                    information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you use our smart agriculture platform, including our website, mobile applications, IoT devices,
                    and related services (collectively, the "Services").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using our Services, you consent to the data practices described in this Privacy Policy. If you do
                    not agree with our policies and practices, please do not use our Services.
                  </p>
                </section>

                {/* Information We Collect */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">2. Information We Collect</h2>

                  <h3 className="text-xl font-semibold text-klimacek-brown-800 mb-3 mt-6">2.1 Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We may collect personal information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Name, email address, phone number, and postal address</li>
                    <li>Account credentials (username and password)</li>
                    <li>Payment and billing information</li>
                    <li>Farm location and agricultural activity information</li>
                    <li>Communications with our customer support team</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-klimacek-brown-800 mb-3 mt-6">2.2 IoT Device Data</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Our IoT devices automatically collect environmental and agricultural data, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Weather data (temperature, humidity, rainfall, wind speed)</li>
                    <li>Soil conditions (moisture, pH, nutrient levels)</li>
                    <li>Solar panel performance metrics</li>
                    <li>Device location and status information</li>
                    <li>Timestamp data for all measurements</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-klimacek-brown-800 mb-3 mt-6">2.3 Usage Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We automatically collect information about your use of our Services, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>IP address, browser type, and device information</li>
                    <li>Pages visited, features used, and time spent on our platform</li>
                    <li>Clickstream data and interaction patterns</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                {/* How We Use Your Information */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Providing, maintaining, and improving our Services</li>
                    <li>Processing transactions and sending billing information</li>
                    <li>Sending weather alerts and agricultural recommendations</li>
                    <li>Analyzing data to generate insights and predictions using AI</li>
                    <li>Personalizing your experience on our platform</li>
                    <li>Communicating with you about updates, promotions, and support</li>
                    <li>Detecting and preventing fraud, abuse, and security incidents</li>
                    <li>Complying with legal obligations and enforcing our Terms of Service</li>
                    <li>Conducting research and development to improve smart agriculture technology</li>
                  </ul>
                </section>

                {/* Data Sharing and Disclosure */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">4. Data Sharing and Disclosure</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may share your information in the following circumstances:
                  </p>

                  <h3 className="text-xl font-semibold text-klimacek-brown-800 mb-3">4.1 Service Providers</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may share information with third-party service providers who perform services on our behalf, such
                    as payment processing, data analysis, email delivery, hosting services, and customer support.
                  </p>

                  <h3 className="text-xl font-semibold text-klimacek-brown-800 mb-3">4.2 Business Transfers</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If Klimacek is involved in a merger, acquisition, or sale of assets, your information may be transferred
                    as part of that transaction. We will notify you before your information becomes subject to a different
                    privacy policy.
                  </p>

                  <h3 className="text-xl font-semibold text-klimacek-brown-800 mb-3">4.3 Legal Requirements</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may disclose your information if required by law or in response to valid requests by public authorities,
                    such as court orders or government regulations.
                  </p>

                  <h3 className="text-xl font-semibold text-klimacek-brown-800 mb-3">4.4 Aggregated Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may share aggregated or anonymized data that cannot be used to identify you for research, marketing,
                    or other purposes. This helps improve agricultural practices and climate understanding across regions.
                  </p>
                </section>

                {/* Data Security */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">5. Data Security</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your information against
                    unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Secure data storage and backup procedures</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    However, no method of transmission over the internet or electronic storage is 100% secure. While we
                    strive to protect your information, we cannot guarantee its absolute security.
                  </p>
                </section>

                {/* Data Retention */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">6. Data Retention</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                    Privacy Policy, unless a longer retention period is required or permitted by law. When determining the
                    retention period, we consider:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>The nature and sensitivity of the information</li>
                    <li>The purposes for which we process the information</li>
                    <li>Legal and regulatory requirements</li>
                    <li>The potential risk of harm from unauthorized use or disclosure</li>
                  </ul>
                </section>

                {/* Your Rights and Choices */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">7. Your Rights and Choices</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                    <li><strong>Access:</strong> You can request access to the personal information we hold about you</li>
                    <li><strong>Correction:</strong> You can update or correct inaccurate information through your account settings</li>
                    <li><strong>Deletion:</strong> You can request deletion of your personal information, subject to legal obligations</li>
                    <li><strong>Opt-out:</strong> You can opt out of receiving promotional communications by following unsubscribe instructions</li>
                    <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    To exercise these rights, please contact us using the information provided at the end of this policy.
                  </p>
                </section>

                {/* Children's Privacy */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">8. Children's Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our Services are not intended for children under the age of 13. We do not knowingly collect personal
                    information from children under 13. If you become aware that a child has provided us with personal
                    information, please contact us, and we will take steps to delete such information.
                  </p>
                </section>

                {/* International Data Transfers */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">9. International Data Transfers</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your country of residence.
                    These countries may have data protection laws that differ from those in your country. By using our
                    Services, you consent to the transfer of your information to Indonesia and other countries where we operate.
                  </p>
                </section>

                {/* Cookies and Tracking */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">10. Cookies and Tracking Technologies</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to collect and track information about your use of
                    our Services. Cookies are small data files stored on your device. You can control cookie settings
                    through your browser, but disabling cookies may affect your ability to use certain features.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We use the following types of cookies:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for the Services to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Services</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                  </ul>
                </section>

                {/* Changes to Privacy Policy */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">11. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                    requirements. We will notify you of any material changes by posting the new Privacy Policy on this
                    page and updating the "Last updated" date. Your continued use of the Services after changes become
                    effective constitutes acceptance of the updated policy.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-klimacek-brown-900 mb-4">12. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                    please contact us at:
                  </p>
                  <div className="bg-klimacek-brown-50 rounded-lg p-6 border-l-4 border-accent-yellow">
                    <p className="text-gray-800 font-semibold mb-2">Klimacek - Privacy Team</p>
                    <p className="text-gray-700 text-sm">
                      Daratan, RT 2 RW 6, Senden, Tohudan, Colomadu<br />
                      Karanganyar, Jawa Tengah, Indonesia
                    </p>
                    <p className="text-gray-700 text-sm mt-2">
                      Email: <a href="mailto:klimacekacc@gmail.com" className="text-accent-yellow hover:underline">klimacekacc@gmail.com</a><br />
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
