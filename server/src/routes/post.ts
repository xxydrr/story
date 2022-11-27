import Router from 'koa-router'
import { createPost, deletePost, getLatestPosts, getPosts, getPostsCount, updatePost } from '~/controllers/post'
import { authJwt } from '~/utils/auth'

const router = new Router()
  .post('/', authJwt, createPost)
  .get('/', authJwt, getLatestPosts)

  .put('/:id', authJwt, updatePost)
  .delete('/:id', authJwt, deletePost)
  .get('/:username/profile', authJwt, getPosts)
  .get('/count', authJwt, getPostsCount)

export default router
