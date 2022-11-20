import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getToken } from './utils/auth'
import { useAuthDispatch, useAuthState } from '~/context/AuthContext'
import Home from '~/pages/home'
import Login from '~/pages/login'
import UserInfo from '~/pages/userInfo'
import type { ProtectedRouteProps } from '~/components/ProtectedRoute'
import ProtectedRoute from '~/components/ProtectedRoute'
import Page404 from '~/layouts/404'

interface routeType {
  path: string
  element: JSX.Element
  isProtectedRoute: Boolean
}

const routes: routeType[] = [
  {
    path: '/',
    element: <Home />,
    isProtectedRoute: true,
  },
  {
    path: '/:username',
    element: <Home />,
    isProtectedRoute: true,
  },
  {
    path: 'userinfo',
    element: <UserInfo />,
    isProtectedRoute: true,
  },
  {
    path: 'login',
    element: <Login />,
    isProtectedRoute: false,
  },
  {
    path: '*',
    element: <Page404 />,
    isProtectedRoute: false,
  },
]

const APP = () => {
  const { redirectPath } = useAuthState()
  const authenticated = !!getToken()
  const dispatch = useAuthDispatch()
  const setRedirectPath = (path: string) => {
    dispatch({ type: 'SET_REDIRECT_PATH', payload: path })
  }
  if (!redirectPath)
    setRedirectPath('/')

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    authenticated,
    authenticationPath: '/login',
    redirectPath,
    setRedirectPath,
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Home />} />} />
          <Route path="/:username" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Home />} />} />
          <Route path="userinfo" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<UserInfo />} />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Page404 />} /> */}
          {routes.map(r => (
            <Route path={r.path} element={r.isProtectedRoute ? <ProtectedRoute {...defaultProtectedRouteProps} outlet={r.element} /> : r.element} key={r.path} />
          ))}
        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default APP
