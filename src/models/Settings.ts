import type { SettingsData } from 'src/types';

export class Settings implements SettingsData {
  promptToDelete: boolean;
  showRunningBalance: boolean;
  currencySymbol: string;
  darkMode: boolean | 'auto';

  // Default settings
  static readonly DEFAULTS: SettingsData = {
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: true,
  };

  constructor(data?: Partial<SettingsData>) {
    const merged = { ...Settings.DEFAULTS, ...data };
    this.promptToDelete = merged.promptToDelete;
    this.showRunningBalance = merged.showRunningBalance;
    this.currencySymbol = merged.currencySymbol;
    this.darkMode = merged.darkMode;
  }

  // Business logic methods (testable)
  isDarkMode(): boolean {
    return this.darkMode === true;
  }

  isLightMode(): boolean {
    return this.darkMode === false;
  }

  isAutoMode(): boolean {
    return this.darkMode === 'auto';
  }

  toggleDarkMode(): void {
    if (this.darkMode === true) {
      this.darkMode = false;
    } else if (this.darkMode === false) {
      this.darkMode = 'auto';
    } else {
      this.darkMode = true;
    }
  }

  update(updates: Partial<SettingsData>): void {
    if (updates.promptToDelete !== undefined) this.promptToDelete = updates.promptToDelete;
    if (updates.showRunningBalance !== undefined) this.showRunningBalance = updates.showRunningBalance;
    if (updates.currencySymbol !== undefined) this.currencySymbol = updates.currencySymbol;
    if (updates.darkMode !== undefined) this.darkMode = updates.darkMode;
  }

  reset(): void {
    Object.assign(this, Settings.DEFAULTS);
  }

  // Serialization for LocalStorage
  static fromObject(obj: Partial<SettingsData>): Settings {
    return new Settings(obj);
  }

  toObject(): SettingsData {
    return {
      promptToDelete: this.promptToDelete,
      showRunningBalance: this.showRunningBalance,
      currencySymbol: this.currencySymbol,
      darkMode: this.darkMode,
    };
  }
}
