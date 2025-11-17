import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { getSubscriptionInfo, formatPlanName, getPlanBadgeColor, SubscriptionInfo } from '../lib/subscription-utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products & Services', href: '/products' },
  { name: 'Artikel', href: '/articles' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    if (user) {
      getSubscriptionInfo(user).then(info => {
        setSubscriptionInfo(info);
      });
    } else {
      setSubscriptionInfo(null);
    }
  }, [user]);

  return (
    <header className="bg-primary sticky top-0 z-30 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <img src="/logo klimacek trans fix.png" alt="Klimacek Logo" className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full transition-transform hover:scale-105" />
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1 justify-center gap-7 items-center mx-auto" aria-label="Main navigation">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-textSecondary font-medium hover:text-accent transition-colors px-2 py-1 rounded focus:outline focus:ring-2 focus:ring-accent">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Info & Auth Buttons */}
        {user ? (
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* User Info with Subscription Badge */}
            <div className="flex flex-col gap-1 px-3 py-2 bg-white/10 rounded-lg text-textSecondary text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                <span className="font-medium">{user.email?.split('@')[0]}</span>
              </div>
              {subscriptionInfo && (
                <div className="flex items-center justify-center">
                  <span className={`${getPlanBadgeColor(subscriptionInfo.plan, subscriptionInfo.is_expired)} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                    {formatPlanName(subscriptionInfo.plan)}
                    {subscriptionInfo.is_expired && ' (Expired)'}
                  </span>
                </div>
              )}
            </div>
            {/* Logout Button */}
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link href="/dashboard" className="hidden md:inline-block bg-accent text-primary font-semibold px-5 py-2 rounded-full shadow hover:bg-secondary hover:text-textPrimary transition-colors flex-shrink-0 focus:outline focus:ring-2 focus:ring-accent">
            Dashboard Access
          </Link>
        )}
        {/* Mobile Hamburger */}
  <button className="md:hidden p-2 rounded focus:outline focus:ring-2 focus:ring-accent" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)}>
            <div className="absolute top-0 right-0 w-64 h-full bg-primary shadow-lg p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
              <button className="self-end mb-2 p-1 rounded focus:outline focus:ring-2 focus:ring-accent" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X size={28} />
              </button>

              {/* Mobile User Info */}
              {user && subscriptionInfo && (
                <div className="flex flex-col gap-2 px-3 py-3 bg-white/10 rounded-lg text-textSecondary">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-accent" />
                    <span className="font-medium text-sm">{user.email?.split('@')[0]}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`${getPlanBadgeColor(subscriptionInfo.plan, subscriptionInfo.is_expired)} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                      {formatPlanName(subscriptionInfo.plan)}
                      {subscriptionInfo.is_expired && ' (Expired)'}
                    </span>
                  </div>
                </div>
              )}

              <ul className="flex flex-col gap-4 mt-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="block text-lg text-textSecondary font-medium hover:text-accent px-2 py-1 rounded focus:outline focus:ring-2 focus:ring-accent" onClick={() => setMobileOpen(false)}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="mt-8 flex items-center justify-center gap-2 px-5 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full shadow hover:shadow-xl transition-all font-semibold focus:outline focus:ring-2 focus:ring-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link href="/dashboard" className="mt-8 bg-accent text-primary font-semibold px-5 py-2 rounded-full shadow hover:bg-secondary hover:text-textPrimary transition-colors focus:outline focus:ring-2 focus:ring-accent text-center" onClick={() => setMobileOpen(false)}>
                  Dashboard Access
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}