import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { axiosGet } from '~/utils/http'

// likes is the state
// LikesHandler is a function for changing the state.
interface LikesState {
  likes: number
  likesHandler: (likes: number) => void
}
export const LikesContext = createContext<LikesState>({
  likes: 0,
  likesHandler: () => { },
})

// Defining a simple HOC component
const LikesContextProvider = ({ children }: { children: ReactNode }) => {
  const [likes, setlikes] = useState(0)

  const likesHandler = (likes: number): void => {
    setlikes(likes)
  }
  useEffect(() => {
    axiosGet<{ count: number }>('/like/count').then((res) => {
      setlikes(res.count)
    })
  }, [])

  return (
    <LikesContext.Provider
      value={{ likes, likesHandler }}
    >
      {children}
    </LikesContext.Provider>
  )
}

export default LikesContextProvider
export const useLikesState = () => useContext(LikesContext)
