import { signOut } from 'firebase/auth'
import { NavLink, Outlet } from 'react-router-dom'
import { getFirebaseAuth } from '../../lib/firebase'
import { useAuthStore } from '../../store/authStore'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? ' nav-link--active' : ''}`

export function AppLayout() {
  const user = useAuthStore((s) => s.user)

  async function handleSignOut() {
    const auth = getFirebaseAuth()
    if (auth) await signOut(auth)
  }

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
          <div className="topbar__actions">
            <span className="topbar__user muted" title={user?.email ?? ''}>
              {user?.email ?? 'Signed in'}
            </span>
            <button type="button" className="btn btn--ghost" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
