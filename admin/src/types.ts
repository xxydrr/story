import type { App } from 'vue'
import type { Router } from 'vue-router'

export interface IUserModule {
  app: App<Element>
  router: Router
  isClient: boolean
}

export type UserModule = (ctx: IUserModule) => void

