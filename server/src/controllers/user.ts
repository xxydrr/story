import mongoose from 'mongoose'
import type { IUser } from '~/model/User'
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

// get randow 5 recommend exclude current user and user already follow
export const getRecommendUsers = async (ctx: Context) => {
  const user = await User.findById(ctx.state.user.id)
  const followings = user?.followings!.reduce((acc: mongoose.Types.ObjectId[], cur: string) => {
    acc.push(new mongoose.Types.ObjectId(cur))
    return acc
  }, [new mongoose.Types.ObjectId(user._id)])

  const users = await User.aggregate([

    { $match: { _id: { $nin: followings } } },
    { $sample: { size: 5 } },
  ])

  ctx.responseSuccess(users)
}

// get  6 recommend user
// export const getRecommendUsers = async (ctx: Context) => {
//   const user = await User.findById(ctx.state.user.id)
//   const users = await User.find({ _id: { $nin: user!.followings } }).limit(6)
//   ctx.responseSuccess(users)
// }

// // 获取任意五个用户，不包括已经关注的用户
// export const getRecommendUsers = async (ctx: Context) => {
//   const user = await User.findById(ctx.state.user.id)
//   const users = await User.aggregate([
//     { $match: { _id: { $nin: user!.followings } } },
//     { $sample: { size: 5 } },
//   ])
//   ctx.responseSuccess(users)
// }
// Get any five users, excluding those who have followed.

// export const getRecommendUsers = async (ctx: Context) => {
//   const user = await User.findById(ctx.state.user.id)
//   const users = await User.aggregate([
//     { $match: { _id: { $nin: user!.followers } } },
//     { $sample: { size: 5 } },
//   ])
//   ctx.responseSuccess({ users })
// }

// export const getRecommendUsers = async (ctx: Context) => {
//   const users = await User.aggregate([{ $sample: { size: 5 } }])
//   ctx.responseSuccess(users)
// }

// follow a user
export const followUser = async (ctx: Context) => {
  const userId = ctx.params.id
  const currentUserId = ctx.state.user.id

  if (userId !== currentUserId) {
    const user = await User.findById(userId)
    if (!user)
      return ctx.responseError(404, 'User not found.')
    const currentUser = await User.findById(currentUserId)
    if (!user.followers!.includes(currentUserId)) {
      await user!.updateOne({ $push: { followers: currentUserId } })
      await currentUser!.updateOne({ $push: { followings: userId } })
      ctx.responseSuccess('user has been followed')
    }
    else {
      ctx.throw(403, 'you already follow this user')
    }
  }
  else {
    ctx.throw(403, 'you can not follow yourself')
  }
}

// unfollow a user
export const unfollowUser = async (ctx: Context) => {
  const userId = ctx.params.id
  const currentUserId = ctx.state.user.id

  if (userId !== currentUserId) {
    const user = await User.findById(userId)
    if (!user)
      return ctx.responseError(404, 'User not found.')
    const currentUser = await User.findById(currentUserId)
    if (user.followers!.includes(currentUserId)) {
      await user!.updateOne({ $pull: { followers: currentUserId } })
      await currentUser!.updateOne({ $pull: { followings: userId } })
      ctx.responseSuccess('user has been unfollowed')
    }
    else {
      ctx.throw(403, 'you do not follow this user')
    }
  }
  else {
    ctx.throw(403, 'you can not unfollow yourself')
  }
}

// get user's followers
export const getUserFollowers = async (ctx: Context) => {
  const user = await User.findById(ctx.params.id)
  if (!user)
    return ctx.throw(404, 'user not found')
  const followers = await Promise.all(
    user.followers!.map((followerId: string) => {
      return User.findById(followerId)
    }),
  )
  const followersList = followers.map((follower) => {
    const { _id, username, avatar } = follower!
    return { _id, username, avatar }
  })
  ctx.responseSuccess(followersList)
}

// get user's following
export const getUserFollowing = async (ctx: Context) => {
  const user = await User.findById(ctx.params.id)
  if (!user)
    return ctx.throw(404, 'user not found')
  const followings = await Promise.all(
    user.followings!.map((followingId: string) => {
      return User.findById(followingId)
    }),
  )
  const followingsList = followings.map((following) => {
    const { _id, username, avatar } = following!
    return { _id, username, avatar }
  },
  )
  ctx.responseSuccess(followingsList)
}

// get users
export const getUsers = async (ctx: Context) => {
  const { limit, page, username = '' } = ctx.query
  const users = await User.find({ username: { $regex: username } }).limit(Number(limit)).skip(Number(limit) * (Number(page) - 1))
  const usersInfo: Exclude<IUser, 'password' | 'updatedAt' >[] = users.map((user) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, updatedAt, followers, followings, ...other } = user!._doc

    return { ...other, following: followings.length, followers: followers.length }
  })
  ctx.responseSuccess({ result: usersInfo, total: users.length })
}
