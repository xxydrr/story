import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthState } from './AuthContext'
import { axiosGet } from '~/utils/http'

interface RelationshipState {
  likes: number
  followings: number
  followers: number
  setLikes: (likes: number) => void
  setFollowings: (followings: number) => void
  setFollowers: (followers: number) => void
}
export const RelationshipContext = createContext<RelationshipState>({
  likes: 0,
  followings: 0,
  followers: 0,
  setLikes: () => { },
  setFollowings: () => { },
  setFollowers: () => { },
})

// Defining a simple HOC component
const RelationshipContextProvider = ({ children }: { children: ReactNode }) => {
  const [likes, setLikes] = useState(0)
  const [followings, setFollowings] = useState(0)
  const [followers, setFollowers] = useState(0)
  const { user } = useAuthState()

  useEffect(() => {
    if (user) {
      axiosGet<number>('/like/count').then((res) => {
        setLikes(res)
      })
      axiosGet<number>(`/relationship/followings/count/${user._id}`).then((res) => {
        setFollowings(res)
      })
      axiosGet<number>(`/relationship/followers/count/${user._id}`).then((res) => {
        setFollowers(res)
      })
    }
  }, [user])

  return (
    <RelationshipContext.Provider
      value={{ likes, followings, followers, setLikes, setFollowings, setFollowers }}
    >
      {children}
    </RelationshipContext.Provider>
  )
}

export default RelationshipContextProvider
export const useRelationshipState = () => useContext(RelationshipContext)
