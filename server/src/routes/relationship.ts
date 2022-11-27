import Router from 'koa-router'

import { createRelationship, deleteRelationship, getFollowers, getFollowersCount, getFollowings, getFollowingsCount } from '~/controllers/relationship'
import { authJwt } from '~/utils/auth'

const router = new Router()
  .get('/followers/:followingId', authJwt, getFollowers)
  .get('/followings/:followerId', authJwt, getFollowings)
  .get('/followers/count/:followingId', authJwt, getFollowersCount)
  .get('/followings/count/:followerId', authJwt, getFollowingsCount)
  .delete('/unfollow/:followingId', authJwt, deleteRelationship)
  .post('/follow/:followingId', authJwt, createRelationship)

export default router
