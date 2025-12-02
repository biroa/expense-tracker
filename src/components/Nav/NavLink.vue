<template>
  <q-item clickable tag="a" :to="props.link" class="text-white">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type {NavLinkItem} from 'src/types/index.ts'

const props = withDefaults(defineProps<NavLinkItem>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
