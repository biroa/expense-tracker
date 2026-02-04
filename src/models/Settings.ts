import type { SettingsData } from 'src/types';
import { getDefaultLanguage } from 'src/composables/useDefaultLanguage';

export class Settings implements SettingsData {
  promptToDelete: boolean;
  showRunningBalance: boolean;
  currencySymbol: string;
  darkMode: boolean | 'auto';
  languageCode: string;

  // Default settings
  static readonly DEFAULTS: SettingsData = {
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: true,
    languageCode: getDefaultLanguage(),
  };

  constructor(data?: Partial<SettingsData>) {
    const merged = { ...Settings.DEFAULTS, ...data };
    this.promptToDelete = merged.promptToDelete;
    this.showRunningBalance = merged.showRunningBalance;
    this.currencySymbol = merged.currencySymbol;
    this.darkMode = merged.darkMode;
    this.languageCode = merged.languageCode;
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
    if (updates.showRunningBalance !== undefined)
      this.showRunningBalance = updates.showRunningBalance;
    if (updates.currencySymbol !== undefined) this.currencySymbol = updates.currencySymbol;
    if (updates.darkMode !== undefined) this.darkMode = updates.darkMode;
    if (updates.languageCode !== undefined) this.languageCode = updates.languageCode;
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
      languageCode: this.languageCode,
    };
  }

  /**
   * Validates if an object has valid SettingsData properties.
   * Allows partial data since the Settings constructor handles defaults.
   */
  static isValidSettingsData(obj: unknown): obj is Partial<SettingsData> {
    if (typeof obj !== 'object' || obj === null) return false;
    const settings = obj as Record<string, unknown>;

    // Check each property only if it exists
    if ('promptToDelete' in settings && typeof settings.promptToDelete !== 'boolean') return false;
    if ('showRunningBalance' in settings && typeof settings.showRunningBalance !== 'boolean')
      return false;
    if ('currencySymbol' in settings && typeof settings.currencySymbol !== 'string') return false;
    if ('languageCode' in settings && typeof settings.languageCode !== 'string') return false;
    if ('darkMode' in settings) {
      const dm = settings.darkMode;
      if (dm !== true && dm !== false && dm !== 'auto') return false;
    }

    return true;
  }
}
