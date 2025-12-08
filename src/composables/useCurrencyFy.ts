import { useStoreSettings } from 'stores/storeSettings';

export default function useCurrencyFy(amount: number): string {
  const storeSettings = useStoreSettings();
  const symbol = storeSettings.settings.currencySymbol;

  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return amount < 0 ? `- ${symbol} ${formatted}` : `+ ${symbol} ${formatted}`;
}
