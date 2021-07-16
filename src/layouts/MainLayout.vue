<template>
<q-layout view="lHh Lpr lFf">
  <q-header>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
    <q-item>Policy Studio</q-item>
    <q-expansion-item  icon="fab fa-github" label="GitHub">
      <q-list>
        <q-item clickable :inset-level="0.3" :to="{name: 'Repositories', query: { multiplier: 0, selectedLanguage: 'javascript'}}">
          <q-item-section side>
            <q-icon name="fas fa-stream" size="22px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Repositories API</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
