<template>
  <div class="row q-px-md q-py-sm balance-row bg-primary">
    <div class="col text-white text-h6">{{ t('entries.balance') }}:</div>
    <div
      class="col text-right text-h6"
      :class="storeEntries.balance >= 0 ? 'text-white' : 'text-negative'"
    >
      {{ useCurrencyFy(storeEntries.balance) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useStoreEntries } from 'stores/storeEntries';
import useCurrencyFy from 'src/composables/useCurrencyFy';

const { t } = useI18n();
const storeEntries = useStoreEntries();
</script>
