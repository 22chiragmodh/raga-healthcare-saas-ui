export type PatientStatus = 'active' | 'review' | 'discharged'

export interface Patient {
  id: string
  fullName: string
  dateOfBirth: string
  mrn: string
  lastVisit: string
  primaryCare: string
  status: PatientStatus
}

export type PatientViewMode = 'grid' | 'list'
