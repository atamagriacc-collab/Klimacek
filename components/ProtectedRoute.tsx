import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth-context';
import { Loader2, Lock } from 'lucide-react';

/**
 * ProtectedRoute HOC - Melindungi halaman dari akses tanpa autentikasi
 * Redirect ke /login jika user belum login
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!loading) {
      if (!user) {
        // User is not authenticated, redirect to login
        router.replace('/login');
      } else {
        // User is authenticated
        setAuthorized(true);
      }
    }
  }, [user, loading, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Memuat...</p>
        </div>
      </div>
    );
  }

  // Show access denied message (briefly shown before redirect)
  if (!loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-6">
            Anda harus login terlebih dahulu untuk mengakses halaman ini.
          </p>
          <p className="text-sm text-gray-500">Mengalihkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  // Render protected content only if authorized
  return authorized ? <>{children}</> : null;
}