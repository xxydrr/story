import type { IUser } from '~/model/User'
import Relationship from '~/model/Relationship'
import User from '~/model/User'
// update user
export const updateUser = async (ctx: Context) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...reqother } = ctx.request.body

  const user = await User.findByIdAndUpdate(ctx.state.user.id, { $set: reqother }, { new: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, updatedAt, ...other } = user!._doc
  ctx.responseSuccess({ ...other })
}

// delete user
export const deleteUser = async (ctx: Context) => {
  try {
    await User.findByIdAndDelete(ctx.state.user.id)
    ctx.responseSuccess('User has been deleted.', 204)
  }
  catch (error) {
    ctx.app.emit('error', error, ctx)
  }
}

// get user
export const getUser = async (ctx: Context) => {
  const user = await User.findById(ctx.state.user.id)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, updatedAt, ...other } = user!._doc

  ctx.responseSuccess({ ...other })
}
// get randow 5 recommend users
export const getRecommendUsers = async (ctx: Context) => {
  const { id } = ctx.state.user
  const followingIds = await Relationship.find({
    followerId: id,
  }).select('followingId')
  const followingIdsArray = followingIds.map(followingId => followingId.followingId)
  const users = await User.find({
    _id: { $nin: [...followingIdsArray, id] },
  }).limit(5)
  ctx.responseSuccess(users)
}

// get users
export const getUsers = async (ctx: Context) => {
  const { limit, page, username = '' } = ctx.query
  const users = await User.find({ username: { $regex: username } }).limit(Number(limit)).skip(Number(limit) * (Number(page) - 1))
  const usersInfo: Exclude<IUser, 'password' | 'updatedAt'>[] = users.map((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, updatedAt, ...other } = user!._doc

    return other
  })
  ctx.responseSuccess({ result: usersInfo, total: users.length })
}
