<script setup lang="ts">
import AppLink from './Link.vue'
interface NoShowingChildren {
  noShowingChildren?: boolean
}
const { item = {}, basePath = '', isNest = false } = defineProps<{
  item: RouteRecordRaw
  basePath: string
  isNest?: boolean
}>()
let onlyOneChild = $ref<RouteRecordRaw & NoShowingChildren>()
const hasShow = $computed(() => {
  return !onlyOneChild.children || onlyOneChild.noShowingChildren
})
const hasOneShowingChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
  const showingChildren = children.filter((child) => {
    if (child.meta?.hidden) {
      return false
    }
    else {
      onlyOneChild = child
      return true
    }
  })
  if (showingChildren.length === 1)
    return true

  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}
const resolvePath = (path: string) => {
  if (path.startsWith('http'))
    return path
  return `${basePath}${path ? `/${path}` : ''}`.replace(/\/+/g, '/')
}
</script>

<template>
  <div v-if="!item?.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && hasShow">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :key="item.path" :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <div :class="[`i-${onlyOneChild.meta?.icon}`]" />
          <span>{{ onlyOneChild.meta?.title || onlyOneChild.name }}</span>
        </el-menu-item>
      </AppLink>
    </template>

    <template v-else>
      <el-sub-menu :index="resolvePath(item.path)" popper-append-to-body>
        <template #title>
          <span>{{ item.name }}</span>
        </template>
        <TreeMenu v-for="child, index in item.children" :key="child.path" :index="index" :item="child" :is-nest="true" :base-path="resolvePath(child.path)" class="nest-menu" />
      </el-sub-menu>
    </template>
  </div>
</template>

<style lang="scss">

</style>
