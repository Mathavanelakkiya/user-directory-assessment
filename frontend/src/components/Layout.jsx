import { NavLink, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import logo from "../../public/CFS.png"

export default function Layout() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="app-shell">
      <header className="topbar">
         <img src={logo} alt="User Directory" className="brand-logo" />

        <nav>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/users"
          >
            List
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/add"
          >
            Add
          </NavLink>

          {!isAuthenticated && (
            <button
              type="button"
              className="nav-link"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          )}

          {isAuthenticated && (
            <>
              <span className="nav-link">
                {user?.name || user?.email || 'User'}
              </span>

              <button
                type="button"
                className="nav-link"
                onClick={() =>
                  logout({
                    logoutParams: {
                      returnTo: window.location.origin,
                    },
                  })
                }
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}