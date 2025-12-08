<template>
  <div class="text-center q-mt-xl">
    <q-icon :name="`img:${expenseTrackerRectangular}`" size="400px" color="grey-4" />
    <p class="text-h5 text-grey-6">{{ t('entries.nothingHere') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import expenseTrackerRectangular from 'assets/expense-tracket-rectangular.svg';
const { t } = useI18n();
</script>
