import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { Dark, LocalStorage } from 'quasar';
//import { Settings } from 'src/models/Settings';
import type { SettingsData } from 'src/types';

export const useStoreSettings = defineStore('settings', () => {
  // State - using a reactive object that mirrors a Settings class
  const settings = reactive<SettingsData>({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: true,
  });

  // Watch dark mode
  watch(
    () => settings.darkMode,
    (value) => {
      Dark.set(value);
    },
    { immediate: true }
  );

  // Watch settings for auto-save
  watch(settings, () => saveSettings());

  // Actions
  function saveSettings(): void {
    LocalStorage.set('settings', settings);
  }

  function loadSettings(): void {
    const saved = LocalStorage.getItem<SettingsData>('settings');
    if (saved) {
      Object.assign(settings, saved);
    }
  }

  return {
    settings,
    loadSettings,
  };
});
