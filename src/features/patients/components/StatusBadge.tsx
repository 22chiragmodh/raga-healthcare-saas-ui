import type { Patient } from '../../../types/patient'

export function StatusBadge({ status }: { status: Patient['status'] }) {
  const label =
    status === 'active' ? 'Active' : status === 'review' ? 'Review' : 'Discharged'
  return <span className={`status-badge status-badge--${status}`}>{label}</span>
}
