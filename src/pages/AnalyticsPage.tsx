import { useMemo } from 'react'
import { usePatientStore } from '../store/patientStore'

export function AnalyticsPage() {
  const patients = usePatientStore((s) => s.patients)

  const { segments, max } = useMemo(() => {
    const counts = {
      active: 0,
      review: 0,
      discharged: 0,
    }
    for (const p of patients) {
      counts[p.status] += 1
    }
    const segments = [
      { key: 'active', label: 'Active', count: counts.active, tone: 'tone-a' },
      { key: 'review', label: 'Review', count: counts.review, tone: 'tone-b' },
      {
        key: 'discharged',
        label: 'Discharged',
        count: counts.discharged,
        tone: 'tone-c',
      },
    ] as const
    const max = Math.max(1, ...segments.map((s) => s.count))
    return { segments, max }
  }, [patients])

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h2 className="page-header__title">Analytics</h2>
          <p className="page-header__desc muted">
            Panel mix derived from the current patient directory (demo data).
          </p>
        </div>
      </header>

      <div className="panel analytics-panel">
        <h3 className="panel__title">Status distribution</h3>
        <div className="bar-chart" role="list">
          {segments.map((s) => (
            <div key={s.key} className="bar-row" role="listitem">
              <span className="bar-row__label">{s.label}</span>
              <div className="bar-row__track" aria-hidden>
                <div
                  className={`bar-row__fill ${s.tone}`}
                  style={{ width: `${(s.count / max) * 100}%` }}
                />
              </div>
              <span className="bar-row__value">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3 className="panel__title">Throughput insight</h3>
        <p className="muted" style={{ margin: 0, fontSize: '0.95rem' }}>
          Review volume helps care teams prioritize outreach. In a production deployment,
          this module would connect to warehouse metrics and scheduled jobs instead of
          in-memory demo data.
        </p>
      </div>
    </section>
  )
}
