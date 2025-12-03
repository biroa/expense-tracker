import { describe, it, expect } from 'vitest';
import { Settings } from '../Settings';

describe('Settings', () => {
  describe('constructor', () => {
    it('should create settings with default values', () => {
      const settings = new Settings();

      expect(settings.promptToDelete).toBe(true);
      expect(settings.showRunningBalance).toBe(false);
      expect(settings.currencySymbol).toBe('$');
      expect(settings.darkMode).toBe(true);
    });

    it('should create settings with custom values', () => {
      const settings = new Settings({
        currencySymbol: '€',
        darkMode: false,
      });

      expect(settings.currencySymbol).toBe('€');
      expect(settings.darkMode).toBe(false);
      // Defaults preserved
      expect(settings.promptToDelete).toBe(true);
    });
  });

  describe('dark mode helpers', () => {
    it('should detect dark mode', () => {
      const settings = new Settings({ darkMode: true });
      expect(settings.isDarkMode()).toBe(true);
      expect(settings.isLightMode()).toBe(false);
      expect(settings.isAutoMode()).toBe(false);
    });

    it('should detect light mode', () => {
      const settings = new Settings({ darkMode: false });
      expect(settings.isDarkMode()).toBe(false);
      expect(settings.isLightMode()).toBe(true);
      expect(settings.isAutoMode()).toBe(false);
    });

    it('should detect auto mode', () => {
      const settings = new Settings({ darkMode: 'auto' });
      expect(settings.isDarkMode()).toBe(false);
      expect(settings.isLightMode()).toBe(false);
      expect(settings.isAutoMode()).toBe(true);
    });
  });

  describe('toggleDarkMode', () => {
    it('should cycle through modes: true -> false -> auto -> true', () => {
      const settings = new Settings({ darkMode: true });

      settings.toggleDarkMode();
      expect(settings.darkMode).toBe(false);

      settings.toggleDarkMode();
      expect(settings.darkMode).toBe('auto');

      settings.toggleDarkMode();
      expect(settings.darkMode).toBe(true);
    });
  });

  describe('update', () => {
    it('should update specific properties', () => {
      const settings = new Settings();
      settings.update({ currencySymbol: '£', showRunningBalance: true });

      expect(settings.currencySymbol).toBe('£');
      expect(settings.showRunningBalance).toBe(true);
      expect(settings.promptToDelete).toBe(true); // unchanged
    });
  });

  describe('reset', () => {
    it('should reset to defaults', () => {
      const settings = new Settings({
        currencySymbol: '€',
        darkMode: false,
        promptToDelete: false,
      });

      settings.reset();

      expect(settings.currencySymbol).toBe('$');
      expect(settings.darkMode).toBe(true);
      expect(settings.promptToDelete).toBe(true);
    });
  });

  describe('serialization', () => {
    it('should serialize to object', () => {
      const settings = new Settings({ currencySymbol: '€' });
      const obj = settings.toObject();

      expect(obj).toEqual({
        promptToDelete: true,
        showRunningBalance: false,
        currencySymbol: '€',
        darkMode: true,
      });
    });

    it('should deserialize from object', () => {
      const obj = { currencySymbol: '¥', darkMode: 'auto' as const };
      const settings = Settings.fromObject(obj);

      expect(settings).toBeInstanceOf(Settings);
      expect(settings.currencySymbol).toBe('¥');
      expect(settings.darkMode).toBe('auto');
    });
  });
});
