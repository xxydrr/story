import Router from 'koa-router'
import { createComment, getComments } from '~/controllers/comment'
import { authJwt } from '~/utils/auth'

const router = new Router()

  .post('/', authJwt, createComment)
  .get('/:postId', authJwt, getComments)

export default router
