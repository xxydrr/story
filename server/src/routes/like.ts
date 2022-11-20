import Router from 'koa-router'

import { getLikes, getLikesCount, getLikesCountByUser, isLiked, likePost } from '~/controllers/like'
import { authJwt } from '~/utils/auth'

const router = new Router()
  .put('/:id/', authJwt, likePost)
  .get('/:id/', authJwt, getLikes)
  .get('/:id/count', authJwt, getLikesCount)
  .get('/:id/isLiked', authJwt, isLiked)
  .get('/count', authJwt, getLikesCountByUser)

export default router
