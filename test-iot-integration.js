// Test script to simulate IoT sensor data and test Firebase integration
// Run with: node test-iot-integration.js

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Test data matching the expected format
const sensorData = {
  device_id: "ESP32-001",
  timestamp: new Date().toISOString(),
  wind_m_s: 3.2,
  wind_kmh: 11.52,
  rainrate_mm_h: 0.4,
  temperature_C: 28.7,
  humidity_: 65.3,
  light_lux: 530.5,
  sol_voltage_V: 12.4,
  sol_current_mA: 210.7,
  sol_power_W: 2.61
};

// Function to send test data to the API
async function sendTestData() {
  try {
    // Change this to your actual deployed URL or use localhost for local testing
    const url = 'http://localhost:3000/api/iot/sensor-data';

    console.log('Sending test sensor data...');
    console.log('Data:', JSON.stringify(sensorData, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sensorData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Success! Data sent to Firebase');
      console.log('Response:', result);

      // Now test GET endpoint
      console.log('\nFetching recent data...');
      const getResponse = await fetch(url + '?limit=5');
      const getData = await getResponse.json();

      if (getResponse.ok && getData.data && getData.data.length > 0) {
        console.log('✅ Successfully retrieved data from Firebase');
        console.log(`Found ${getData.data.length} records`);
        console.log('Latest record:', getData.data[0]);
      }
    } else {
      console.error('❌ Error:', result);
    }
  } catch (error) {
    console.error('❌ Failed to send data:', error.message);
    console.log('\nMake sure:');
    console.log('1. Your Next.js server is running (npm run dev)');
    console.log('2. Firebase is properly configured with environment variables');
    console.log('3. You have internet connection for Firebase');
  }
}

// Function to simulate continuous sensor data
async function simulateContinuousData() {
  console.log('Starting continuous sensor simulation...');
  console.log('Sending data every 10 seconds. Press Ctrl+C to stop.\n');

  let count = 0;

  const sendData = async () => {
    count++;

    // Generate realistic variations in sensor data
    const data = {
      device_id: "ESP32-001",
      timestamp: new Date().toISOString(),
      wind_m_s: 3.2 + (Math.random() - 0.5) * 2,
      wind_kmh: 11.52 + (Math.random() - 0.5) * 5,
      rainrate_mm_h: Math.random() < 0.3 ? Math.random() * 5 : 0,
      temperature_C: 28.7 + (Math.random() - 0.5) * 4,
      humidity_: 65.3 + (Math.random() - 0.5) * 20,
      light_lux: 530.5 + (Math.random() - 0.5) * 200,
      sol_voltage_V: 12.4 + (Math.random() - 0.5) * 2,
      sol_current_mA: 210.7 + (Math.random() - 0.5) * 50,
      sol_power_W: 2.61 + (Math.random() - 0.5) * 1
    };

    try {
      const response = await fetch('http://localhost:3000/api/iot/sensor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log(`[${count}] ✅ Data sent at ${new Date().toLocaleTimeString()}`);
        console.log(`  Temp: ${data.temperature_C.toFixed(1)}°C, Humidity: ${data.humidity_.toFixed(1)}%, Wind: ${data.wind_kmh.toFixed(1)} km/h`);
      } else {
        console.log(`[${count}] ❌ Failed to send data`);
      }
    } catch (error) {
      console.log(`[${count}] ❌ Error: ${error.message}`);
    }
  };

  // Send initial data
  await sendData();

  // Set up interval to send data every 10 seconds
  setInterval(sendData, 10000);
}

// Main execution
async function main() {
  console.log('=== IoT Firebase Integration Test ===\n');
  console.log('Choose test mode:');
  console.log('1. Send single test data');
  console.log('2. Simulate continuous sensor data\n');

  const args = process.argv.slice(2);

  if (args.includes('--continuous') || args.includes('-c')) {
    await simulateContinuousData();
  } else {
    await sendTestData();
    console.log('\nTo simulate continuous data, run: node test-iot-integration.js --continuous');
  }
}

// Check if node-fetch is installed
try {
  require.resolve('node-fetch');
  main();
} catch(e) {
  console.error('node-fetch is not installed. Please run: npm install node-fetch');
}