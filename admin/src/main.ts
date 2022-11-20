import { createHead } from '@vueuse/head'
import App from './App.vue'
import { type UserModule } from '~/types'

import '@unocss/reset/tailwind.css'
import '~/styles/index.scss'

import 'uno.css'
// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'
import { router } from '~/router'
import store from '~/store'
import '~/router/permission'

const app = createApp(App)
// 插件自动加载
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install({
    app,
    router,
    isClient: false,
  }))

app.use(createHead())
  .use(store)
  .use(router)
  .mount('#app')

