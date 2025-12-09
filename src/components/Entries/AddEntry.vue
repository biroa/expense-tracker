<template>
  <q-form @submit="addEntryFormSubmit()" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
    <div class="col">
      <q-input
        v-model="addEntryForm.name"
        ref="nameRef"
        outlined
        :bg-color="useLightOrDark('white', 'dark')"
        :placeholder="t('entries.namePlaceholder')"
        dense
        v-select-all
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
        outlined
        :bg-color="useLightOrDark('white', 'dark')"
        :placeholder="t('entries.amountPlaceholder')"
        input-class="text-right"
        type="number"
        step="0.01"
        dense
        v-select-all
      />
    </div>
    <div class="col col-auto">
      <q-btn type="submit" round color="primary" icon="add" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { QInput } from 'quasar';
import vSelectAll from 'src/directives/directiveSelectAll';
import useLightOrDark from 'src/composables/useLightOrDark';
import { useStoreEntries } from 'stores/storeEntries';

const { t } = useI18n();
const nameRef = ref<QInput | null>(null);
const storeEntries = useStoreEntries();

interface AddEntryFormData {
  name: string | null;
  amount: number | null;
}

const addEntryFormDefault: AddEntryFormData = {
  name: null,
  amount: null,
};

const addEntryForm = reactive<AddEntryFormData>({
  ...addEntryFormDefault,
});

function addEntryFormReset(): void {
  Object.assign(addEntryForm, addEntryFormDefault);
  nameRef.value?.focus();
}

function addEntryFormSubmit(): void {
  if (addEntryForm.name && addEntryForm.amount !== null) {
    storeEntries.addEntry({
      name: addEntryForm.name,
      amount: addEntryForm.amount,
    });
    addEntryFormReset();
  }
}
</script>
