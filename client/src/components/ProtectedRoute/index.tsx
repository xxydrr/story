import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router'

export interface ProtectedRouteProps {
  authenticated: boolean
  authenticationPath: string
  redirectPath: string
  setRedirectPath: (path: string) => void
  outlet: JSX.Element
}

export default function ProtectedRoute({ authenticated, authenticationPath, redirectPath, setRedirectPath, outlet }: ProtectedRouteProps) {
  const currentLocation = useLocation()

  useEffect(() => {
    if (!authenticated)
      setRedirectPath(currentLocation.pathname)
  }, [authenticated, setRedirectPath, currentLocation])

  if (authenticated)
    return outlet
  else
    return <Navigate to={{ pathname: authenticated ? redirectPath : authenticationPath }} />
}
