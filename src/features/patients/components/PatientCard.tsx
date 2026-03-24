import type { Patient } from '../../../types/patient'
import { StatusBadge } from './StatusBadge'

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <article className="patient-card">
      <header className="patient-card__header">
        <h3 className="patient-card__name">{patient.fullName}</h3>
        <StatusBadge status={patient.status} />
      </header>
      <dl className="patient-card__meta">
        <div>
          <dt>MRN</dt>
          <dd>{patient.mrn}</dd>
        </div>
        <div>
          <dt>DOB</dt>
          <dd>{patient.dateOfBirth}</dd>
        </div>
        <div>
          <dt>Last visit</dt>
          <dd>{patient.lastVisit}</dd>
        </div>
        <div>
          <dt>PCP</dt>
          <dd>{patient.primaryCare}</dd>
        </div>
      </dl>
    </article>
  )
}
