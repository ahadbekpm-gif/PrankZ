
export type Language = 'en';
export type PlanType = 'free' | 'starter_monthly' | 'pro_monthly' | 'unlimited_monthly' | 'starter_yearly' | 'pro_yearly' | 'unlimited_yearly';

export interface UserState {
  tokens: number;
  plan: PlanType;
  planExpiry: number | null;
}

export interface Preset {
  id: string;
  label: { [key in Language]: string };
  prompt: string;
  icon: string;
  cost: number;
  popular?: boolean;
  premium?: boolean;
}

export interface HistoryItem {
  id: string;
  original: string;
  generated: string;
  prompt: string;
  timestamp: number;
}

export interface Translation {
  [key: string]: {
    en: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  originalPrice?: string;
  tokens: number;
  popular: boolean;
  tag: string;
  color: string;
  link?: string;
  features: string[];
  description?: string;
  bestFor?: string;
}

export type AppStep = 'upload' | 'preset' | 'generating' | 'result';
