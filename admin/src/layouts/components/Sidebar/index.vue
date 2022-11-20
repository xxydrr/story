<script setup lang="ts">
import TreeMenu from './TreeMenu.vue'

const route = useRoute()
const routes = usePermissionStore().routes

const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<template>
  <div border-r h-full>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="w-48 ">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
      >
        <TreeMenu v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.ep-scrollbar__view  .ep-menu{
    border-right: 0;
}
</style>
