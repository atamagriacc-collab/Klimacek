import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Search,
  MapPin,
  Info,
  Settings,
  Download,
  FileText,
  Plus,
  Cloud,
  CloudRain,
  Sun,
  Leaf,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown
} from 'lucide-react';

interface StationData {
  name: string;
  value: number;
  unit: string;
  change: number;
  graph: number[];
  sensorType: string;
}

interface WeatherForecast {
  time: string;
  temp: number;
  condition: 'rain' | 'cloudy' | 'sunny';
}

export default function WeatherStations() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState('Stasiun 21 - Surakarta');
  const [selectedCity, setSelectedCity] = useState('');

  const stationMetrics = [
    { name: 'Temperatur Suhu', value: 40, unit: '%', change: -2.5, graph: [30, 35, 38, 40, 42, 38, 40], sensorType: 'temperatur' },
    { name: 'Kelembapan', value: 50, unit: '%', change: 3.2, graph: [45, 48, 52, 50, 49, 51, 50], sensorType: 'kelembapan' },
    { name: 'Intensitas Cahaya', value: 45, unit: '%', change: -1.8, graph: [50, 48, 45, 43, 44, 46, 45], sensorType: 'cahaya' },
    { name: 'Arus Solar cell', value: 48, unit: '%', change: 0.5, graph: [46, 47, 48, 49, 48, 47, 48], sensorType: 'solar-arus' },
    { name: 'Tegangan Solar Cell', value: 60, unit: '%', change: -5.2, graph: [65, 63, 62, 60, 58, 59, 60], sensorType: 'solar-tegangan' },
    { name: 'Watt Solar Cell', value: 70, unit: '%', change: 2.8, graph: [68, 69, 70, 71, 70, 69, 70], sensorType: 'solar-watt' },
    { name: 'Kecepatan Angin', value: 80, unit: '%', change: -3.5, graph: [82, 81, 80, 79, 78, 79, 80], sensorType: 'angin' },
    { name: 'Curah Hujan', value: 90, unit: '%', change: 4.2, graph: [85, 87, 88, 90, 91, 90, 90], sensorType: 'hujan' }
  ];

  const weatherForecast: WeatherForecast[] = Array.from({ length: 18 }, (_, i) => ({
    time: `${20 + (i >= 4 ? i - 4 : i)}:00`,
    temp: 30 + Math.floor(Math.random() * 5),
    condition: i % 3 === 0 ? 'rain' : i % 3 === 1 ? 'cloudy' : 'sunny'
  }));

  const cities = [
    'Bantul',
    'Gunung Kidul',
    'Kulon Progo',
    'Sleman',
    'Kota Yogyakarta'
  ];

  const renderSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const width = 100;
    const height = 40;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="w-full h-10">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className="text-gray-600"
        />
      </svg>
    );
  };

  const getWeatherIcon = (condition: 'rain' | 'cloudy' | 'sunny') => {
    switch (condition) {
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <>
      <Head>
        <title>Stasiun Cuaca - Klimacek</title>
        <meta name="description" content="Monitor stasiun cuaca Klimacek di seluruh Indonesia" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        {/* Navigation */}
        <nav className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2 text-white">
                  <Leaf className="h-8 w-8" />
                  <span className="text-xl font-bold">Klimacek</span>
                </Link>
                <Link href="/weather-stations" className="text-white font-medium">
                  Stasiun Cuaca
                </Link>
                <Link href="/products" className="text-gray-300 hover:text-white transition">
                  Produk Kami
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white transition">
                  Tentang Kami
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-300 hover:text-white transition">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Map Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 z-10"></div>

          {/* Search Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center space-x-4">
            <div className="flex-1 bg-white rounded-lg shadow-lg flex items-center px-4 py-2">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Negara, kota, atau lokasi Anda..."
                className="flex-1 outline-none text-gray-700"
              />
            </div>
            <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition">
              <Info className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
            </button>
            <button className="px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition flex items-center space-x-2">
              <Plus className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Menambahkan</span>
            </button>
          </div>

          {/* City Selector */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-64">
            <h3 className="font-semibold text-gray-800 mb-2">Kabupaten/Kota</h3>
            <div className="space-y-1">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition ${
                    selectedCity === city ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {city}
                </button>
              ))}
              <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-gray-100 rounded transition">
                Kota Yogyakarta →
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="h-96 bg-cover bg-center relative" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>
            {/* Station Markers */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Station Data Section */}
        <div className="bg-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-semibold flex items-center">
                {selectedStation}
                <ChevronDown className="w-5 h-5 ml-2" />
              </h2>
              <div className="flex items-center space-x-6 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">0/8</div>
                  <div className="text-xs text-gray-400">Sensor Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">99.9 %</div>
                  <div className="text-xs text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1 min</div>
                  <div className="text-xs text-gray-400">Interval Update</div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {stationMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-gray-600">{metric.name}</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {metric.value}{metric.unit}
                      </p>
                      <p className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Normal: {metric.change > 0 ? '+' : ''}{metric.change}%
                      </p>
                    </div>
                    <Cloud className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="mt-2">
                    {renderSparkline(metric.graph)}
                  </div>
                  <button
                    onClick={() => router.push(`/sensor-detail?sensorType=${metric.sensorType}`)}
                    className="mt-2 w-full bg-gray-800 text-white text-xs py-1 px-2 rounded hover:bg-gray-700 transition"
                  >
                    Detail Info
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                Unduh Data
              </button>
              <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                Konfigurasi Peringatan
              </button>
              <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                Kalibrasi Sensors
              </button>
              <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                Lihat Report
              </button>
            </div>
          </div>
        </div>

        {/* Weather Forecast Section */}
        <div className="bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white text-lg font-semibold mb-4">Prakiraan Cuaca</h3>
            <p className="text-gray-400 text-sm mb-4">Prediksi cuaca akurat untuk 18 jam ke depan</p>

            <div className="flex space-x-4 overflow-x-auto pb-4">
              {weatherForecast.map((forecast, index) => (
                <div key={index} className="flex-shrink-0 text-center">
                  <p className="text-gray-400 text-xs mb-1">{forecast.time}</p>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(forecast.condition)}
                    </div>
                    <p className="text-white text-sm font-semibold">{forecast.temp}°C</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {forecast.condition === 'rain' ? 'Hujan' :
                       forecast.condition === 'cloudy' ? 'Berawan' : 'Cerah'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black py-8 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>

            <div className="flex justify-center space-x-8 mb-6">
              <Link href="/about" className="text-gray-400 hover:text-white transition text-sm">
                About
              </Link>
              <Link href="/features" className="text-gray-400 hover:text-white transition text-sm">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition text-sm">
                Pricing
              </Link>
              <Link href="/gallery" className="text-gray-400 hover:text-white transition text-sm">
                Gallery
              </Link>
              <Link href="/team" className="text-gray-400 hover:text-white transition text-sm">
                Team
              </Link>
            </div>

            <div className="flex justify-center mb-6">
              <Link href="/contact" className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
                Contact Us
              </Link>
            </div>

            <div className="text-center text-gray-500 text-sm">
              © 2025 All Rights Reserved
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}