<template>
  <div class="row q-px-md q-py-sm balance-row bg-primary">
    <div class="col text-white text-h6">{{ t('entries.balance') }}:</div>
    <div class="col text-h6" :class="storeEntries.balance >= 0 ? 'text-white' : 'text-negative'">
      <div class="row text-right">
        <div class="col text-light-green-6">
          {{ useCurrencyFy(storeEntries.balance) }}
        </div>
      </div>
      <!-- Running Balance (optional) -->
      <div
        class="row text-right"
        v-if="storeSettings.settings.showRunningBalance && storeEntries.balancePaid > 0"
      >
        <div class="col text-caption text-white">
          {{ t('entries.paid') }}:
          <span class="text-weight-bold">
            {{ useCurrencyFy(storeEntries.balancePaid) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useStoreEntries } from 'stores/storeEntries';
import { useStoreSettings } from 'stores/storeSettings';
import useCurrencyFy from 'src/composables/useCurrencyFy';

const { t } = useI18n();
const storeEntries = useStoreEntries();
const storeSettings = useStoreSettings();
</script>
