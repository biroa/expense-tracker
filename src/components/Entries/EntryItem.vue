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
      <q-item-section
        :class="[
          useAmountColorClass(element.amount),
          { 'text-strike': element.paid }
        ]"
      >
        <q-item-label
        >
          {{ element.name }}
        </q-item-label>
        <q-popup-edit
          :model-value="element.name"
          auto-save
          anchor="top left"
          :cover="false"
          :offset="[17, 12]"
          buttons
          :label-set="t('common.ok')"
          @save="onNameUpdate"
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            dense
            autofocus
            input-class="text-weight-bold"
            @keyup.enter="scope.set"
            v-select-all
          />
        </q-popup-edit>
      </q-item-section>

      <!-- Amount -->
      <q-item-section
        side
        class="text-weight-bold relative-position vertical-middle"
        :class="[useAmountColorClass(element.amount)]"
      >
        <q-item-label
          class=""
          :class="[{ 'text-strike': element.paid }]"
        >
          {{ element.formatted }}
        </q-item-label>
        <q-popup-edit
          :model-value="element.amount"
          auto-save
          anchor="top right"
          self="top right"
          :cover="false"
          :offset="[17, 12]"
          buttons
          :label-set="t('common.ok')"
          @save="onAmountUpdate"
          v-slot="scope"
        >
          <q-input
            v-model.number="scope.value"
            dense
            autofocus
            input-class="text-weight-bold text-right"
            @keyup.enter="scope.set"
            step="0.01"
            type="number"
            v-select-all
          />
        </q-popup-edit>
        <!-- Running Balance (optional) -->
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          class="relative-position running-balance q-p-sm"
          :class="[useAmountColorClass(storeEntries.runningBalances[index]?? 0)]"
          size="1.1rem"
          dense
          outline
        >
          {{ useCurrencyFy(storeEntries.runningBalances[index] ?? 0) }}
        </q-chip>
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
import useAmountColorClass from 'src/composables/useAmountColorClass';
import vSelectAll from 'src/directives/directiveSelectAll';
import type { FormattedEntry } from 'src/types/index.ts';

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
      message: `${t('entries.deleteConfirm')} : ${props.element.name} : ${props.element.amount}`,
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

function onNameUpdate(value: string): void {
  storeEntries.updateEntry(props.element.id, { name: value });
}

function onAmountUpdate(value: number): void {
  storeEntries.updateEntry(props.element.id, { amount: value });
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
