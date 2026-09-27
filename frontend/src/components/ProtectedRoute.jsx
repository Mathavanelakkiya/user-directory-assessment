import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  } = useAuth0()

  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: location.pathname,
        },
      })
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    location.pathname,
  ])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>
  }

  return children
}