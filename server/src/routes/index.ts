import Router from 'koa-router'
import type { Context, DefaultState } from 'koa'
import auth from './auth'
import user from './user'
import post from './post'
import comment from './comment'
import like from './like'
import relationship from './relationship'
const apiRouter = new Router<DefaultState, Context>({ prefix: '/api' })
  .use('/auth', auth.routes(), auth.allowedMethods())
  .use('/user', user.routes(), user.allowedMethods())

  .use('/post', post.routes(), post.allowedMethods())
  .use('/comment', comment.routes(), comment.allowedMethods())
  .use('/like', like.routes(), like.allowedMethods())
  .use('/relationship', relationship.routes(), relationship.allowedMethods())
export default apiRouter
