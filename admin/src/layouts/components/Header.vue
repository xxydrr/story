<script setup lang="ts">
const { locale, t } = useI18n()
const localOpts = [
  {
    label: '中文',
    key: 'zh-CN',
  },
  {
    label: 'English',
    key: 'en',
  },
]
const handleSelect = (key: string) => {
  locale.value = key
}
const handleLogout = () => {
  useUserStore().logout()
}
const { currentRoute } = useRouter()
const title = ref('')
watchEffect(() => {
  let newtitle = ''
  const titles = currentRoute.value.matched.map(item => item.meta.title ?? item.name).filter(Boolean)
  titles.forEach((t) => {
    newtitle += `/${t}`
  })
  title.value = newtitle
})
</script>

<template>
  <el-page-header class="p-2 border-b" :icon="null">
    <template #title>
      <router-link to="/">
        <el-avatar :size="32" class="ml-3" src="https://avatars.githubusercontent.com/u/62632311?v=4" />
      </router-link>
    </template>
    <template #content>
      <div class="flex items-center">
        <span class="mr-2 text-sm" style="color: var(--ep-color-info-dark-2)">{{ title }} </span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center justify-center gap-3">
        <button class="icon-btn mx-2 !outline-none" @click="toggleDark()">
          <div i="carbon-sun dark:carbon-moon" />
        </button>

        <el-dropdown>
          <span class="el-dropdown-link">

            <div i-carbon-language icon-btn />

          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="i in localOpts" :key="i.key" @click="handleSelect(i.key)">
                <span>{{ i.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <a class="mx-2 icon-btn" rel="noreferrer" href="https://github.com/xxydrr/story" target="_blank" title="GitHub">
          <div i-carbon-logo-github />
        </a>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="28" class="mr-3 cursor-pointer" src="https://avatars.githubusercontent.com/u/62632311?v=4" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span @click="handleLogout">{{ t('button.exit') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-page-header>
</template>

<style lang="scss" scoped>
:deep(.ep-page-header__breadcrumb)  {
  display: none;
}
</style>

