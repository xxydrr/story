import type { Context, DefaultState } from 'koa'
import Router from 'koa-router'

import { login, logout, register } from '~/controllers/auth'

const router = new Router<DefaultState, Context>()
  .get('/test', (ctx: Context) => {
    ctx.body = 'Hello Test'
  })

  .post('/register', register)
  .post('/login', login)
  .post('/logout', logout)

  .get('/', (ctx: Context) => {
    ctx.body = 'Hello World'
  })

export default router
