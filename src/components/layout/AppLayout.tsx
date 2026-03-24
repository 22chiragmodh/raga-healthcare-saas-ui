import { NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? ' nav-link--active' : ''}`

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="sidebar__brand">
          <span className="sidebar__logo" aria-hidden />
          <div>
            <strong>RAGA Care</strong>
            <span className="sidebar__tag">Clinical workspace</span>
          </div>
        </div>
        <nav className="sidebar__nav">
          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={linkClass}>
            Analytics
          </NavLink>
          <NavLink to="/patients" className={linkClass}>
            Patients
          </NavLink>
        </nav>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <h1 className="topbar__title">Overview</h1>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
