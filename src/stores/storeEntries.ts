import { defineStore } from 'pinia';
import { ref, reactive, computed, watch } from 'vue';
import { LocalStorage, Notify } from 'quasar';
import { Entry } from 'src/models/Entry';
import type { EntryData, StoreOptions } from 'src/types';

export const useStoreEntries = defineStore('entries', () => {
  // State
  const entries = ref<Entry[]>([]);

  const options = reactive<StoreOptions>({
    sort: false,
  });

  // Watch entries for auto-save
  watch(entries, () => saveEntries(), { deep: true });

  // Getters
  const balance = computed<number>(() => {
    return entries.value.reduce((acc, entry) => acc + entry.amount, 0);
  });

  const balancePaid = computed<number>(() => {
    return entries.value
      .filter((entry) => entry.paid)
      .reduce((acc, entry) => acc + entry.amount, 0);
  });

  const runningBalances = computed<number[]>(() => {
    let runningBalance = 0;
    return entries.value.map((entry) => {
      runningBalance += entry.amount;
      return runningBalance;
    });
  });

  // Helper
  function getEntryIndexById(entryId: string): number {
    return entries.value.findIndex((entry) => entry.id === entryId);
  }

  // Actions
  function addEntry(entryData: { name: string; amount: number }): void {
    const entry = new Entry(entryData.name, entryData.amount);
    entries.value.push(entry);
    Notify.create({
      message: 'Entry added!',
      position: 'top',
      icon: 'add_circle',
      color: 'positive',
    });
  }

  function deleteEntry(id: string): void {
    const index = getEntryIndexById(id);
    if (index !== -1) {
      entries.value.splice(index, 1);
      Notify.create({
        message: 'Entry deleted!',
        position: 'top',
        icon: 'delete_forever',
        color: 'negative',
      });
    }
  }

  function updateEntry(id: string, updates: Partial<Omit<EntryData, 'id'>>): void {
    const index = getEntryIndexById(id);
    const entry = entries.value[index];
    if (entry) {
      entry.update(updates);
      Notify.create({
        message: 'Entry updated!',
        position: 'top',
        icon: 'edit',
        color: 'positive',
      });
    }
  }

  function togglePaid(id: string): void {
    const index = getEntryIndexById(id);
    const entry = entries.value[index];
    if (entry) {
      entry.togglePaid();
    }
  }

  function sortEnd(event: { oldIndex: number; newIndex: number }): void {
    const movedEntry = entries.value.splice(event.oldIndex, 1)[0];
    if(movedEntry){
      entries.value.splice(event.newIndex, 0, movedEntry);
    }
  }

  function saveEntries(): void {
    const serialized = entries.value.map((e) => e.toObject());
    LocalStorage.set('entries', serialized);
  }

  function loadEntries(): void {
    const saved = LocalStorage.getItem<EntryData[]>('entries');
    if (saved && saved.length > 0) {
      entries.value = saved.map((obj) => Entry.fromObject(obj));
    }else{
      // Load default entries when no saved data exists
      entries.value = Entry.getDefaultEntries();
    }
  }

  return {
    // State
    entries,
    options,
    // Getters
    balance,
    balancePaid,
    runningBalances,
    // Actions
    addEntry,
    deleteEntry,
    updateEntry,
    togglePaid,
    sortEnd,
    loadEntries,
  };
});
