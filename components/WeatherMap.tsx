import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  stationName: string;
}

// Exact sensor location address
const SENSOR_LOCATION = {
  lat: -7.5608,
  lng: 110.8356,
  address: 'Daratan, RT.02/RW.06, Senden, Tohudan, Kec. Colomadu, Kabupaten Karanganyar, Jawa Tengah 57173'
};

// Component to update map center when coordinates change
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function WeatherMap({ latitude, longitude, stationName }: WeatherMapProps) {
  const position: [number, number] = [latitude, longitude];
  const sensorPosition: [number, number] = [SENSOR_LOCATION.lat, SENSOR_LOCATION.lng];

  // Check if this is Surakarta station
  const isSurakarta = stationName.toLowerCase().includes('surakarta');

  return (
    <MapContainer
      center={isSurakarta ? sensorPosition : position}
      zoom={isSurakarta ? 14 : 13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="z-10"
    >
      <ChangeView center={isSurakarta ? sensorPosition : position} zoom={isSurakarta ? 14 : 13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Surakarta Coverage Area - Only show for Surakarta */}
      {isSurakarta && (
        <>
          {/* Large coverage circle for Surakarta region */}
          <Circle
            center={position}
            radius={8000} // 8km radius
            pathOptions={{
              color: '#2ecc71',
              fillColor: '#2ecc71',
              fillOpacity: 0.15,
              weight: 2,
              dashArray: '5, 5'
            }}
          />

          {/* Actual sensor location marker */}
          <CircleMarker
            center={sensorPosition}
            radius={10}
            pathOptions={{
              color: '#e74c3c',
              fillColor: '#e74c3c',
              fillOpacity: 0.8,
              weight: 3
            }}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <strong className="text-base font-bold text-gray-900">Sensor Station Location</strong>
                <div className="mt-2 text-sm text-gray-700">
                  <p className="font-medium">📍 Address:</p>
                  <p className="mt-1">{SENSOR_LOCATION.address}</p>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Coordinates: {SENSOR_LOCATION.lat.toFixed(6)}, {SENSOR_LOCATION.lng.toFixed(6)}</p>
                </div>
                <div className="mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  ✓ Active Sensor Station
                </div>
              </div>
            </Popup>
          </CircleMarker>
        </>
      )}

      {/* General marker for non-Surakarta cities */}
      {!isSurakarta && (
        <Marker position={position}>
          <Popup>
            <strong>{stationName}</strong>
            <br />
            <span className="text-gray-500 text-sm">No active sensors</span>
            <br />
            Lat: {latitude.toFixed(4)}
            <br />
            Lon: {longitude.toFixed(4)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}