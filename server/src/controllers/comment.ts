import Comment from '~/model/Comment'
import User from '~/model/User'
// import Post from '~/model/Post'

// create comment
export const createComment = async (ctx: Context) => {
  const { content, postId } = ctx.request.body
  const { id } = ctx.state.user
  const user = await User.findById(id)

  const newComment = new Comment({
    content,
    postId,
    userId: id,
  })
  const comment = await newComment.save()
  ctx.responseSuccess({
    ...comment._doc,
    avatar: user!.avatar,
    username: user!.username,
  }, 201)
}

// get comments
export const getComments = async (ctx: Context) => {
  const { postId } = ctx.params
  const { page = 1, limit = 10 } = ctx.query
  const comments = await Comment.find({ postId }).sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
  const results = await Promise.all(
    comments.map(async (comment) => {
      const user = await User.findById(comment.userId)
      return {
        ...comment._doc,
        avatar: user!.avatar,
        username: user!.username,
      }
    }),
  )
  ctx.responseSuccess(results)
}

