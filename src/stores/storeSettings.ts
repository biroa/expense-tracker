import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { Dark, LocalStorage, Lang } from 'quasar';
import type { SettingsData } from 'src/types';
export const useStoreSettings = defineStore('settings', () => {
  // State - using a reactive object that mirrors a Settings class
  const settings = reactive<SettingsData>({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: true,
    languageCode: Lang.props.isoName,
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
