import React, { useState, useEffect } from 'react';
import { Home, Plane, Settings, LogOut, Shield, Plus, CloudRain, Wind, Sun, Thermometer, Droplets, Battery, Activity, RefreshCw, MapPin, Wifi, WifiOff, Edit2, Trash2, Save, X, User, Mail, Phone, Lock, CheckCircle, AlertCircle, Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../lib/auth-context';
import { getAuth, updateProfile, updatePassword, sendEmailVerification } from 'firebase/auth';
import { db } from '../lib/firebase';
import { ref, onValue, query, limitToLast, set, remove, push } from 'firebase/database';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import dynamic from 'next/dynamic';
import TurnstileVerification from '../components/TurnstileVerification';

const DroneControl = dynamic(() => import('../components/drone-control'), {
  ssr: false
});

interface Station {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  lastUpdate?: string;
}

interface SensorData {
  id: string;
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
  received_at?: string;
}

export default function Dashboard() {
  const { logout, isAdmin, user } = useAuth();
  const [emailVerified, setEmailVerified] = useState(user?.emailVerified || false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [active, setActive] = useState<string>('dashboard');
  const router = useRouter();
  const [puzzleVerified, setPuzzleVerified] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Station management
  const [stations, setStations] = useState<Station[]>([]);
  const [showAddStation, setShowAddStation] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [newStation, setNewStation] = useState({ name: '', location: '' });

  // Sensor data
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // User settings
  const [userProfile, setUserProfile] = useState({
    displayName: '',
    email: user?.email || '',
    phone: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // Check user profile completion and email verification
  useEffect(() => {
    if (user) {
      setEmailVerified(user.emailVerified);
      // Load user profile from Firebase
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserProfile(prev => ({
            ...prev,
            displayName: data.displayName || user.displayName || '',
            phone: data.phone || ''
          }));
          // Check if profile is complete
          setProfileComplete(!!(data.displayName && data.phone && user.emailVerified));
        }
      });
    }
  }, [user]);

  // Load stations from Firebase
  useEffect(() => {
    if (!db) return;

    const stationsRef = ref(db, 'stations');
    const unsubscribe = onValue(stationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const stationsList: Station[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setStations(stationsList);
      } else {
        // No default stations - admin must add them
        setStations([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load sensor data
  useEffect(() => {
    if (!db) {
      console.warn('Firebase database not initialized');
      // Set default data when DB is not available
      setSensorData([
        {
          id: 'demo1',
          device_id: 'north-field',
          timestamp: new Date().toISOString(),
          temperature_C: 25.5,
          humidity_: 65,
          wind_kmh: 12.3,
          rainrate_mm_h: 0,
          light_lux: 45000,
          sol_voltage_V: 12.5,
          sol_current_mA: 850,
          sol_power_W: 10.6,
          received_at: new Date().toISOString()
        }
      ]);
      setLoading(false);
      setConnected(false);
      return;
    }

    const sensorDataRef = ref(db, 'sensor_data');
    const recentQuery = query(sensorDataRef, limitToLast(100));

    const unsubscribe = onValue(recentQuery, (snapshot) => {
      const data: SensorData[] = [];
      const val = snapshot.val();

      if (val) {
        Object.keys(val).forEach((key) => {
          data.push({
            id: key,
            ...val[key]
          } as SensorData);
        });

        data.sort((a, b) => {
          const timeA = new Date(a.timestamp || a.received_at || 0).getTime();
          const timeB = new Date(b.timestamp || b.received_at || 0).getTime();
          return timeB - timeA;
        });

        setLastUpdate(new Date());
      }

      setSensorData(data);
      setLoading(false);
      setConnected(true);
    }, (error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
      setConnected(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddStation = async () => {
    // Check if email is verified before allowing station addition
    if (!emailVerified) {
      setActive('settings');
      return;
    }

    if (!newStation.name || !newStation.location) return;

    const station: Station = {
      id: newStation.name.toLowerCase().replace(/\s+/g, '-'),
      name: newStation.name,
      location: newStation.location,
      status: 'inactive',
      lastUpdate: new Date().toISOString()
    };

    if (db) {
      const stationsRef = ref(db, `stations/${station.id}`);
      await set(stationsRef, station);
    }

    setStations([...stations, station]);
    setNewStation({ name: '', location: '' });
    setShowAddStation(false);
  };

  const handleDeleteStation = async (stationId: string) => {
    // Check if email is verified before allowing station deletion
    if (!emailVerified) {
      setActive('settings');
      return;
    }

    if (db) {
      const stationRef = ref(db, `stations/${stationId}`);
      await remove(stationRef);
    }
    setStations(stations.filter(s => s.id !== stationId));
  };

  const handleUpdateStation = async (station: Station) => {
    // Check if email is verified before allowing station updates
    if (!emailVerified) {
      setActive('settings');
      return;
    }

    if (db) {
      const stationRef = ref(db, `stations/${station.id}`);
      await set(stationRef, station);
    }
    setStations(stations.map(s => s.id === station.id ? station : s));
    setEditingStation(null);
  };

  const handleSaveSettings = async () => {
    setSettingsError('');
    setSettingsSaved(false);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setSettingsError('User not authenticated');
        return;
      }

      // Update display name if changed
      if (userProfile.displayName && userProfile.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: userProfile.displayName
        });
      }

      // Save user profile to database
      if (db) {
        const userRef = ref(db, `users/${currentUser.uid}`);
        await set(userRef, {
          displayName: userProfile.displayName,
          email: currentUser.email,
          phone: userProfile.phone,
          updatedAt: new Date().toISOString()
        });
      }

      // Update password if provided
      if (userProfile.newPassword && userProfile.confirmPassword) {
        if (userProfile.newPassword !== userProfile.confirmPassword) {
          setSettingsError('Passwords do not match');
          return;
        }
        if (userProfile.newPassword.length < 6) {
          setSettingsError('Password must be at least 6 characters');
          return;
        }
        await updatePassword(currentUser, userProfile.newPassword);
        // Clear password fields after successful update
        setUserProfile(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      }

      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);

      // Check if profile is now complete
      setProfileComplete(!!(userProfile.displayName && userProfile.phone && currentUser.emailVerified));
    } catch (error: any) {
      console.error('Error saving settings:', error);
      if (error.code === 'auth/requires-recent-login') {
        setSettingsError('Please log out and log in again to change your password');
      } else {
        setSettingsError(error.message || 'Failed to save settings');
      }
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        await sendEmailVerification(currentUser);
        setVerificationSent(true);
        setTimeout(() => setVerificationSent(false), 5000);
      }
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      setSettingsError('Failed to send verification email. Please try again.');
    }
  };

  const getLatestData = (stationId?: string) => {
    if (stationId) {
      return sensorData.find(d => d.device_id === stationId) || sensorData[0];
    }
    return sensorData[0];
  };

  const getChartData = (stationId?: string) => {
    const filteredData = stationId
      ? sensorData.filter(d => d.device_id === stationId)
      : sensorData;

    return filteredData
      .slice(0, 24)
      .reverse()
      .map(d => ({
        time: new Date(d.timestamp || d.received_at || '').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temperature: d.temperature_C,
        humidity: d.humidity_,
        wind: d.wind_kmh,
        rain: d.rainrate_mm_h
      }));
  };

  const renderContent = () => {
    // Check if profile is complete before allowing access to certain sections
    if (!profileComplete && active !== 'settings') {
      if (active === 'dashboard' || active === 'drone-control') {
        return (
          <div className="flex items-center justify-center min-h-[60vh] p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-800">Complete Your Profile</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Please complete your profile and verify your email to access this section.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  {userProfile.displayName ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="text-sm">Display Name {userProfile.displayName ? 'Added' : 'Required'}</span>
                </div>
                <div className="flex items-center gap-2">
                  {userProfile.phone ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="text-sm">Phone Number {userProfile.phone ? 'Added' : 'Required'}</span>
                </div>
                <div className="flex items-center gap-2">
                  {emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="text-sm">Email {emailVerified ? 'Verified' : 'Verification Required'}</span>
                </div>
              </div>
              <Button
                onClick={() => setActive('settings')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Go to Settings
              </Button>
            </div>
          </div>
        );
      }
    }

    switch(active) {
      case 'dashboard':
        const latestData = getLatestData();
        const chartData = getChartData();

        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Farm Overview</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Stations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold">{stations.filter(s => s.status === 'active').length}</div>
                    <p className="text-xs text-gray-500">of {stations.length} total</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Temperature</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-red-500" />
                      {latestData?.temperature_C?.toFixed(1) || '--'}°C
                    </div>
                    <p className="text-xs text-gray-500">Current reading</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Humidity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      {latestData?.humidity_?.toFixed(0) || '--'}%
                    </div>
                    <p className="text-xs text-gray-500">Current level</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Wind Speed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
                      <Wind className="w-5 h-5 text-gray-500" />
                      {latestData?.wind_kmh?.toFixed(1) || '--'} km/h
                    </div>
                    <p className="text-xs text-gray-500">Current speed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Weather Chart */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Weather Trends (24 Hours)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature (°C)" />
                      <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Station Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {stations.map(station => (
                  <Card key={station.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{station.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {station.location}
                          </CardDescription>
                        </div>
                        <Badge variant={station.status === 'active' ? 'default' : 'secondary'}>
                          {station.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {station.status === 'active' ? (
                            <Wifi className="w-4 h-4 text-green-500" />
                          ) : (
                            <WifiOff className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-sm text-gray-600">
                            {station.status === 'active' ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActive(station.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'drone':
        // Check if profile is complete before showing drone control
        if (!profileComplete) {
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Drone Control Center</h2>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-6 w-6 text-orange-400 mr-3" />
                    <div>
                      <p className="text-sm text-orange-700 font-medium">Complete Your Profile</p>
                      <p className="text-sm text-orange-600 mt-1">Please complete your profile and verify your email to access this section.</p>
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-gray-600">
                          {userProfile.displayName ? '✓' : '✗'} Display Name {userProfile.displayName ? 'Added' : 'Required'}
                        </p>
                        <p className="text-xs text-gray-600">
                          {userProfile.phone ? '✓' : '✗'} Phone Number {userProfile.phone ? 'Added' : 'Required'}
                        </p>
                        <p className="text-xs text-gray-600">
                          {emailVerified ? '✓' : '✗'} Email Verification {emailVerified ? 'Completed' : 'Required'}
                        </p>
                      </div>
                      <Button
                        onClick={() => setActive('settings')}
                        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Go to Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Drone Control Center</h2>
              <DroneControl />
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">User Settings</h2>

              {/* Profile Completion Status */}
              {!profileComplete && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Complete Your Profile</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please fill in all required information and verify your email to access all features.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6 max-w-2xl">
                {/* Email Verification Status */}
                {!emailVerified && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-blue-800">Email Verification Required</p>
                          <p className="text-sm text-blue-700">Verify your email to unlock all features</p>
                        </div>
                      </div>
                      <Button
                        onClick={handleSendVerificationEmail}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        Send Verification Email
                      </Button>
                    </div>
                    {verificationSent && (
                      <p className="text-sm text-green-600 mt-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Verification email sent! Check your inbox.
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Profile Information</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="displayName">
                        Display Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="displayName"
                        value={userProfile.displayName}
                        onChange={(e) => setUserProfile({...userProfile, displayName: e.target.value})}
                        placeholder="Your name"
                        className={!userProfile.displayName ? 'border-yellow-400' : ''}
                      />
                      {!userProfile.displayName && (
                        <p className="text-xs text-yellow-600 mt-1">Required for full access</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          disabled
                          className="bg-gray-50 pr-10"
                        />
                        {emailVerified ? (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        placeholder="+62 xxx-xxxx-xxxx"
                        className={!userProfile.phone ? 'border-yellow-400' : ''}
                      />
                      {!userProfile.phone && (
                        <p className="text-xs text-yellow-600 mt-1">Required for full access</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={userProfile.newPassword}
                        onChange={(e) => setUserProfile({...userProfile, newPassword: e.target.value})}
                        placeholder="Enter new password (min. 6 characters)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={userProfile.confirmPassword}
                        onChange={(e) => setUserProfile({...userProfile, confirmPassword: e.target.value})}
                        placeholder="Confirm new password"
                        className={
                          userProfile.confirmPassword && userProfile.newPassword !== userProfile.confirmPassword
                            ? 'border-red-400'
                            : ''
                        }
                      />
                      {userProfile.confirmPassword && userProfile.newPassword !== userProfile.confirmPassword && (
                        <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {settingsError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {settingsError}
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={
                      (userProfile.newPassword && userProfile.newPassword !== userProfile.confirmPassword) ||
                      (userProfile.newPassword && userProfile.newPassword.length < 6)
                    }
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  {settingsSaved && (
                    <p className="text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Settings saved successfully!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        // Individual station view
        const station = stations.find(s => s.id === active);
        if (station) {
          const stationData = getLatestData(station.id);
          const stationChartData = getChartData(station.id);

          return (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{station.name}</h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {station.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingStation(station)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStation(station.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Station Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Temperature</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl md:text-2xl font-bold">{stationData?.temperature_C?.toFixed(1) || '--'}°C</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Humidity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl md:text-2xl font-bold">{stationData?.humidity_?.toFixed(0) || '--'}%</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Wind Speed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl md:text-2xl font-bold">{stationData?.wind_kmh?.toFixed(1) || '--'} km/h</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Rain Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl md:text-2xl font-bold">{stationData?.rainrate_mm_h?.toFixed(1) || '--'} mm/h</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Station Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Station Data Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={stationChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="temperature" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Temperature (°C)" />
                        <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Humidity (%)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        }

        // Add Station View
        if (active === 'add-station') {
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Add New Weather Station</h2>

                <div className="max-w-full md:max-w-md space-y-4">
                  <div>
                    <Label htmlFor="station-name">Station Name</Label>
                    <Input
                      id="station-name"
                      value={newStation.name}
                      onChange={(e) => setNewStation({...newStation, name: e.target.value})}
                      placeholder="e.g., East Greenhouse"
                    />
                  </div>

                  <div>
                    <Label htmlFor="station-location">Location</Label>
                    <Input
                      id="station-location"
                      value={newStation.location}
                      onChange={(e) => setNewStation({...newStation, location: e.target.value})}
                      placeholder="e.g., Greenhouse Block D4"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleAddStation} className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Station
                    </Button>
                    <Button variant="outline" onClick={() => setActive('dashboard')}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return null;
    }
  };

  if (!puzzleVerified) {
    return (
      <ProtectedRoute>
        <TurnstileVerification
          onVerified={() => setPuzzleVerified(true)}
          onSkip={() => setPuzzleVerified(true)}
          action="dashboard_access"
          skipEnabled={true}
        />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-neutral-50 relative">
        {/* Mobile Menu Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className={`fixed lg:static inset-y-0 left-0 h-full w-64 bg-[#2ecc71] border-r border-green-300 shadow-md flex flex-col py-6 px-4 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="mb-8 flex justify-between items-center">
              <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="rounded-full mx-auto lg:mx-0" />
              <button
                className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1">
              <button
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-normal transition-all duration-150 text-left ${
                  active === 'dashboard' ? 'bg-white/80 text-green-900 shadow-sm' : 'hover:bg-green-100 text-green-900'
                }`}
                onClick={() => {
                  setActive('dashboard');
                  setSidebarOpen(false);
                }}
              >
                <Home className="w-5 h-5" />
                <span className="truncate font-normal">Dashboard</span>
              </button>

              <button
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-normal transition-all duration-150 text-left ${
                  !profileComplete ? 'opacity-50 cursor-not-allowed bg-gray-100' :
                  active === 'drone' ? 'bg-white/80 text-green-900 shadow-sm' : 'hover:bg-green-100 text-green-900'
                }`}
                onClick={() => {
                  if (!profileComplete) {
                    setActive('settings');
                  } else {
                    setActive('drone');
                  }
                }}
                title={!profileComplete ? 'Complete profile required' : 'Drone Control'}
              >
                <Plane className="w-5 h-5" />
                <span className="truncate font-normal">Drone Control</span>
                {!profileComplete && <AlertCircle className="w-4 h-4 ml-auto text-orange-500" />}
              </button>

              <div className="mt-3 mb-1 text-xs font-semibold uppercase tracking-wide text-green-100">Stasiun Cuaca</div>

              {stations.map((station) => (
                <button
                  key={station.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-normal transition-all duration-150 text-left ${
                    active === station.id ? 'bg-white/80 text-green-900 shadow-sm' : 'hover:bg-green-100 text-green-900'
                  }`}
                  onClick={() => {
                    setActive(station.id);
                    setSidebarOpen(false);
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${station.status === 'active' ? 'bg-green-600' : 'bg-gray-300'}`}></span>
                  <span className="truncate font-normal">{station.name}</span>
                </button>
              ))}

              <button
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-normal transition-all duration-150 text-left mt-3 ${
                  !emailVerified ? 'opacity-50 cursor-not-allowed bg-gray-100' :
                  active === 'add-station' ? 'bg-white/80 text-green-900 shadow-sm' : 'hover:bg-green-100 text-green-900'
                }`}
                onClick={() => {
                  if (!emailVerified) {
                    setActive('settings');
                  } else {
                    setActive('add-station');
                  }
                }}
                title={!emailVerified ? 'Email verification required' : 'Add new station'}
              >
                <Plus className="w-5 h-5" />
                <span className="truncate font-normal">Tambah Stasiun</span>
                {!emailVerified && <AlertCircle className="w-4 h-4 ml-auto text-orange-500" />}
              </button>
            </nav>

            <div className="p-4 border-t border-green-600/20 space-y-1 mt-auto">
              {/* User Profile Info */}
              <div className="mb-3 px-3 py-2 bg-white/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {userProfile.displayName || 'Set Your Name'}
                    </p>
                    <p className="text-green-100 text-xs truncate">{user?.email}</p>
                  </div>
                  {!emailVerified && (
                    <span title="Email not verified">
                      <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    </span>
                  )}
                </div>
              </div>

              {isAdmin && (
                <button
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm w-full transition-all duration-150 text-left bg-yellow-500/20 hover:bg-yellow-500/30 text-white"
                  onClick={() => router.push('/admin')}
                >
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Admin Panel</span>
                </button>
              )}

              <button
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm w-full transition-all duration-150 text-left ${
                  active === 'settings' ? 'bg-white text-green-800 shadow-lg' : 'hover:bg-white/20 text-white'
                }`}
                onClick={() => {
                  setActive('settings');
                  setSidebarOpen(false);
                }}
              >
                <Settings className="w-4 h-4" />
                <span className="font-medium">Settings</span>
                {!profileComplete && (
                  <span className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                )}
              </button>

              <button
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 text-white w-full transition-all duration-150 text-left"
                onClick={() => logout()}
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-green-600 text-white rounded-lg shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-xl">Loading dashboard data...</div>
              </div>
            ) : (
              renderContent()
            )}
          </main>
        </div>

        {/* Edit Station Modal */}
        {editingStation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Edit Station</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Station Name</Label>
                  <Input
                    id="edit-name"
                    value={editingStation.name}
                    onChange={(e) => setEditingStation({...editingStation, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={editingStation.location}
                    onChange={(e) => setEditingStation({...editingStation, location: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    className="w-full border rounded-md p-2"
                    value={editingStation.status}
                    onChange={(e) => setEditingStation({...editingStation, status: e.target.value as 'active' | 'inactive'})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button onClick={() => handleUpdateStation(editingStation)} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingStation(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}