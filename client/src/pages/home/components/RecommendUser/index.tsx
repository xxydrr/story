import type { FC } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { axiosPatch } from '~/utils/http'
import { useAuthDispatch, useAuthState } from '~/context/AuthContext'

export interface User {
  _id: string
  username: string
  avatar: string
}

export interface RecommendUserProps {
  user: User
}

const RecommendUser: FC<RecommendUserProps> = ({ user }) => {
  const dispatch = useAuthDispatch()
  const { user: currentUser } = useAuthState()
  const [followed, setFollowed] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleFollow = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axiosPatch(`/user/${user._id}/follow`)
      setFollowed(true)
      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...currentUser, followings: [...currentUser?.followings as Array<string>, user._id] } })
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
      await axiosPatch(`/user/${user._id}/unfollow`)
      setFollowed(false)
      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...currentUser, followings: currentUser!.followings!.filter(f => f !== user._id) } })
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
