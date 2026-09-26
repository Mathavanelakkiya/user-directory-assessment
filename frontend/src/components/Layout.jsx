import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">User Directory</div>
        <nav>
          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/users">List</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/add">Add</NavLink>
        </nav>
      </header>
      <main className="container"><Outlet /></main>
    </div>
  )
}
