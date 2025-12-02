<template>
  <q-layout view="hHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="savings" />
            {{ t('layout.appName') }}
          </div>
        </q-toolbar-title>
        <q-btn
          v-if="$route.fullPath === '/'"
          @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort ? t('layout.sort') : t('layout.done')"
          flat
          no-caps
          dense
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      show-if-above
      bordered
      :width="250"
      :breakpoint="767"
    >
      <q-list>
        <q-item-label header class="text-white">
          {{ t('navigation.title') }}
        </q-item-label>

        <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import NavLink from 'components/Nav/NavLink.vue';
import useLightOrDark from 'src/composables/useLightOrDark';
import { useStoreEntries } from 'stores/storeEntries';

const { t } = useI18n();
const storeEntries = useStoreEntries();

interface NavLinkItem {
  title: string;
  icon: string;
  link: string;
}

const navLinks = computed<NavLinkItem[]>(() => [
  {
    title: t('navigation.entries'),
    icon: 'list_alt',
    link: '/',
  },
  {
    title: t('navigation.settings'),
    icon: 'settings',
    link: '/settings',
  },
]);

const leftDrawerOpen = ref<boolean>(false);

function toggleLeftDrawer(): void {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
