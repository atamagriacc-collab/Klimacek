import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { useRouter } from 'next/router';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Check if Firebase config is valid
const hasValidFirebaseConfig = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

let app: any = null;
let auth: any = null;

// Initialize Firebase only if config is valid
if (hasValidFirebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase Auth initialization failed:', error);
    // Continue without auth - allows the app to run
  }
} else {
  console.warn('Firebase configuration is missing or incomplete. Auth features will be disabled.');
}

// Initialize Analytics (only in browser and if app is initialized)
if (typeof window !== 'undefined' && app) {
  isSupported().then((supported) => {
    if (supported) {
      try {
        getAnalytics(app);
      } catch (error) {
        console.warn('Analytics initialization failed:', error);
      }
    }
  });
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If auth is not initialized, set loading to false and return
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      // Check if user is admin using custom claims
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const adminClaim = idTokenResult.claims.admin === true || idTokenResult.claims.admin === 'true';
          setIsAdmin(adminClaim);

          // Fallback to email check for backward compatibility
          if (!adminClaim && user.email === 'admin@atamagri.com') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          // Fallback to email check
          if (user.email === 'admin@atamagri.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase Auth is not configured. Please check your environment variables.');
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase Auth is not configured. Please check your environment variables.');
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const createUser = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase Auth is not configured. Please check your environment variables.');
    }
    try {
      // Store current user info
      const currentUser = auth.currentUser;

      // Create new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Sign out the newly created user
      await signOut(auth);

      // If there was a current user (admin), sign them back in
      // Note: In production, use Firebase Admin SDK via Cloud Functions instead
      if (currentUser && currentUser.email) {
        // Admin will need to re-authenticate after creating a user
        // This is a limitation of client-side user creation
        router.push('/');
      }

    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) {
      router.push('/login');
      return;
    }
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signUp, createUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};