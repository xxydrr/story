import User from '~/model/User'
import Relationship from '~/model/Relationship'

// create relationship
export const createRelationship = async (ctx: Context) => {
  const { followingId } = ctx.params
  const { id } = ctx.state.user

  const newRelationship = new Relationship({
    followerId: id,
    followingId,
  })
  await newRelationship.save()
  ctx.responseSuccess('you followed the user')
}

// get relationship followers
export const getFollowers = async (ctx: Context) => {
  const { followingId } = ctx.params
  const { page = 1, limit = 10 } = ctx.query
  const { id } = ctx.state.user

  const followers = await Relationship.find({ followingId })
    .skip((page - 1) * limit)
    .limit(limit)
  const results = await Promise.all(
    followers.map(async (follower) => {
      const user = await User.findById(follower.followerId)
      const interconnection = await Relationship.findOne({
        followerId: id,
        followingId: follower.followerId,
      })
      return {
        _id: user!._id,
        avatar: user!.avatar,
        username: user!.username,
        isFollowing: !!interconnection,
      }
    }),
  )
  ctx.responseSuccess(results)
}

// get relationship followings
export const getFollowings = async (ctx: Context) => {
  const { followerId } = ctx.params
  const { page = 1, limit = 10 } = ctx.query
  const followings = await Relationship
    .find({
      followerId,
    })
    .skip((page - 1) * limit)
    .limit(limit)
  const results = await Promise.all(
    followings.map(async (following) => {
      const user = await User.findById(following.followingId)
      return {
        _id: user!._id,
        avatar: user!.avatar,
        username: user!.username,
      }
    }),
  )
  ctx.responseSuccess(results)
}

// get relationship followers count
export const getFollowersCount = async (ctx: Context) => {
  const { followingId } = ctx.params
  const count = await Relationship.countDocuments({ followingId })
  ctx.responseSuccess(count)
}

// get relationship followings count
export const getFollowingsCount = async (ctx: Context) => {
  const { followerId } = ctx.params
  const count = await Relationship.countDocuments({ followerId })
  ctx.responseSuccess(count)
}

// delete relationship
export const deleteRelationship = async (ctx: Context) => {
  const { followingId } = ctx.params
  const { id } = ctx.state.user
  await Relationship
    .findOneAndDelete({
      followerId: id,
      followingId,
    })
  ctx.responseSuccess('user has been unfollowed', 204)
}
