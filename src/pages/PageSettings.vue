<template>
  <q-page class="q-pa-md">
    <q-list>
      <!-- Prompt to Delete -->
      <q-item tag="label">
        <q-item-section>
          <q-item-label>{{ t('settings.promptToDelete') }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="storeSettings.settings.promptToDelete" color="positive" />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <!-- Show Running Balance -->
      <q-item tag="label">
        <q-item-section>
          <q-item-label>{{ t('settings.showRunningBalance') }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="storeSettings.settings.showRunningBalance" color="positive" />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <!-- Currency Symbol -->
      <q-item>
        <q-item-section>
          <q-item-label>{{ t('settings.currencySymbol') }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-select
            v-model="storeSettings.settings.currencySymbol"
            :options="currencyOptions"
            dense
            outlined
            emit-value
            map-options
            style="min-width: 100px"
          />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <!-- Dark Mode -->
      <q-item>
        <q-item-section>
          <q-item-label>{{ t('settings.darkMode') }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn-toggle
            v-model="storeSettings.settings.darkMode"
            :options="darkModeOptions"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="grey-4"
            text-color="dark"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Language</q-item-label>
        </q-item-section>
        <q-item-section side><LangSelector/> </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStoreSettings } from 'stores/storeSettings';
import LangSelector from 'components/Language/LangSelector.vue';

const { t } = useI18n();
const storeSettings = useStoreSettings();

interface SelectOption {
  label: string;
  value: string;
}

interface DarkModeOption {
  label: string;
  value: boolean | 'auto';
}

interface languageCodeOptions {
  label: string;
  value: string;
}

const currencyOptions = computed<SelectOption[]>(() => [
  { label: '$ (Dollar)', value: '$' },
  { label: '€ (Euro)', value: '€' },
  { label: '£ (Pound)', value: '£' },
  { label: '¥ (Yen)', value: '¥' },
  { label: '₹ (Rupee)', value: '₹' },
  { label: 'Ft (Forint)', value: 'Ft' },
]);

const darkModeOptions = computed<DarkModeOption[]>(() => [
  { label: t('settings.light'), value: false },
  { label: t('settings.dark'), value: true },
  { label: t('settings.auto'), value: 'auto' },
]);

const languageCodeOptions = computed<languageCodeOptions[]>(() => [
  { label: t('language-en'), value: 'en-EN' },
  { label: t('language-hu'), value: 'hu-HU' },
]);
</script>
