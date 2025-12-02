import { Dark } from 'quasar';

export default function useLightOrDark<T>(lightValue: T, darkValue: T): T {
  return !Dark.isActive ? lightValue : darkValue;
}
