import type { Middleware } from 'koa'

export const errors: Middleware = async (ctx, next) => {
  try {
    await next()
  }
  catch (err: any) {
    const { status = 500, message = 'Something went wrong!', code = undefined } = err
    ctx.status = status || 500
    ctx.type = 'json'
    ctx.body = { message, code: code || status }
  }
}
