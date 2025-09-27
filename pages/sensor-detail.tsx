import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot
} from 'recharts';
import {
  Download,
  Clock,
  AlertTriangle,
  Leaf,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

interface SensorDataPoint {
  index: number;
  value: number;
}

interface Recommendation {
  type: 'warning' | 'tip';
  text: string;
}

export default function SensorDetail() {
  const router = useRouter();
  const { sensorType = 'kelembapan' } = router.query;
  const [timeInterval, setTimeInterval] = useState('24h');

  // Sample data for the chart
  const sensorData: SensorDataPoint[] = [
    { index: 0, value: 450 },
    { index: 1, value: 200 },
    { index: 2, value: 650 },
    { index: 3, value: 100 },
    { index: 4, value: 850 },
    { index: 5, value: 50 },
    { index: 6, value: 400 },
    { index: 7, value: 650 },
    { index: 8, value: 150 },
    { index: 9, value: 350 }
  ];

  const recommendations: Recommendation[] = [
    {
      type: 'warning',
      text: 'Alert: Kelembapan ekstrem rendah (<20%) terdeteksi pada jam 14:00. Tingkatkan frekuensi penyiraman dan monitoring tanaman sensitif.'
    },
    {
      type: 'tip',
      text: 'Tips Optimalisasi:'
    }
  ];

  const optimizationTips = [
    'Gunakan mulsa untuk menjaga kelembapan tanah',
    'Implementasikan sistem irigasi tetes untuk efisiensi kelembapan rendah',
    'Monitor penyakit jamur saat kelembapan >80%',
    'Sesuaikan jadwal aplikasi pestisida dengan tingkat kelembapan'
  ];

  const getSensorTitle = () => {
    const titles: { [key: string]: string } = {
      kelembapan: 'Kelembapan',
      temperatur: 'Temperatur Suhu',
      cahaya: 'Intensitas Cahaya',
      angin: 'Kecepatan Angin',
      hujan: 'Curah Hujan',
      'solar-arus': 'Arus Solar Cell',
      'solar-tegangan': 'Tegangan Solar Cell',
      'solar-watt': 'Watt Solar Cell'
    };
    return titles[sensorType as string] || 'Sensor Data';
  };

  const handleDownload = () => {
    // Implement data download functionality
    const dataStr = JSON.stringify(sensorData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sensorType}-data-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>{getSensorTitle()} - Klimacek</title>
        <meta name="description" content={`Analisis detail ${getSensorTitle()} dengan rekomendasi AI`} />
      </Head>

      <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

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

        {/* Main Content */}
        <div className="relative z-10 py-8">
          <div className="max-w-6xl mx-auto px-8">
            {/* Chart Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{getSensorTitle()}</h1>

              {/* Chart */}
              <div className="mb-8">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={sensorData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="index"
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                      domain={[0, 1000]}
                      ticks={[0, 250, 500, 750, 1000]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#000000"
                      strokeWidth={3}
                      dot={{ fill: '#000000', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recommendations Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rekomendasi Keputusan :</h2>

                <div className="space-y-4">
                  <p className="text-gray-700">
                    Berdasarkan data kelembapan 24 jam terakhir, terjadi fluktuasi signifikan dengan puncak tertinggi mencapai 85% pada pukul 04:00 dan
                    terendah 15% pada pukul 14:00. Pola ini menunjukkan kondisi kelembapan yang sangat bervariasi sepanjang hari.
                  </p>

                  {/* Alert */}
                  <div className="flex items-start space-x-3 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      <span className="font-semibold">Alert: Kelembapan ekstrem rendah (&lt;20%)</span> terdeteksi pada jam 14:00.
                      Tingkatkan frekuensi penyiraman dan monitoring tanaman sensitif.
                    </p>
                  </div>

                  {/* Tips */}
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Tips Optimalisasi:</p>
                    <ul className="space-y-2">
                      {optimizationTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setTimeInterval(timeInterval === '24h' ? '7d' : '24h')}
                  className="px-6 py-3 bg-white border-2 border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition flex items-center space-x-2"
                >
                  <Clock className="w-5 h-5" />
                  <span>Time Interval</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Data</span>
                </button>
              </div>
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