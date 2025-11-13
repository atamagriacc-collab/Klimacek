import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../lib/firebase';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
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
  Youtube,
  Loader2,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import * as XLSX from 'xlsx';

interface SensorDataPoint {
  time: string;
  value: number;
  timestamp: string;
}

interface Recommendation {
  analysis: string;
  warnings: string[];
  recommendations: string[];
  actions: string[];
  statistics: {
    max: number;
    min: number;
    avg: number;
    latest: number;
    maxTime?: string;
    minTime?: string;
  };
}

interface FirebaseSensorData {
  device_id: string;
  timestamp: string;
  temperature_C?: number;
  humidity_?: number;
  light_lux?: number;
  sol_voltage_V?: number;
  sol_current_mA?: number;
  sol_power_W?: number;
  wind_kmh?: number;
  rainrate_mm_h?: number;
  received_at?: string;
}

export default function SensorDetail() {
  const router = useRouter();
  const { sensorType = 'kelembapan' } = router.query;
  const [timeInterval, setTimeInterval] = useState('24h');
  const [sensorData, setSensorData] = useState<SensorDataPoint[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Map sensor types to Firebase field names
  const getSensorField = (type: string): string => {
    const fieldMap: { [key: string]: string } = {
      'temperatur': 'temperature_C',
      'kelembapan': 'humidity_',
      'cahaya': 'light_lux',
      'solar-arus': 'sol_current_mA',
      'solar-tegangan': 'sol_voltage_V',
      'solar-watt': 'sol_power_W',
      'angin': 'wind_kmh',
      'hujan': 'rainrate_mm_h'
    };
    return fieldMap[type as string] || 'temperature_C';
  };

  // Get sensor unit
  const getSensorUnit = (type: string): string => {
    const unitMap: { [key: string]: string } = {
      'temperatur': '°C',
      'kelembapan': '%',
      'cahaya': 'lux',
      'solar-arus': 'mA',
      'solar-tegangan': 'V',
      'solar-watt': 'W',
      'angin': 'km/h',
      'hujan': 'mm/h'
    };
    return unitMap[type as string] || '';
  };

  // Get sensor title
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

  // Get Y-axis domain based on sensor type
  const getYAxisDomain = (type: string, data: SensorDataPoint[]): [number, number] => {
    if (!data || data.length === 0) return [0, 100];

    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;

    const domainMap: { [key: string]: [number, number] } = {
      'temperatur': [Math.floor(min - padding), Math.ceil(max + padding)],
      'kelembapan': [0, 100],
      'cahaya': [0, Math.ceil(max + padding)],
      'solar-arus': [0, Math.ceil(max + padding)],
      'solar-tegangan': [0, Math.ceil(max + padding)],
      'solar-watt': [0, Math.ceil(max + padding)],
      'angin': [0, Math.ceil(max + padding)],
      'hujan': [0, Math.ceil(max + padding)]
    };

    return domainMap[type as string] || [Math.floor(min - padding), Math.ceil(max + padding)];
  };

  // Fetch data from Firebase
  useEffect(() => {
    if (!db || !sensorType) {
      setLoading(false);
      return;
    }

    const sensorDataRef = ref(db, 'sensor_data');
    const limit = timeInterval === '24h' ? 288 : 2016; // 24h: every 5 min, 7d: every 5 min

    const recentDataQuery = query(
      sensorDataRef,
      orderByChild('received_at'),
      limitToLast(limit)
    );

    const unsubscribe = onValue(recentDataQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray: FirebaseSensorData[] = [];

        Object.keys(data).forEach((key) => {
          dataArray.push(data[key]);
        });

        // Sort by timestamp
        dataArray.sort((a, b) => {
          const timeA = new Date(a.received_at || a.timestamp || 0).getTime();
          const timeB = new Date(b.received_at || b.timestamp || 0).getTime();
          return timeA - timeB;
        });

        // Extract sensor values based on type
        const sensorField = getSensorField(sensorType as string);
        const chartData: SensorDataPoint[] = [];

        // Filter data based on time interval
        const now = new Date();
        const cutoffTime = timeInterval === '24h'
          ? new Date(now.getTime() - 24 * 60 * 60 * 1000)
          : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        dataArray.forEach((item) => {
          const timestamp = new Date(item.received_at || item.timestamp);
          if (timestamp >= cutoffTime) {
            const value = (item as any)[sensorField];
            if (value !== undefined && value !== null) {
              const hours = timestamp.getHours();
              const minutes = timestamp.getMinutes();
              const timeStr = timeInterval === '24h'
                ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                : `${timestamp.getDate()}/${timestamp.getMonth() + 1} ${hours}:00`;

              chartData.push({
                time: timeStr,
                value: parseFloat(value),
                timestamp: timestamp.toISOString()
              });
            }
          }
        });

        // Aggregate data if too many points
        let finalData = chartData;
        if (timeInterval === '7d' && chartData.length > 168) {
          // Aggregate to hourly data for 7-day view
          const hourlyData: { [key: string]: { sum: number; count: number; timestamp: string } } = {};

          chartData.forEach(point => {
            const date = new Date(point.timestamp);
            const hourKey = `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;

            if (!hourlyData[hourKey]) {
              hourlyData[hourKey] = { sum: 0, count: 0, timestamp: point.timestamp };
            }
            hourlyData[hourKey].sum += point.value;
            hourlyData[hourKey].count++;
          });

          finalData = Object.keys(hourlyData).map(key => ({
            time: key,
            value: hourlyData[key].sum / hourlyData[key].count,
            timestamp: hourlyData[key].timestamp
          }));
        }

        setSensorData(finalData);

        // Set current value and last update
        if (finalData.length > 0) {
          setCurrentValue(finalData[finalData.length - 1].value);
          setLastUpdate(new Date(finalData[finalData.length - 1].timestamp));
        }

        // Get AI recommendations
        if (finalData.length > 0) {
          fetchRecommendations(finalData);
        }
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching sensor data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sensorType, timeInterval]);

  // Fetch AI recommendations
  const fetchRecommendations = async (data: SensorDataPoint[]) => {
    setLoadingRecommendations(true);
    try {
      const response = await fetch('/api/iot/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sensorType,
          sensorData: data.map(d => ({
            timestamp: d.time,
            value: d.value
          })),
          unit: getSensorUnit(sensorType as string),
          timeRange: timeInterval
        })
      });

      if (response.ok) {
        const recommendations = await response.json();
        setRecommendation(recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Download data as Excel
  const handleDownload = () => {
    // Create worksheet data
    const worksheetData = [];

    // Add header info
    worksheetData.push(['Klimacek - Data Sensor']);
    worksheetData.push([]);
    worksheetData.push(['Jenis Sensor:', getSensorTitle()]);
    worksheetData.push(['Satuan:', getSensorUnit(sensorType as string)]);
    worksheetData.push(['Periode:', timeInterval === '24h' ? '24 Jam Terakhir' : '7 Hari Terakhir']);
    worksheetData.push(['Tanggal Export:', new Date().toLocaleString('id-ID')]);
    worksheetData.push([]);

    // Add statistics if available
    if (recommendation?.statistics) {
      worksheetData.push(['Statistik Data']);
      worksheetData.push(['Nilai Minimum:', recommendation.statistics.min.toFixed(2), getSensorUnit(sensorType as string)]);
      worksheetData.push(['Nilai Maksimum:', recommendation.statistics.max.toFixed(2), getSensorUnit(sensorType as string)]);
      worksheetData.push(['Nilai Rata-rata:', recommendation.statistics.avg.toFixed(2), getSensorUnit(sensorType as string)]);
      worksheetData.push(['Nilai Terkini:', recommendation.statistics.latest.toFixed(2), getSensorUnit(sensorType as string)]);
      worksheetData.push([]);
    }

    // Add data table header
    worksheetData.push(['Waktu', 'Nilai', 'Satuan', 'Timestamp']);

    // Add sensor data
    sensorData.forEach(point => {
      worksheetData.push([
        point.time,
        point.value.toFixed(2),
        getSensorUnit(sensorType as string),
        new Date(point.timestamp).toLocaleString('id-ID')
      ]);
    });

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // Set column widths
    ws['!cols'] = [
      { wch: 20 },  // Waktu
      { wch: 15 },  // Nilai
      { wch: 10 },  // Satuan
      { wch: 25 }   // Timestamp
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Sensor');

    // Generate filename
    const filename = `Klimacek_${getSensorTitle()}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  // Format time for display
  const formatUpdateTime = (date: Date | null): string => {
    if (!date) return 'N/A';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;

    return date.toLocaleDateString();
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

        {/* Navigation - Minimal */}
        <nav className="relative z-20 px-4 py-3">
          <Link
            href="/weather-stations"
            className="inline-flex items-center gap-2 p-2 rounded-lg bg-black/30 hover:bg-black/50 transition backdrop-blur-sm text-white"
            title="Back to Weather Station"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-sm font-medium hidden sm:inline">Back to Weather Station</span>
          </Link>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 py-8">
          <div className="max-w-6xl mx-auto px-8">
            {/* Chart Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Header with current value */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{getSensorTitle()}</h1>
                  <p className="text-sm text-gray-500 mt-1">Last update: {formatUpdateTime(lastUpdate)}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-gray-400" />
                    <span className="text-3xl font-bold text-gray-900">
                      {currentValue.toFixed(1)}
                    </span>
                    <span className="text-lg text-gray-600">
                      {getSensorUnit(sensorType as string)}
                    </span>
                  </div>
                  {recommendation?.statistics && (
                    <div className="flex items-center space-x-2 mt-1">
                      {currentValue > recommendation.statistics.avg ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-500">
                        {Math.abs(currentValue - recommendation.statistics.avg).toFixed(1)} from avg
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chart */}
              <div className="mb-8">
                {loading ? (
                  <div className="flex items-center justify-center h-96">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : sensorData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={sensorData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="time"
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280', fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280' }}
                        domain={getYAxisDomain(sensorType as string, sensorData)}
                        label={{
                          value: getSensorUnit(sensorType as string),
                          angle: -90,
                          position: 'insideLeft',
                          style: { fill: '#6b7280' }
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                        formatter={(value: any) => [
                          `${parseFloat(value).toFixed(2)} ${getSensorUnit(sensorType as string)}`,
                          getSensorTitle()
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-400">
                    No data available for the selected period
                  </div>
                )}
              </div>

              {/* Statistics */}
              {recommendation?.statistics && (
                <div className="grid grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Minimum</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {recommendation.statistics.min.toFixed(1)} {getSensorUnit(sensorType as string)}
                    </p>
                    {recommendation.statistics.minTime && (
                      <p className="text-xs text-gray-400">{recommendation.statistics.minTime}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Maximum</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {recommendation.statistics.max.toFixed(1)} {getSensorUnit(sensorType as string)}
                    </p>
                    {recommendation.statistics.maxTime && (
                      <p className="text-xs text-gray-400">{recommendation.statistics.maxTime}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Average</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {recommendation.statistics.avg.toFixed(1)} {getSensorUnit(sensorType as string)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {recommendation.statistics.latest.toFixed(1)} {getSensorUnit(sensorType as string)}
                    </p>
                  </div>
                </div>
              )}

              {/* Recommendations Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  Rekomendasi Keputusan
                  {loadingRecommendations && (
                    <Loader2 className="w-5 h-5 ml-2 animate-spin text-gray-400" />
                  )}
                </h2>

                {recommendation ? (
                  <div className="space-y-6">
                    {/* Analysis */}
                    {recommendation.analysis && (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-5">
                        <p className="text-gray-800 leading-relaxed text-base font-medium">
                          {recommendation.analysis}
                        </p>
                      </div>
                    )}

                    {/* Warnings */}
                    {recommendation.warnings && recommendation.warnings.length > 0 && (
                      <div className="space-y-3">
                        {recommendation.warnings.map((warning, index) => (
                          <div key={index} className="flex items-start space-x-3 bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg shadow-sm">
                            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-800 leading-relaxed">{warning}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Recommendations */}
                    {recommendation.recommendations && recommendation.recommendations.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Leaf className="w-5 h-5 mr-2 text-green-600" />
                          Tips Optimalisasi
                        </h3>
                        <ul className="space-y-3">
                          {recommendation.recommendations.map((tip, index) => (
                            <li key={index} className="flex items-start group">
                              <span className="text-green-600 mr-3 text-xl font-bold flex-shrink-0">✓</span>
                              <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors">
                                  {tip}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    {recommendation.actions && recommendation.actions.length > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-blue-600" />
                          Tindakan Disarankan (dalam 24 jam ke depan)
                        </h3>
                        <ul className="space-y-3">
                          {recommendation.actions.map((action, index) => (
                            <li key={index} className="flex items-start group">
                              <span className="text-blue-600 mr-3 text-xl font-bold flex-shrink-0">→</span>
                              <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors">
                                  {action}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : !loadingRecommendations && (
                  <p className="text-gray-500">Loading recommendations...</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setTimeInterval(timeInterval === '24h' ? '7d' : '24h')}
                  className="px-6 py-3 bg-white border-2 border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition flex items-center space-x-2"
                >
                  <Clock className="w-5 h-5" />
                  <span>{timeInterval === '24h' ? 'Last 24 Hours' : 'Last 7 Days'}</span>
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