import { useMemo, useState } from 'react'
import { showCareTeamLocalAlert } from '../lib/localNotification'
import { usePatientStore } from '../store/patientStore'

export function DashboardPage() {
  const patients = usePatientStore((s) => s.patients)
  const [notifyMessage, setNotifyMessage] = useState<string | null>(null)
  const [notifyBusy, setNotifyBusy] = useState(false)

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
        <h3 className="panel__title">Notifications demo</h3>
        <p className="muted" style={{ margin: '0 0 0.75rem', fontSize: '0.95rem' }}>
          Uses the registered service worker to show a local notification (browser permission
          required). Works on HTTPS and on <code className="inline-code">localhost</code>.
        </p>
        <div className="inline-actions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={notifyBusy}
            onClick={async () => {
              setNotifyBusy(true)
              setNotifyMessage(null)
              const result = await showCareTeamLocalAlert()
              setNotifyMessage(result.message)
              setNotifyBusy(false)
            }}
          >
            {notifyBusy ? 'Working…' : 'Simulate care team alert'}
          </button>
          {notifyMessage && (
            <span className={notifyMessage.includes('sent') ? 'text-ok' : 'form-error'}>
              {notifyMessage}
            </span>
          )}
        </div>
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
