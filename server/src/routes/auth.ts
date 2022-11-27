import type { Context, DefaultState } from 'koa'
import Router from 'koa-router'

import { login, logout, register } from '~/controllers/auth'

const router = new Router<DefaultState, Context>()

  .post('/register', register)
  .post('/login', login)
  .post('/logout', logout)

export default router
