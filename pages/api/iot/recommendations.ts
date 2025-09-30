import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

interface SensorAnalysis {
  sensorType: string;
  data: Array<{
    timestamp: string;
    value: number;
    unit: string;
  }>;
  timeRange: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sensorType, sensorData, unit, timeRange = '24h' } = req.body;

    if (!sensorType || !sensorData || !Array.isArray(sensorData)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Get sensor type name in Indonesian
    const sensorTypeNames: { [key: string]: string } = {
      'temperatur': 'Temperatur/Suhu',
      'kelembapan': 'Kelembapan',
      'cahaya': 'Intensitas Cahaya',
      'solar-arus': 'Arus Solar Cell',
      'solar-tegangan': 'Tegangan Solar Cell',
      'solar-watt': 'Daya Solar Cell',
      'angin': 'Kecepatan Angin',
      'hujan': 'Curah Hujan'
    };

    const sensorName = sensorTypeNames[sensorType] || 'Sensor';

    // Calculate statistics from sensor data
    const values = sensorData.map((d: any) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length;
    const latest = values[values.length - 1] || 0;

    // Find time of max and min values
    const maxIndex = values.indexOf(max);
    const minIndex = values.indexOf(min);
    const maxTime = sensorData[maxIndex]?.timestamp || 'N/A';
    const minTime = sensorData[minIndex]?.timestamp || 'N/A';

    // Create context-aware prompt for Gemini
    const prompt = `
    Anda adalah ahli pertanian presisi yang menganalisis data sensor IoT untuk memberikan rekomendasi cerdas.

    Data Sensor: ${sensorName}
    Periode: ${timeRange}
    Unit Pengukuran: ${unit}

    Statistik Data:
    - Nilai Tertinggi: ${max.toFixed(2)} ${unit} pada ${maxTime}
    - Nilai Terendah: ${min.toFixed(2)} ${unit} pada ${minTime}
    - Nilai Rata-rata: ${avg.toFixed(2)} ${unit}
    - Nilai Terkini: ${latest.toFixed(2)} ${unit}

    Berikan analisis dan rekomendasi dalam format berikut:

    1. ANALISIS SINGKAT (2-3 kalimat):
    Jelaskan pola data sensor dan kondisi yang terdeteksi.

    2. PERINGATAN (jika ada kondisi ekstrem atau abnormal):
    Identifikasi kondisi kritis yang memerlukan perhatian segera.

    3. REKOMENDASI OPTIMALISASI (4-5 poin):
    Berikan saran praktis dan spesifik untuk optimalisasi berdasarkan data sensor.

    4. TINDAKAN YANG DISARANKAN:
    Langkah-langkah konkret yang harus diambil dalam 24 jam ke depan.

    Gunakan bahasa Indonesia yang profesional namun mudah dipahami.
    Fokus pada insights yang actionable dan relevan untuk pertanian modern.
    `;

    // Get AI recommendation from Gemini
    // Using gemini-1.5-flash-8b which is available in v1beta API
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the AI response into structured format
    const sections = text.split(/\d+\.\s+/);

    let analysis = '';
    let warnings: string[] = [];
    let recommendations: string[] = [];
    let actions: string[] = [];

    // Extract sections from AI response
    sections.forEach((section, index) => {
      const content = section.trim();
      if (content.includes('ANALISIS') || index === 1) {
        analysis = content.replace(/ANALISIS SINGKAT[:\s]*/i, '').trim();
      } else if (content.includes('PERINGATAN')) {
        const warningContent = content.replace(/PERINGATAN[:\s]*/i, '').trim();
        if (warningContent && warningContent.length > 10) {
          warnings.push(warningContent);
        }
      } else if (content.includes('REKOMENDASI')) {
        const recContent = content.replace(/REKOMENDASI OPTIMALISASI[:\s]*/i, '').trim();
        const recLines = recContent.split('\n').filter(line => line.trim().length > 5);
        recommendations = recLines.map(line => line.replace(/^[-•*]\s*/, '').trim());
      } else if (content.includes('TINDAKAN')) {
        const actionContent = content.replace(/TINDAKAN YANG DISARANKAN[:\s]*/i, '').trim();
        const actionLines = actionContent.split('\n').filter(line => line.trim().length > 5);
        actions = actionLines.map(line => line.replace(/^[-•*]\s*/, '').trim());
      }
    });

    // Ensure we have meaningful content
    if (!analysis) {
      analysis = `Berdasarkan data ${sensorName} selama ${timeRange}, terjadi variasi dengan nilai tertinggi ${max.toFixed(1)} ${unit} dan terendah ${min.toFixed(1)} ${unit}. Kondisi rata-rata berada pada ${avg.toFixed(1)} ${unit}.`;
    }

    if (recommendations.length === 0) {
      // Provide default recommendations based on sensor type
      recommendations = getDefaultRecommendations(sensorType, max, min, avg, unit);
    }

    // Check for extreme conditions
    if (sensorType === 'temperatur' && (max > 35 || min < 15)) {
      if (warnings.length === 0) {
        warnings.push(`Temperatur ekstrem terdeteksi! Tertinggi: ${max.toFixed(1)}°C, Terendah: ${min.toFixed(1)}°C`);
      }
    } else if (sensorType === 'kelembapan' && (min < 20 || max > 90)) {
      if (warnings.length === 0) {
        warnings.push(`Kelembapan ekstrem terdeteksi! Level terendah: ${min.toFixed(1)}%, tertinggi: ${max.toFixed(1)}%`);
      }
    }

    return res.status(200).json({
      success: true,
      analysis,
      warnings,
      recommendations,
      actions,
      statistics: {
        max,
        min,
        avg,
        latest,
        maxTime,
        minTime
      }
    });

  } catch (error: any) {
    console.error('Error generating recommendations:', error);

    // Fallback response if AI fails
    const { sensorType, sensorData, unit } = req.body;
    const values = sensorData?.map((d: any) => d.value) || [];
    const max = Math.max(...values) || 0;
    const min = Math.min(...values) || 0;
    const avg = values.length ? values.reduce((a: number, b: number) => a + b, 0) / values.length : 0;

    return res.status(200).json({
      success: true,
      analysis: `Data sensor menunjukkan variasi antara ${min.toFixed(1)} hingga ${max.toFixed(1)} ${unit} dengan rata-rata ${avg.toFixed(1)} ${unit}.`,
      warnings: [],
      recommendations: getDefaultRecommendations(sensorType, max, min, avg, unit),
      actions: ['Monitor kondisi sensor secara berkala', 'Catat perubahan signifikan'],
      statistics: { max, min, avg, latest: values[values.length - 1] || 0 }
    });
  }
}

function getDefaultRecommendations(sensorType: string, max: number, min: number, avg: number, unit: string): string[] {
  const recommendations: { [key: string]: string[] } = {
    'temperatur': [
      'Gunakan mulsa untuk menjaga stabilitas suhu tanah',
      'Pasang naungan jika suhu melebihi 35°C',
      'Tingkatkan ventilasi greenhouse saat suhu tinggi',
      'Monitor tanaman sensitif terhadap perubahan suhu'
    ],
    'kelembapan': [
      'Gunakan mulsa untuk menjaga kelembapan tanah',
      'Implementasikan sistem irigasi tetes untuk efisiensi air',
      'Monitor penyakit jamur saat kelembapan tinggi',
      'Sesuaikan jadwal penyiraman dengan tingkat kelembapan'
    ],
    'cahaya': [
      'Optimalkan posisi tanaman untuk mendapat cahaya maksimal',
      'Gunakan lampu tambahan jika intensitas cahaya rendah',
      'Pasang shade net jika cahaya terlalu intens',
      'Rotasi tanaman untuk paparan cahaya merata'
    ],
    'angin': [
      'Pasang windbreak untuk melindungi tanaman',
      'Perkuat penyangga tanaman saat angin kencang',
      'Monitor kelembapan tanah karena angin meningkatkan evaporasi',
      'Lindungi tanaman muda dari angin kencang'
    ],
    'hujan': [
      'Siapkan sistem drainase yang baik',
      'Lindungi tanaman dari hujan berlebihan',
      'Monitor genangan air di area tanam',
      'Sesuaikan jadwal pemupukan dengan curah hujan'
    ],
    'solar-arus': [
      'Periksa koneksi panel surya',
      'Bersihkan panel surya dari debu dan kotoran',
      'Monitor performa panel pada berbagai kondisi cuaca',
      'Optimalkan sudut panel untuk arus maksimal'
    ],
    'solar-tegangan': [
      'Monitor tegangan baterai secara berkala',
      'Periksa regulator charge controller',
      'Pastikan tidak ada drop tegangan pada kabel',
      'Kalibrasi sistem monitoring tegangan'
    ],
    'solar-watt': [
      'Optimalkan beban sesuai kapasitas daya',
      'Monitor efisiensi konversi energi',
      'Jadwalkan penggunaan peralatan saat produksi optimal',
      'Evaluasi kebutuhan ekspansi sistem'
    ]
  };

  return recommendations[sensorType] || [
    'Monitor data sensor secara berkala',
    'Catat anomali atau perubahan signifikan',
    'Lakukan kalibrasi sensor jika diperlukan',
    'Bandingkan dengan kondisi ideal untuk tanaman'
  ];
}