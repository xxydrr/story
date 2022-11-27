import Post from '~/model/Post'
import Like from '~/model/Like'

// like / dislike a post
export const likePost = async (ctx: Context) => {
  const post = await Post.findById(ctx.params.id)
  const { id } = ctx.state.user
  const like = await Like.findOne({ userId: id, postId: post?._id })
  if (!like) {
    const newLike = new Like({
      userId: id,
      postId: post?._id,
    })
    await newLike.save()
    ctx.responseSuccess({ message: 'you liked the post' })
  }
  else {
    await like.delete()
    ctx.responseSuccess({ message: 'The post has been disliked' })
  }
}

// get all likes of a post
export const getLikes = async (ctx: Context) => {
  const post = await Post.findById(ctx.params.id)
  const likes = await Like.find({ postId: post?._id })
  ctx.responseSuccess({ likes })
}

// get all likes of a post count
export const getLikesCount = async (ctx: Context) => {
  const post = await Post.findById(ctx.params.id)
  const likes = await Like.find({ postId: post?._id })
  ctx.responseSuccess({ count: likes.length })
}

// 用户收获的所有点赞数
export const getLikesCountByUser = async (ctx: Context) => {
  // const userId = ctx.params.id
  const { id } = ctx.state.user
  const likes = await Like.find({ userId: id }).countDocuments()
  ctx.responseSuccess(likes)
}

// get user is liked a post
export const isLiked = async (ctx: Context) => {
  const post = await Post.findById(ctx.params.id)
  const { id } = ctx.state.user
  const like = await Like.findOne({ userId: id, postId: post?._id })
  if (like)
    ctx.responseSuccess({ isLiked: true })
  else
    ctx.responseSuccess({ isLiked: false })
}
