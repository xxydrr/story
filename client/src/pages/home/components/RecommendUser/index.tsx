import type { FC } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { User } from '../../types'
import { axiosDelete, axiosPost } from '~/utils/http'
import { useRelationshipState } from '~/context/RelationshipContext'

export interface RecommendUserProps {
  user: User
  isFollowing: boolean
}

const RecommendUser: FC<RecommendUserProps> = ({ user, isFollowing = false }) => {
  const { setFollowings, followings: contextFollowings } = useRelationshipState()
  const [followed, setFollowed] = useState(isFollowing)
  const [loading, setLoading] = useState(false)
  const handleFollow = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axiosPost(`/relationship/follow/${user._id}`)
      setFollowed(true)
      const count = contextFollowings
      setFollowings(count + 1)
    }
    catch (error) {
      // do nothing
    }
    setLoading(false)
  }
  const handleUnfollow = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axiosDelete(`/relationship/unfollow/${user._id}`)
      setFollowed(false)
      const count = contextFollowings
      setFollowings(count - 1)
    }
    catch (error) {
      // do nothing
    }
    setLoading(false)
  }

  return (

    <div className="flex border-b border-solid border-grey-light">
      <div className="py-2">
        <Link to={`/${user.username}`} >
          <img src={user.avatar} alt="follow1" className="w-12 h-12 rounded-full" />
        </Link>
      </div>
      <div className="flex-1 w-full py-2 pl-2">
        <div className="flex justify-between mb-1">
          <div>
            <Link to={`/${user.username}`} className="font-bold text-black">{user.username}</Link>
          </div>
        </div>
        <div>
          {!followed && <Button type="primary" loading={loading} shape="round" onClick={handleFollow} >
            Follow
          </Button>}
          {followed && <Button loading={loading} shape="round" onClick={handleUnfollow} > Following </Button>}
        </div>
      </div>
    </div>

  )
}

export default RecommendUser
