<script setup lang="ts">
import type { Field, FormItem, pageParams } from './types'
import Pagination from './Pagination.vue'

const {
  formList = [],
  fields = [],
  tableData = [],
  rules,
  formWidth,
  listLoading = false,
  total = 0,
  tableStyle = {
    width: '100%',
    marginTop: '30px',
  },
  rowKeys = 'id',
  page = 1,
  limit = 20,
} = defineProps<{
  tableData: any[]
  fields: Field[]
  formList?: FormItem[]

  total?: number
  listLoading?: boolean
  rowKeys?: string
  tableStyle?: Record<string, any>
  formWidth?: string
  rules?: Record<string, any>
  // pageParams?: Record<string, number>
  page?: number
  limit?: number
}>()
const emit = defineEmits<{
  (e: 'nextPage', { page, limit }: pageParams): void
}>()
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const pageSize = computed(() => limit)
const curPage = computed(() => page)
const getList = ({ page, limit }: pageParams) => {
  emit('nextPage', { page, limit })
}
</script>

<template>
  <div>
    <slot name="pageTop" />
    <el-form ref="form" class="flex -ml-3" label-width="80px" :style="{ formWidth }" inline :rules="rules">
      <!-- 遍历 formComponentList，生成表单组件列表 -->
      <!-- 通过 formLabel 配置左侧 label 标签名称 -->
      <el-form-item
        v-for="item in formList" :key="item.key" :prop="item.key" style="margin-left: 15px"
        :label="item.label" :label-width="item.labelWidth || ''"
      >
        <!-- 通过 v-if 判断，插入对应的表单组件 -->
        <!-- 每个表单组件都有 v-model 来绑定 value 值 -->
        <el-input
          v-if="item.name === 'input'" v-model="item.value" :type="item.type" :placeholder="item.placeholder"
          :disabled="item.disabled" :style="{ width: item.width }"
        />
        <el-select
          v-if="item.name === 'select'" v-model="item.value" :placeholder="item.placeholder"
          :disabled="item.disabled" :loading="item.loading" :reserve-keyword="item.reserve" :remote="item.remote"
          :filterable="item.filterable" :clearable="item.clearable" :remote-method="item.remoteMethod"
          :style="{ width: item.width }"
        >
          <!-- select、checkbox-group、radio-group 等选项组件可通过 options 来配置相应的选项 -->
          <el-option
            v-for="option in item.options" :key="option.key" :value="option.value"
          />
        </el-select>

        <!-- 日期和时间组件，可通过 valueFormat 配置值的格式 -->
        <el-date-picker
          v-if="item.name === 'date-picker'" v-model="item.value" :type="item.type || 'date'"
          :value-format="item.valueFormat" :placeholder="item.placeholder" :unlink-panels="!item.linkPanels"
          :shortcuts="item.shortcuts || shortcuts" :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder" :default-time="item.defaultTime" :style="{ width: item.width }"
        />
        <el-time-picker
          v-if="item.name === 'time-picker'" v-model="item.value" :value-format="item.valueFormat"
          :placeholder="item.placeholder" :style="{ width: item.width }"
        />
        <el-switch v-if="item.name === 'switch'" v-model="item.value" />
        <el-checkbox-group v-if="item.name === 'checkbox-group'" v-model="item.value">
          <el-checkbox v-for="option in item.options" :key="option.label" :label="option.label">
            {{
              option.text || option.label
            }}
          </el-checkbox>
        </el-checkbox-group>
        <el-checkbox
          v-if="item.name === 'checkbox'" v-model="item.value" :true-label="item.trueLabel || 'true'"
          :false-label="item.falseLabel"
        />
        <el-radio-group v-if="item.name === 'radio-group'" v-model="item.value">
          <el-radio v-for="option in item.options" :key="option.label" :label="option.label">
            {{
              option.text || option.label
            }}
          </el-radio>
        </el-radio-group>
        <el-input-number v-if="item.name === 'input-number'" v-model="item.value" :label="item.label" :min="0" />
        <el-cascader
          v-if="item.name === 'cascader'" v-model="item.value" :options="item.options"
          :clearable="item.clearable" :filterable="item.filterable" :props="item.props"
        />
      </el-form-item>
      <!-- slot 留个性化的内容 -->
      <slot name="queryForm" />
    </el-form>
    <el-table
      v-loading="listLoading"
      :border="true"

      :data="tableData" :style="tableStyle"
      :row-key="rowKeys"
    >
      <el-table-column
        v-for="field in fields"
        :key="field.label" :align="field.align || 'center'" :label="field.label" :sortable="field.sortable"
        :prop="field.prop" :width="field.width"
      >
        <template #default="{ row, $index }">
          <!-- slot 留个性化的内容 -->
          <slot v-if="field.slotName" :name="field.slotName" :val="row[field.prop]" :row="row" :index="$index" />
          <span v-else>{{ row[field.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-if="total > 0" v-model:page="curPage" v-model:limit="pageSize" :total="total"
      @pagination="getList"
    >
      <slot name="pagination" />
    </Pagination>
  </div>
</template>
