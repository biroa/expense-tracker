import { useStoreSettings } from 'stores/storeSettings';
import { getDefaultLanguage } from 'src/composables/useDefaultLanguage';
export default function useCurrencyFy(amount: number): string {
  const storeSettings = useStoreSettings();
  const symbol:string = storeSettings.settings.currencySymbol;
  const lang: string = getDefaultLanguage();

  const formatted = Math.abs(amount).toLocaleString(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return amount < 0 ? `- ${symbol} ${formatted}` : `+ ${symbol} ${formatted}`;
}
