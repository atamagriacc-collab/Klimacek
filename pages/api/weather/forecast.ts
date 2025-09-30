import type { NextApiRequest, NextApiResponse } from 'next';

interface WeatherForecast {
  time: string;
  temp: number;
  condition: 'rain' | 'cloudy' | 'sunny';
  description: string;
  humidity: number;
  windSpeed: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { lat, lon } = req.query;

    // Default coordinates (Yogyakarta, Indonesia)
    const latitude = lat || '-7.7956';
    const longitude = lon || '110.3695';

    // Use Open-Meteo API (completely free, no API key needed)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FJakarta&forecast_days=2`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();

    // Process the forecast data (get next 18 hours)
    const forecasts: WeatherForecast[] = [];
    const now = new Date();
    const currentHour = now.getHours();

    // Find the current hour index in the API response
    let startIndex = 0;
    for (let i = 0; i < data.hourly.time.length; i++) {
      const forecastDate = new Date(data.hourly.time[i]);
      if (forecastDate.getHours() === currentHour && forecastDate.getDate() === now.getDate()) {
        startIndex = i;
        break;
      }
    }

    // Get next 18 hours of forecast
    for (let i = 0; i < 18 && (startIndex + i) < data.hourly.time.length; i++) {
      const index = startIndex + i;
      const forecastTime = new Date(data.hourly.time[index]);
      const weatherCode = data.hourly.weather_code[index];
      const temp = data.hourly.temperature_2m[index];
      const humidity = data.hourly.relative_humidity_2m[index];
      const windSpeed = data.hourly.wind_speed_10m[index];
      const precipitation = data.hourly.precipitation[index];

      // Map WMO weather codes to conditions
      let condition: 'rain' | 'cloudy' | 'sunny' = 'sunny';
      let description = 'Cerah';

      if (weatherCode === 0) {
        condition = 'sunny';
        description = 'Cerah';
      } else if (weatherCode >= 1 && weatherCode <= 3) {
        condition = 'cloudy';
        description = weatherCode === 1 ? 'Cerah sebagian' : weatherCode === 2 ? 'Berawan sebagian' : 'Berawan';
      } else if (weatherCode >= 45 && weatherCode <= 48) {
        condition = 'cloudy';
        description = 'Berkabut';
      } else if (weatherCode >= 51 && weatherCode <= 67) {
        condition = 'rain';
        description = 'Gerimis';
      } else if (weatherCode >= 71 && weatherCode <= 77) {
        condition = 'rain';
        description = 'Bersalju';
      } else if (weatherCode >= 80 && weatherCode <= 99) {
        condition = 'rain';
        description = 'Hujan';
      }

      forecasts.push({
        time: `${forecastTime.getHours().toString().padStart(2, '0')}:00`,
        temp: Math.round(temp),
        condition,
        description,
        humidity: Math.round(humidity),
        windSpeed: Math.round(windSpeed * 10) / 10
      });
    }

    return res.status(200).json({
      success: true,
      forecast: forecasts,
      source: 'open-meteo',
      location: `${latitude}, ${longitude}`
    });

  } catch (error: any) {
    console.error('Error fetching weather forecast:', error);

    // Return fallback forecast on error
    return res.status(200).json({
      success: true,
      forecast: generateFallbackForecast(),
      source: 'fallback',
      error: error.message
    });
  }
}

// Fallback forecast generator based on simple patterns
function generateFallbackForecast(): WeatherForecast[] {
  const forecasts: WeatherForecast[] = [];
  const baseTemp = 28;
  const now = new Date();

  for (let i = 0; i < 18; i++) {
    const hour = new Date(now.getTime() + i * 3600000);
    const hourNum = hour.getHours();
    const timeStr = `${hourNum.toString().padStart(2, '0')}:00`;

    // Simple temperature variation based on time of day
    const tempVariation = Math.sin((hourNum - 6) * Math.PI / 12) * 5;
    const temp = Math.round(baseTemp + tempVariation);

    // Simple weather pattern
    let condition: 'rain' | 'cloudy' | 'sunny';
    let description: string;

    if (hourNum >= 14 && hourNum <= 17) {
      condition = i % 2 === 0 ? 'rain' : 'cloudy';
      description = condition === 'rain' ? 'Hujan ringan' : 'Berawan';
    } else if (hourNum >= 6 && hourNum <= 9) {
      condition = 'sunny';
      description = 'Cerah';
    } else {
      condition = i % 2 === 0 ? 'cloudy' : 'sunny';
      description = condition === 'cloudy' ? 'Berawan' : 'Cerah';
    }

    forecasts.push({
      time: timeStr,
      temp,
      condition,
      description,
      humidity: 60 + Math.round(Math.random() * 20),
      windSpeed: 5 + Math.random() * 5
    });
  }

  return forecasts;
}