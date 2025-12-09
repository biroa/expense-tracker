// Entry types
export interface EntryData {
  id: string;
  name: string;
  amount: number;
  paid: boolean;
}

// Store types
export interface StoreOptions {
  sort: boolean;
}

// Navigation types
export interface NavLinkItem {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

// Settings types
export interface SettingsData {
  promptToDelete: boolean;
  showRunningBalance: boolean;
  currencySymbol: string;
  darkMode: boolean | 'auto';
  languageCode: string;
}

// FormattedEntry
export interface FormattedEntry {
  id: string;
  name: string;
  amount: number;
  paid: boolean;
  formatted: string;
  isPositive: boolean;
}
