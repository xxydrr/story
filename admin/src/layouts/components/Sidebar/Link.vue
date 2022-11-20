<script setup lang="ts">
const { to = '' } = defineProps<{
  to: string
}>()
const type = $computed(() => {
  if (to.startsWith('http'))
    return 'a'
  return 'router-link'
})
const linkProps = (to: string) => {
  if (to.startsWith('http'))
    return { href: to, target: '_blank', rel: 'noopener noreferrer' }
  return { to }
}
</script>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
