import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';
import { db } from '../lib/firebase';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import dynamic from 'next/dynamic';
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
  ChevronDown,
  Thermometer,
  Droplets,
  Zap,
  Battery,
  Wind,
  CloudDrizzle,
  Activity
} from 'lucide-react';

// Dynamic import for Leaflet to avoid SSR issues
const WeatherMap = dynamic(() => import('../components/WeatherMap'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full bg-gray-200">Loading map...</div>
});

interface StationData {
  name: string;
  value: number;
  unit: string;
  change: number;
  graph: number[];
  sensorType: string;
  icon?: any;
}

interface SensorData {
  device_id: string;
  timestamp: string;
  wind_m_s?: number;
  wind_kmh?: number;
  rainrate_mm_h?: number;
  temperature_C?: number;
  humidity_?: number;
  light_lux?: number;
  sol_voltage_V?: number;
  sol_current_mA?: number;
  sol_power_W?: number;
  server_timestamp?: any;
  received_at?: string;
}

interface WeatherForecast {
  time: string;
  temp: number;
  condition: 'rain' | 'cloudy' | 'sunny';
}

export default function WeatherStations() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState('Station - Surakarta');
  const [selectedCity, setSelectedCity] = useState('Surakarta');
  const [searchQuery, setSearchQuery] = useState('');
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [activeSensors, setActiveSensors] = useState(0);
  const [uptime, setUptime] = useState(99.9);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Convert sensor values to percentage (0-100%) based on typical ranges
  const convertToPercentage = (value: number, min: number, max: number): number => {
    if (!value) return 0;
    const percentage = ((value - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  // Calculate change from average
  const calculateChange = (current: number, history: number[]): number => {
    if (history.length === 0 || history.length === 1) return 0;
    const avg = history.reduce((a, b) => a + b, 0) / history.length;
    // Prevent division by zero and handle edge cases
    if (avg === 0 || !isFinite(avg)) return 0;
    const change = ((current - avg) / avg) * 100;
    // Return 0 if result is not finite
    return isFinite(change) ? change : 0;
  };

  // Generate station metrics from sensor data
  const generateMetrics = (): StationData[] => {
    if (!sensorData) {
      // Return default metrics if no data
      return [
        { name: 'Temperatur Suhu', value: 0, unit: '°C', change: 0, graph: [], sensorType: 'temperatur', icon: Thermometer },
        { name: 'Kelembapan', value: 0, unit: '%', change: 0, graph: [], sensorType: 'kelembapan', icon: Droplets },
        { name: 'Intensitas Cahaya', value: 0, unit: 'lux', change: 0, graph: [], sensorType: 'cahaya', icon: Sun },
        { name: 'Arus Solar cell', value: 0, unit: 'mA', change: 0, graph: [], sensorType: 'solar-arus', icon: Zap },
        { name: 'Tegangan Solar Cell', value: 0, unit: 'V', change: 0, graph: [], sensorType: 'solar-tegangan', icon: Battery },
        { name: 'Watt Solar Cell', value: 0, unit: 'W', change: 0, graph: [], sensorType: 'solar-watt', icon: Activity },
        { name: 'Kecepatan Angin', value: 0, unit: 'km/h', change: 0, graph: [], sensorType: 'angin', icon: Wind },
        { name: 'Curah Hujan', value: 0, unit: 'mm/h', change: 0, graph: [], sensorType: 'hujan', icon: CloudDrizzle }
      ];
    }

    // Create history graphs from historical data (last 7 readings)
    const tempHistory = historicalData.slice(-7).map(d => d.temperature_C || 0);
    const humidityHistory = historicalData.slice(-7).map(d => d.humidity_ || 0);
    const lightHistory = historicalData.slice(-7).map(d => d.light_lux || 0);
    const currentHistory = historicalData.slice(-7).map(d => d.sol_current_mA || 0);
    const voltageHistory = historicalData.slice(-7).map(d => d.sol_voltage_V || 0);
    const powerHistory = historicalData.slice(-7).map(d => d.sol_power_W || 0);
    const windHistory = historicalData.slice(-7).map(d => d.wind_kmh || 0);
    const rainHistory = historicalData.slice(-7).map(d => d.rainrate_mm_h || 0);

    return [
      {
        name: 'Temperatur Suhu',
        value: sensorData.temperature_C || 0,
        unit: '°C',
        change: calculateChange(sensorData.temperature_C || 0, tempHistory),
        graph: tempHistory,
        sensorType: 'temperatur',
        icon: Thermometer
      },
      {
        name: 'Kelembapan',
        value: sensorData.humidity_ || 0,
        unit: '%',
        change: calculateChange(sensorData.humidity_ || 0, humidityHistory),
        graph: humidityHistory,
        sensorType: 'kelembapan',
        icon: Droplets
      },
      {
        name: 'Intensitas Cahaya',
        value: sensorData.light_lux || 0,
        unit: 'lux',
        change: calculateChange(sensorData.light_lux || 0, lightHistory),
        graph: lightHistory,
        sensorType: 'cahaya',
        icon: Sun
      },
      {
        name: 'Arus Solar cell',
        value: sensorData.sol_current_mA || 0,
        unit: 'mA',
        change: calculateChange(sensorData.sol_current_mA || 0, currentHistory),
        graph: currentHistory,
        sensorType: 'solar-arus',
        icon: Zap
      },
      {
        name: 'Tegangan Solar Cell',
        value: sensorData.sol_voltage_V || 0,
        unit: 'V',
        change: calculateChange(sensorData.sol_voltage_V || 0, voltageHistory),
        graph: voltageHistory,
        sensorType: 'solar-tegangan',
        icon: Battery
      },
      {
        name: 'Watt Solar Cell',
        value: sensorData.sol_power_W || 0,
        unit: 'W',
        change: calculateChange(sensorData.sol_power_W || 0, powerHistory),
        graph: powerHistory,
        sensorType: 'solar-watt',
        icon: Activity
      },
      {
        name: 'Kecepatan Angin',
        value: sensorData.wind_kmh || 0,
        unit: 'km/h',
        change: calculateChange(sensorData.wind_kmh || 0, windHistory),
        graph: windHistory,
        sensorType: 'angin',
        icon: Wind
      },
      {
        name: 'Curah Hujan',
        value: sensorData.rainrate_mm_h || 0,
        unit: 'mm/h',
        change: calculateChange(sensorData.rainrate_mm_h || 0, rainHistory),
        graph: rainHistory,
        sensorType: 'hujan',
        icon: CloudDrizzle
      }
    ];
  };

  const stationMetrics = generateMetrics();

  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>([]);
  const [loadingForecast, setLoadingForecast] = useState(false);

  // City coordinates mapping - Only Surakarta has active sensors
  const cityCoordinates: { [key: string]: { lat: string; lon: string; hasData: boolean } } = {
    'Surakarta': { lat: '-7.5755', lon: '110.8243', hasData: true },
    'Bantul': { lat: '-7.8880', lon: '110.3293', hasData: false },
    'Gunung Kidul': { lat: '-7.9086', lon: '110.6059', hasData: false },
    'Kulon Progo': { lat: '-7.8237', lon: '110.1613', hasData: false },
    'Sleman': { lat: '-7.7056', lon: '110.3540', hasData: false },
    'Kota Yogyakarta': { lat: '-7.7956', lon: '110.3695', hasData: false }
  };

  const cities = Object.keys(cityCoordinates);

  // Fetch real weather forecast from API
  const fetchWeatherForecast = async (city?: string) => {
    setLoadingForecast(true);
    try {
      // Get coordinates based on selected city or use default (Yogyakarta)
      const coords = city && cityCoordinates[city]
        ? cityCoordinates[city]
        : { lat: '-7.7956', lon: '110.3695' };

      const response = await fetch(`/api/weather/forecast?lat=${coords.lat}&lon=${coords.lon}`);
      const data = await response.json();

      if (data.success && data.forecast) {
        setWeatherForecast(data.forecast);
      }
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    } finally {
      setLoadingForecast(false);
    }
  };

  // Fetch sensor data from Firebase Realtime Database
  useEffect(() => {
    if (!db) {
      console.warn('Firebase database not initialized');
      return;
    }

    // Reference to sensor_data in Firebase
    const sensorDataRef = ref(db, 'sensor_data');

    // Query to get the last 50 records
    const recentDataQuery = query(
      sensorDataRef,
      orderByChild('received_at'),
      limitToLast(50)
    );

    // Set up real-time listener
    const unsubscribe = onValue(recentDataQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray: SensorData[] = [];

        // Convert Firebase object to array
        Object.keys(data).forEach((key) => {
          dataArray.push({
            ...data[key],
            id: key
          });
        });

        // Sort by timestamp (most recent first)
        dataArray.sort((a, b) => {
          const timeA = new Date(a.received_at || a.timestamp || 0).getTime();
          const timeB = new Date(b.received_at || b.timestamp || 0).getTime();
          return timeB - timeA;
        });

        // Set the most recent data as current
        if (dataArray.length > 0) {
          setSensorData(dataArray[0]);
          setLastUpdate(new Date(dataArray[0].received_at || dataArray[0].timestamp));

          // Calculate active sensors (non-null values)
          const latestData = dataArray[0];
          let activeCount = 0;
          if (latestData.temperature_C !== null && latestData.temperature_C !== undefined) activeCount++;
          if (latestData.humidity_ !== null && latestData.humidity_ !== undefined) activeCount++;
          if (latestData.light_lux !== null && latestData.light_lux !== undefined) activeCount++;
          if (latestData.sol_voltage_V !== null && latestData.sol_voltage_V !== undefined) activeCount++;
          if (latestData.sol_current_mA !== null && latestData.sol_current_mA !== undefined) activeCount++;
          if (latestData.sol_power_W !== null && latestData.sol_power_W !== undefined) activeCount++;
          if (latestData.wind_kmh !== null && latestData.wind_kmh !== undefined) activeCount++;
          if (latestData.rainrate_mm_h !== null && latestData.rainrate_mm_h !== undefined) activeCount++;

          setActiveSensors(activeCount);

          // Calculate uptime (simplified - based on data availability)
          const totalRecords = dataArray.length;
          const validRecords = dataArray.filter(d => d.device_id && d.timestamp).length;
          const uptimePercentage = (validRecords / totalRecords) * 100;
          setUptime(Math.round(uptimePercentage * 10) / 10);
        }

        // Set historical data for graphs
        setHistoricalData(dataArray);
      } else {
        console.log('No sensor data available');
      }
    }, (error) => {
      console.error('Error fetching sensor data:', error);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Fetch forecast on mount and when location changes
  useEffect(() => {
    fetchWeatherForecast(selectedCity);
    // Refresh forecast every 30 minutes
    const interval = setInterval(() => fetchWeatherForecast(selectedCity), 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Format update interval
  const getUpdateInterval = (): string => {
    if (!lastUpdate) return 'N/A';
    const now = new Date();
    const diffMs = now.getTime() - lastUpdate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return '< 1 min';
    if (diffMins === 1) return '1 min';
    if (diffMins < 60) return `${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hr`;
  };

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
    <ProtectedRoute>
      <Head>
        <title>Stasiun Cuaca - Klimacek</title>
        <meta name="description" content="Monitor stasiun cuaca Klimacek di seluruh Indonesia" />
      </Head>

      <div className="min-h-screen relative bg-cover bg-center" style={{ backgroundImage: 'url(/images/background-main-image.jpg)' }}>

        {/* Navigation - Minimal */}
        <nav className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/50 to-transparent">
          <div className="px-4 py-3 flex items-center">
            <Link
              href="/"
              className="p-2 rounded-lg bg-black/30 hover:bg-black/50 transition backdrop-blur-sm"
              title="Back to Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
          </div>
        </nav>

        {/* Map Section */}
        <div className="relative">
          {/* City Selector - Floating on Map */}
          <div className="absolute top-4 right-4 z-30 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 sm:p-4 w-48 sm:w-56">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Kabupaten/Kota</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {cities.map((city) => {
                const hasData = cityCoordinates[city]?.hasData;
                return (
                  <button
                    key={city}
                    onClick={() => {
                      if (hasData) {
                        setSelectedCity(city);
                        setSelectedStation(`Station - ${city}`);
                      } else {
                        alert(`No active sensors in ${city}.\nOnly Surakarta station has real-time data.`);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition text-sm flex items-center justify-between ${
                      selectedCity === city
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : hasData
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!hasData && selectedCity !== city}
                  >
                    <span>{city}</span>
                    {hasData && (
                      <span className="w-2 h-2 bg-green-500 rounded-full" title="Active sensors"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map - Larger */}
          <div className="h-96 sm:h-[500px] md:h-[600px] bg-gray-200 relative">
            <WeatherMap
              latitude={selectedCity && cityCoordinates[selectedCity]
                ? parseFloat(cityCoordinates[selectedCity].lat)
                : -7.7956}
              longitude={selectedCity && cityCoordinates[selectedCity]
                ? parseFloat(cityCoordinates[selectedCity].lon)
                : 110.3695}
              stationName={selectedStation}
            />
          </div>
        </div>

        {/* Station Data Section */}
        <div className="bg-gray-800 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">
                {selectedStation}
              </h2>
              {sensorData && (
                <div className="flex items-center space-x-6 text-white text-sm">
                  <div>
                    <span className="font-bold">{activeSensors}/8</span>
                  </div>
                  <div>
                    <span className="font-bold">{uptime.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="font-bold">{getUpdateInterval()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Metrics Grid - All Sensors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {stationMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{metric.name}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">
                        {metric.value.toFixed(metric.unit === '°C' || metric.unit === 'V' || metric.unit === 'W' ? 1 : 0)}
                      </p>
                      <p className="text-sm text-gray-600">{metric.unit}</p>
                    </div>
                    {metric.icon && <metric.icon className="w-10 h-10 text-gray-300" />}
                  </div>
                  <div className="mb-3">
                    {metric.graph.length > 0 ? (
                      <div className="h-16">
                        {renderSparkline(metric.graph)}
                      </div>
                    ) : (
                      <div className="h-16 flex items-center justify-center text-xs text-gray-400 bg-gray-50 rounded">
                        {sensorData ? 'Collecting data...' : 'No data'}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => router.push(`/sensor-detail?sensorType=${metric.sensorType}`)}
                    className="w-full bg-gray-900 text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-800 transition font-medium"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons - Simplified */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  if (!sensorData) {
                    alert('No sensor data available to download');
                    return;
                  }

                  // Create CSV content
                  const headers = ['Sensor Name', 'Value', 'Unit', 'Type'];
                  const rows = stationMetrics.map(m => [
                    m.name,
                    m.value.toFixed(2),
                    m.unit,
                    m.sensorType
                  ]);

                  // Add metadata rows
                  const metadata = [
                    ['Station', selectedStation, '', ''],
                    ['Timestamp', new Date().toISOString(), '', ''],
                    ['Active Sensors', `${activeSensors}/8`, '', ''],
                    ['Uptime', `${uptime.toFixed(1)}%`, '', ''],
                    ['Last Update', getUpdateInterval(), '', ''],
                    [''], // Empty row
                    headers,
                    ...rows
                  ];

                  const csvContent = metadata.map(row => row.join(',')).join('\n');
                  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${selectedStation.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                className="px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Data
              </button>
              <button
                onClick={() => setShowSettingsModal(true)}
                className="px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm font-medium flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Weather Forecast Section - Compact */}
        <div className="bg-gray-900 py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Weather Forecast</h3>
              <button
                onClick={() => fetchWeatherForecast(selectedCity)}
                disabled={loadingForecast}
                className="text-xs text-gray-400 hover:text-white transition font-medium"
              >
                {loadingForecast ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {loadingForecast && weatherForecast.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
                {weatherForecast.slice(0, 12).map((forecast, index) => (
                  <div key={index} className="flex-shrink-0 text-center min-w-[80px]">
                    <p className="text-gray-400 text-xs mb-2">{forecast.time}</p>
                    <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition">
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(forecast.condition)}
                      </div>
                      <p className="text-white text-sm font-bold">{forecast.temp}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Settings Modal */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Settings</h3>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Refresh Interval Setting */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Refresh Interval
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      min="5"
                      max="300"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-sm text-gray-600">seconds</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    How often to refresh sensor data (5-300 seconds)
                  </p>
                </div>

                {/* Station Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Station
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{selectedStation}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activeSensors}/8 sensors active • {uptime.toFixed(1)}% uptime
                    </p>
                  </div>
                </div>

                {/* Additional Settings Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notifications
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Enable sensor alerts</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSettingsModal(false);
                    alert(`Settings saved!\n\nRefresh interval: ${refreshInterval} seconds`);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
}