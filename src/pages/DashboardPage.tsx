import { useMemo } from 'react'
import { usePatientStore } from '../store/patientStore'

export function DashboardPage() {
  const patients = usePatientStore((s) => s.patients)

  const stats = useMemo(() => {
    const active = patients.filter((p) => p.status === 'active').length
    const review = patients.filter((p) => p.status === 'review').length
    const recent = patients.filter((p) => p.lastVisit >= '2025-03-01').length
    return {
      total: patients.length,
      active,
      review,
      recent,
    }
  }, [patients])

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h2 className="page-header__title">Dashboard</h2>
          <p className="page-header__desc muted">
            Operational snapshot for your organization&apos;s patient panel.
          </p>
        </div>
      </header>

      <div className="metric-grid">
        <article className="metric-card">
          <span className="metric-card__label">Patients on panel</span>
          <strong className="metric-card__value">{stats.total}</strong>
          <span className="metric-card__hint muted">Directory records</span>
        </article>
        <article className="metric-card">
          <span className="metric-card__label">Active care</span>
          <strong className="metric-card__value">{stats.active}</strong>
          <span className="metric-card__hint muted">Currently engaged</span>
        </article>
        <article className="metric-card">
          <span className="metric-card__label">Needs review</span>
          <strong className="metric-card__value">{stats.review}</strong>
          <span className="metric-card__hint muted">Triage or follow-up</span>
        </article>
        <article className="metric-card">
          <span className="metric-card__label">Visits (Mar 2025)</span>
          <strong className="metric-card__value">{stats.recent}</strong>
          <span className="metric-card__hint muted">Based on last visit date</span>
        </article>
      </div>

      <div className="panel">
        <h3 className="panel__title">Today&apos;s focus</h3>
        <ul className="checklist">
          <li>Review patients flagged for clinical follow-up.</li>
          <li>Confirm analytics trends before care program check-in.</li>
          <li>Sync roster updates with your EHR workflow.</li>
        </ul>
      </div>
    </section>
  )
}
