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
