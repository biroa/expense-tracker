import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import type { Entry } from 'src/models/Entry';

export interface StoreOptions {
  sort: boolean;
}

export const useStoreEntries = defineStore('entries', () => {
  // State
  const entries = ref<Entry[]>([]);

  const options = reactive<StoreOptions>({
    sort: false,
  });

  // Return (minimal for now, will be expanded later)
  return {
    entries,
    options,
  };
});
