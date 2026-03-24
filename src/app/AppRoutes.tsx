import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { PatientsPage } from '../pages/PatientsPage'
import { useAuthStore } from '../store/authStore'

function GuestRoute({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore()

  if (!initialized) {
    return (
      <div className="auth-page">
        <p className="muted">Checking session…</p>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore()

  if (!initialized) {
    return (
      <div className="page page--centered">
        <p className="muted">Checking session…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="patients" element={<PatientsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
