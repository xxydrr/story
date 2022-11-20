<route lang="yaml">
name: index
meta:
  layout: default
  title: index
</route>

<script setup lang="ts">
const name = useUserStore().username
</script>

<template>
  <h1 flex justify-center mt-20 text-5xl>
    hi <span pl-8 text-green-400>{{ name }} </span>
  </h1>
</template>
