import { User } from 'firebase/auth';

export interface SubscriptionInfo {
  plan: 'free_trial' | 'basic' | 'premium' | 'enterprise' | 'none';
  trial_expires_at?: number;
  created_at?: number;
  days_remaining?: number;
  is_active: boolean;
  is_expired: boolean;
}

/**
 * Get subscription information from user's custom claims
 */
export async function getSubscriptionInfo(user: User | null): Promise<SubscriptionInfo> {
  if (!user) {
    return {
      plan: 'none',
      is_active: false,
      is_expired: false
    };
  }

  try {
    // Force refresh to get latest custom claims
    const idTokenResult = await user.getIdTokenResult(true);
    const subscription = idTokenResult.claims.subscription as any;

    if (!subscription) {
      return {
        plan: 'none',
        is_active: false,
        is_expired: false
      };
    }

    // Check if trial is expired
    const now = Date.now();
    const isExpired = subscription.trial_expires_at ? now > subscription.trial_expires_at : false;

    // Calculate days remaining
    let daysRemaining = 0;
    if (subscription.trial_expires_at && !isExpired) {
      const msRemaining = subscription.trial_expires_at - now;
      daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));
    }

    return {
      plan: subscription.plan || 'none',
      trial_expires_at: subscription.trial_expires_at,
      created_at: subscription.created_at,
      days_remaining: daysRemaining,
      is_active: !isExpired,
      is_expired: isExpired
    };
  } catch (error) {
    console.error('Error getting subscription info:', error);
    return {
      plan: 'none',
      is_active: false,
      is_expired: false
    };
  }
}

/**
 * Format subscription plan name for display
 */
export function formatPlanName(plan: string): string {
  const planNames: { [key: string]: string } = {
    'free_trial': 'Free Tier Plan',
    'basic': 'Basic',
    'premium': 'Premium',
    'enterprise': 'Enterprise',
    'none': 'No Plan'
  };

  return planNames[plan] || 'Unknown';
}

/**
 * Get plan badge color
 */
export function getPlanBadgeColor(plan: string, isExpired: boolean): string {
  if (isExpired) return 'bg-red-500';

  const colors: { [key: string]: string } = {
    'free_trial': 'bg-yellow-500',
    'basic': 'bg-blue-500',
    'premium': 'bg-purple-500',
    'enterprise': 'bg-indigo-500',
    'none': 'bg-gray-500'
  };

  return colors[plan] || 'bg-gray-500';
}

/**
 * Check if user has access to a feature based on subscription
 */
export function hasFeatureAccess(
  subscriptionInfo: SubscriptionInfo,
  feature: 'basic' | 'premium' | 'enterprise'
): boolean {
  if (!subscriptionInfo.is_active || subscriptionInfo.is_expired) {
    return false;
  }

  const featureHierarchy = {
    'basic': ['free_trial', 'basic', 'premium', 'enterprise'],
    'premium': ['premium', 'enterprise'],
    'enterprise': ['enterprise']
  };

  return featureHierarchy[feature]?.includes(subscriptionInfo.plan) || false;
}

/**
 * Format expiry date
 */
export function formatExpiryDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
