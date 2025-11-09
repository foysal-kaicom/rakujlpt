import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BusinessSettings {
//   id: number;
  business_name: string;
  business_email: string;
  business_phone: string;
  bkash_number: string;
  website_url: string;
  certificate_amount: string;
  address: string;
  bin_number: string;
  tin_number: string;
  trade_license: string;
  legal_docs: string | null;
  certification_docs: string;
  authorized_docs: string;
  logo: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
  instagram_url: string;
}

interface BusinessSettingsStore {
  settings: BusinessSettings | null;
  setSettings: (data: BusinessSettings) => void;
  clearSettings: () => void;
}

export const useBusinessSettingsStore = create<BusinessSettingsStore>()(
  persist(
    (set) => ({
      settings: null,
      setSettings: (data) => set({ settings: data }),
      clearSettings: () => set({ settings: null }),
    }),
    {
      name: 'business-settings', // key in localStorage
    }
  )
);
