import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import winston from 'winston'
import cors from '@koa/cors'
import connectDB from './utils/connectDB'
import apiRouter from '~/routes'
import { logger } from '~/middleware/logger'
import response from '~/middleware/response'
import { errors } from '~/middleware/errors'
(async () => {
  const app = new Koa()
  const checkOriginAgainstWhitelist = (ctx: Context) => {
    const whitelist = ['http://localhost:8866', 'http://localhost:8867']
    const requestOrigin = ctx.header.origin ?? ctx.header.referer?.split('/').slice(0, 3).join('/')
    if (whitelist.includes(requestOrigin))
      return requestOrigin
  }
  app.use(cors(
    {
      origin: checkOriginAgainstWhitelist,
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
    },
  ))
  app.use(logger(winston)).use(response())
    .use(errors)

  // middleware
  // Logger middleware -> use winston as logger (logging.ts with config)
  // Enable bodyParser with default options
    .use(bodyParser({
      onerror: (error, ctx) => {
        ctx.status = 400
        ctx.body = {
          error,
          message: 'bodyParser解析错误',
        }
      },
    }))
    .use(apiRouter.routes()).use(apiRouter.allowedMethods())

  app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server is running on port ${process.env.PORT}`)
  })
})()
