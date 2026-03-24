import { PatientCard } from '../features/patients/components/PatientCard'
import { StatusBadge } from '../features/patients/components/StatusBadge'
import { ViewModeToggle } from '../features/patients/components/ViewModeToggle'
import { usePatientStore } from '../store/patientStore'

export function PatientsPage() {
  const patients = usePatientStore((s) => s.patients)
  const viewMode = usePatientStore((s) => s.viewMode)
  const setViewMode = usePatientStore((s) => s.setViewMode)

  return (
    <section className="page">
      <header className="page-header page-header--split">
        <div>
          <h2 className="page-header__title">Patients</h2>
          <p className="page-header__desc muted">
            Directory with grid and list layouts. Data is local for this demo.
          </p>
        </div>
        <ViewModeToggle value={viewMode} onChange={setViewMode} />
      </header>

      {viewMode === 'grid' ? (
        <div className="patient-grid">
          {patients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="patient-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">MRN</th>
                <th scope="col">DOB</th>
                <th scope="col">Last visit</th>
                <th scope="col">PCP</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td className="patient-table__strong">{p.fullName}</td>
                  <td>{p.mrn}</td>
                  <td>{p.dateOfBirth}</td>
                  <td>{p.lastVisit}</td>
                  <td>{p.primaryCare}</td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
