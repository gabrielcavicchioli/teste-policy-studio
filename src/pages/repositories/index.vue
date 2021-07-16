<template lang="html">
  <header>
    <div class="row q-col-gutter-md q-pa-sm items-end">
      <div class="col-lg-4 col-md-6 col-sm-8 col-xs-12">
        <q-select v-model="selectedLanguage" :options="languageOptions" dense options-dense
          emit-value label="Filter by language" @update:model-value="updateRouteParams" />
      </div>
    </div>
    <q-separator />
  </header>

  <main class="q-py-lg">
    <q-table :rows="computedResults" :columns="computedTableColumns" row-key="id" flat :pagination="tablePagination">
      <template #top>
        <div class="full-width row">
          <div class="col-12">
            <span class="text-h6">Table config.</span>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-8 col-xs-12">
            <q-item>
              <q-item-section side>Multiplier</q-item-section>
              <q-item-section>
                <q-slider v-model="multiplier" :min="0" :max="100" @change="updateRouteParams"/>
              </q-item-section>
              <q-item-section side>{{ multiplier }}</q-item-section>
            </q-item>
          </div>
        </div>
      </template>

      <template #header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" width="20%">
            {{ props.row.id }}
          </q-td>

          <q-td key="name" width="20%">
            {{ props.row.name }}
          </q-td>

          <q-td key="owner" width="20%">
            {{ props.row.owner.html_url }}
          </q-td>

          <q-td key="stars" width="20%">
            {{ props.row.stargazers_count }}
          </q-td>

          <q-td key="computed" width="20%">
            <span :class="{ 'text-green-8 text-weight-bold': props.row.computed > props.row.stargazers_count }">
              {{ props.row.computed || props.row.stargazers_count }}
            </span>
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </main>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import service from './service'

import { useQuasar } from 'quasar'
import tableColumns from './js/tableColumns'
import languageOptions from './js/languageOptions'

export default {
  name: 'repositories',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const repositories = ref([])
    const selectedLanguage = ref('javascript')
    const multiplier = ref(0)
    const tablePagination = { rowsPerPage: 10 }

    const computedTableColumns = [
      ...tableColumns,
      {
        name: 'computed',
        field: 'computed',
        label: 'Computed (Stars x Multiplier)',
        align: 'left'
      }
    ]

    const updateRouteParams = () => {
      router.replace({
        name: 'Repositories',
        query: {
          multiplier: multiplier.value,
          selectedLanguage: selectedLanguage.value
        }
      })
    }

    const computedResults = computed(() => {
      const processedData = repositories.value.map(row => ({
        ...row,
        computed: row.stargazers_count * multiplier.value
      }))
      return processedData
    })

    watch(() => route.query.selectedLanguage, async newValue => {
      $q.loading.show()
      repositories.value = await service.find({ language: newValue })
      $q.loading.hide()
    }, { immediate: true })

    onMounted(() => {
      multiplier.value = parseInt(route.query.multiplier)
      selectedLanguage.value = route.query.selectedLanguage
      updateRouteParams()
    })

    return {
      computedTableColumns,
      computedResults,
      languageOptions,
      selectedLanguage,
      updateRouteParams,
      tablePagination,
      multiplier
    }
  }
}
</script>

<style lang="css" scoped>
</style>
