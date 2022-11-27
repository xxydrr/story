import User from '~/model/User'
import Post from '~/model/Post'
// crate post
export const createPost = async (ctx: Context) => {
  const { title, content, type } = ctx.request.body
  const { id } = ctx.state.user

  const newPost = new Post({ userId: id, title, content, type })
  const post = await newPost.save()
  ctx.responseSuccess(post, 201)
}

// update post
export const updatePost = async (ctx: Context) => {
  const post = await Post.findById(ctx.params.id)
  if (post?.userId === ctx.request.body.userId) {
    await post?.updateOne({ $set: ctx.request.body })
    return ctx.responseSuccess(post)
  }
  return ctx.throw(403, 'you can update only your post')
}

// delete post
export const deletePost = async (ctx: Context) => {
  const post = await Post.findById(ctx.params.id)
  if (post?.userId === ctx.state.user.id) {
    await post?.deleteOne()
    return ctx.responseSuccess({ message: 'the post has been deleted' }, 204)
  }
  return ctx.throw(403, 'you can delete only your post')
}

// get post
export const getPosts = async (ctx: Context) => {
  const { page = 1, limit = 3, title = '' } = ctx.query
  const username = ctx.params.username

  const user = await User.findOne({ username })

  const posts = await Post.find({ userId: user?._id, title: { $regex: title, $options: 'i' } }).sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
  // find post  populate user profile
  const postsWithUser = await Promise.all(
    posts.map(async (post) => {
      const user = await User.findById(post.userId)
      return { ...post._doc, avatar: user?.avatar, username: user?.username }
    }),
  )
  ctx.responseSuccess({ posts: postsWithUser, count: posts.length })
}

// get  posts count
export const getPostsCount = async (ctx: Context) => {
  const { id } = ctx.state.user

  const count = await Post.find({ userId: id }).countDocuments()
  ctx.responseSuccess({ count })
}

// get random posts
export const getRandomPosts = async (ctx: Context) => {
  const posts = await Post.aggregate([{ $sample: { size: 10 } }])
  ctx.responseSuccess(posts)
}

// fuzzy search Latest posts by page and limit
export const getLatestPosts = async (ctx: Context) => {
  const { page = 1, limit = 3, title = '' } = ctx.query
  const posts = await Post.find({ title: { $regex: title, $options: 'i' } })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

  const postsWithUser = await Promise.all(
    posts.map(async (post) => {
      const user = await User.findById(post.userId)
      return { ...post._doc, avatar: user?.avatar, username: user?.username }
    }),
  )
  ctx.responseSuccess({ posts: postsWithUser, count: posts.length })
}
