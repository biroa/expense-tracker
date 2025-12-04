<template>
  <q-page>
    <div class="q-pa-md">
      <transition appear enter-active-class="animated jackInTheBox slower">
        <NothingHere v-if="!storeEntries.entries.length" />
      </transition>

      <q-list v-if="storeEntries.entries.length" class="entries">
        <Sortable
          @end="storeEntries.sortEnd"
          :list="formattedEntries"
          item-key="id"
          tag="div"
          :options="{
            handle: '.handle',
            animation: 200,
          }"
        >
          <template #item="{ element, index }">
            <EntryItem :key="element.id" :element="element" :index="index" />
          </template>
        </Sortable>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <Balance v-if="parseInt(String(storeEntries.entries.length)) > 0" />
      </transition>
      <AddEntry />
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Sortable } from 'sortablejs-vue3';
import { useStoreEntries } from 'stores/storeEntries';
import { useStoreSettings } from 'stores/storeSettings';
import useCurrencyFy from 'src/composables/useCurrencyFy';
import AddEntry from 'components/Entries/AddEntry.vue';
import Balance from 'components/Entries/BalanceComp.vue';
import EntryItem from 'components/Entries/EntryItem.vue';
import NothingHere from 'components/Entries/NothingHere.vue';

const storeEntries = useStoreEntries();
const storeSettings = useStoreSettings();

// Load data on mount
onMounted(() => {
  storeEntries.loadEntries();
  storeSettings.loadSettings();
});

// Computed formatted entries for display
const formattedEntries = computed(() =>
  storeEntries.entries.map((entry) => ({
    id: entry.id,
    name: entry.name,
    amount: entry.amount,
    paid: entry.paid,
    formatted: useCurrencyFy(entry.amount),
    isPositive: entry.amount >= 0,
  }))
);
</script>
