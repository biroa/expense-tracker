<template>
  <div class="float-right">
    <q-select
      v-model="lang"
      :options="langOptions"
      dense
      outlined
      emit-value
      map-options
      style="max-width: 150px"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import { useStoreSettings } from 'stores/storeSettings.js';
const { locale } = useI18n({ useScope: 'global' });
const storeSetting = useStoreSettings();

const appLanguages = [
  { nativeName: 'English', isoName: 'en-US' },
  { nativeName: 'Magyar', isoName: 'hu-HU' },
];

const langOptions = appLanguages.map((lang) => ({
  label: lang.nativeName,
  value: lang.isoName,
}));

const lang = ref(locale.value);

watch(lang, (val) => {
  locale.value = val;
  storeSetting.settings.languageCode = lang.value;
});
</script>
<style scoped></style>
