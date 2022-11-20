<script setup lang="ts">
import type { pageParams } from './types'

const {
  total,
  page = 1,
  limit = 20,
  small = false,
  disabled = false,
  pageSizes = [10, 20, 30, 50],
  layout = 'sizes,total, prev, pager, next',
  background = true,
  hidden = false,
} = defineProps<{
  total: number
  page?: number
  limit?: number
  small?: boolean
  disabled?: boolean
  pageSizes?: number[]
  layout?: string
  background?: boolean
  hidden?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'update:limit', limit: number): void
  (e: 'pagination', { page, limit }: pageParams): void
}>()
const currentPage = computed({
  get: () => page,
  set: val => emit('update:page', val),
})
const pageSize = computed({
  get: () => limit,
  set: val => emit('update:limit', val),
})

const handleSizeChange = (val: number) => {
  emit('pagination', { page: currentPage.value, limit: val })
}
const handleCurrentChange = (val: number) => {
  emit('pagination', { page: val, limit: pageSize.value })
}
</script>

<template>
  <div :class="{ hidden }" class="pagination-container">
    <el-pagination
      v-model:currentPage="currentPage" v-model:pageSize="pageSize" :page-sizes="pageSizes"
      :total="total"
      :small="small" :disabled="disabled" :background="background" :layout="layout"
      @size-change="handleSizeChange" @current-change="handleCurrentChange"
    />
    <slot />
  </div>
</template>

<style scoped>
.pagination-container {
  padding: 32px 16px;
  position: relative;
}

.pagination-container.hidden {
  display: none;
}
</style>

