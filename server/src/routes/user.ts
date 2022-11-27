import Router from 'koa-router'
import { deleteUser, getRecommendUsers, getUser, getUsers, updateUser } from '~/controllers/user'
import { authJwt, verifyAdmin } from '~/utils/auth'
const router = new Router()
  .get('/', authJwt, getUser)
  .put('/', authJwt, updateUser)
  .delete('/', deleteUser)
  .get('/all', authJwt, verifyAdmin, getUsers)

  .get('/recommend', authJwt, getRecommendUsers)

export default router
