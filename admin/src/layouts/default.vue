<script setup lang="ts">
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar/index.vue'
</script>

<template>
  <Header />
  <div class="h-[calc(100%-45px)]" style="display: flex">
    <Sidebar />
    <div w-full>
      <RouterView />
    </div>
  </div>
</template>
