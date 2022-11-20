import Router from 'koa-router'
import { deleteUser, followUser, getRecommendUsers, getUser, getUserFollowers, getUserFollowing, getUsers, unfollowUser, updateUser } from '~/controllers/user'
import { authJwt, verifyAdmin } from '~/utils/auth'
const router = new Router()
  .get('/', authJwt, getUser)
  .put('/', authJwt, updateUser)
  .delete('/', deleteUser)
  .get('/all', authJwt, verifyAdmin, getUsers)

  .get('/recommend', authJwt, getRecommendUsers)
  .patch('/:id/follow', authJwt, followUser)
  .patch('/:id/unfollow', authJwt, unfollowUser)
  .get('/:id/following', authJwt, getUserFollowing)
  .get('/:id/followers', authJwt, getUserFollowers)
// .post('/register', register)

export default router
