<template>
  <q-slide-item
    @left="onSlideLeft"
    @right="onSlideRight"
    left-color="positive"
    right-color="negative"
  >
    <template #left>
      <q-icon name="check" />
    </template>
    <template #right>
      <q-icon name="delete" />
    </template>

    <q-item class="entry-item">
      <!-- Drag Handle (visible only in sort mode) -->
      <q-item-section v-if="storeEntries.options.sort" side>
        <q-icon class="handle" name="reorder" color="primary" />
      </q-item-section>

      <!-- Entry Name -->
      <q-item-section :class="{ 'text-strike': element.paid }">
        {{ element.name }}
      </q-item-section>

      <!-- Running Balance (optional) -->
      <q-item-section
        v-if="storeSettings.settings.showRunningBalance"
        side
        class="running-balance text-grey-6"
      >
        {{ useCurrencyFy(parseInt(String(storeEntries.runningBalances[index]))) }}
      </q-item-section>

      <!-- Amount -->
      <q-item-section
        side
        class="text-weight-bold"
        :class="
          [
          element.amount >= 0 ? 'text-positive' : 'text-negative',
          { 'text-strike': element.paid }
          ]"
      >
        {{ element.formatted }}
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useStoreEntries } from 'stores/storeEntries';
import { useStoreSettings } from 'stores/storeSettings';
import useCurrencyFy from 'src/composables/useCurrencyFy';
import type { FormattedEntry } from 'src/types/index.ts'

const props = defineProps<{
  element: FormattedEntry;
  index: number;
}>();

const $q = useQuasar();
const { t } = useI18n();
const storeEntries = useStoreEntries();
const storeSettings = useStoreSettings();

function onSlideLeft({ reset }: { reset: () => void }): void {
  storeEntries.togglePaid(props.element.id);
  reset();
}

function onSlideRight({ reset }: { reset: () => void }): void {
  if (storeSettings.settings.promptToDelete) {
    $q.dialog({
      title: t('entries.deleteConfirmTitle'),
      message: `<strong>${t('entries.deleteConfirm')}:</strong> ${props.element.name} : ${props.element.amount}`,
      cancel: true,
      persistent: true,
    }).onOk(() => {
      storeEntries.deleteEntry(props.element.id);
    }).onCancel(() => {
      reset();
    });
  } else {
    storeEntries.deleteEntry(props.element.id);
  }
}
</script>

<style scoped>
.handle {
  cursor: grab;
}

.handle:active {
  cursor: grabbing;
}
</style>
