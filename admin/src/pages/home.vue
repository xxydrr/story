<script setup lang="ts">
import FiterTable from '~/components/FilterTable.vue'
import type { UserInfo } from '~/api/user/types'
import { useFetch } from '~/hooks/useFetch'
const { t } = useI18n()
interface Result {
  result: UserInfo[]
  total: number
}
const pageParams = reactive({
  page: 1,
  limit: 20,
})
const url = ref('/user/all')
const { loading, data, fetchData } = useFetch<Result>(url, pageParams)

const nextPage = (val: { page: number; limit: number }) => {
  pageParams.page = val.page
  pageParams.limit = val.limit
}
const formList = reactive<FormItem[]>([
  {
    label: 'username',
    key: 'username',
    value: '',
    name: 'input',
    placeholder: 'please input username',
  },

])

const fields = computed(() => {
  return [
    {
      label: t('user.username'),
      prop: 'username',
    },
    {
      label: t('user.email'),
      prop: 'email',
    },
    {
      label: t('user.roles'),
      prop: 'roles',
    },
    {
      label: t('user.createAt'),
      prop: 'createdAt',
    },
    {
      label: t('user.phone'),
      prop: 'phone',
    },
    {
      label: t('user.country'),
      prop: 'country',
    },
    {
      label: t('user.city'),
      prop: 'city',
    },

  ]
})

const handleFilter = () => {
  pageParams.page = 1
  pageParams.limit = 20
  const query = mergeQuery(formList, pageParams)
  Object.assign(pageParams, query)
  fetchData()
}
</script>

<template>
  <div px-4 py-6>
    <FiterTable :form-list="formList" :page="pageParams.page" :limit="pageParams.limit" :total="data?.total" :fields="fields" :table-data="data?.result ?? []" :list-loading="loading" @nextPage="nextPage">
      <template #queryForm>
        <div class="query-form">
          <el-button type="primary" @click="handleFilter">
            {{ t('button.search') }}
          </el-button>
        </div>
      </template>
    </FiterTable>
  </div>
</template>

