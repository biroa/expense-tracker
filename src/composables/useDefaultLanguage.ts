import { Lang, LocalStorage } from 'quasar';
import type { SettingsData } from 'src/types';

export function getDefaultLanguage(): string {
  // Read directly from LocalStorage
  const storageSettingsData: SettingsData | null = LocalStorage.getItem<SettingsData>('settings');

  if (storageSettingsData?.languageCode) {
    return storageSettingsData.languageCode;
  }

  return Lang.props.isoName ?? 'en-US';
}
