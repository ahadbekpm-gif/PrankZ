
export type Language = 'en';
export type PlanType = 'free' | 'weekly' | 'monthly' | 'yearly';

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

export type AppStep = 'upload' | 'preset' | 'generating' | 'result';
