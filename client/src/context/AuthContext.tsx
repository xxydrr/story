import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { message } from 'antd'
import { getToken, removeToken } from '~/utils/auth'
import { axiosGet } from '~/utils/http'

export interface IUser {
  username: string
  email: string
  phone: string
  avatar: string
  isAdmin: boolean
  groups: string[]
  desc: string
  country: string
  city: string
  from: string
  createdAt: string
  _id: string
}
export type User = Partial<IUser> | null
interface AuthState {
  authenticated: boolean
  user: User
  loading: boolean
  redirectPath: string

}

type Action =
  | { type: 'SET_REDIRECT_PATH'; payload: string }

  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'POPULATE'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'STOP_LOADING' }
type Dispatch = React.Dispatch<Action>

const initState: AuthState = {
  authenticated: Boolean(getToken()),
  user: null,
  loading: false,
  redirectPath: '/',
}

export const StateContext = createContext<AuthState>(initState)
const DispatchContext = createContext((() => { }) as Dispatch)

const AuthReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'SET_REDIRECT_PATH':
      return {
        ...state,
        redirectPath: action.payload,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      removeToken()
      return {
        ...state,
        user: null,
      }

    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      }
    default:
      throw new Error('Unknown action type')
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initState)
  useEffect(() => {
    if (state.authenticated && !state.user) {
      axiosGet<IUser>('/user/')
        .then((res) => {
          dispatch({ type: 'LOGIN_SUCCESS', payload: res })
        }).catch((e) => {
          dispatch({ type: 'LOGOUT' })
          message.error(e.message)
          location.href = '/login'
        })
    }
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default AuthProvider
export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch: () => Dispatch = () =>
  useContext(DispatchContext)
