import { create } from 'zustand'
import type { Patient, PatientViewMode } from '../types/patient'

const mockPatients: Patient[] = [
  {
    id: '1',
    fullName: 'Jordan Lee',
    dateOfBirth: '1988-04-12',
    mrn: 'MRN-10042',
    lastVisit: '2025-03-18',
    primaryCare: 'Dr. A. Patel',
    status: 'active',
  },
  {
    id: '2',
    fullName: 'Samira Khan',
    dateOfBirth: '1975-11-03',
    mrn: 'MRN-10088',
    lastVisit: '2025-03-10',
    primaryCare: 'Dr. M. Ortiz',
    status: 'review',
  },
  {
    id: '3',
    fullName: 'Chris Morgan',
    dateOfBirth: '1992-07-22',
    mrn: 'MRN-10102',
    lastVisit: '2025-02-28',
    primaryCare: 'Dr. A. Patel',
    status: 'active',
  },
  {
    id: '4',
    fullName: 'Priya Desai',
    dateOfBirth: '1964-01-30',
    mrn: 'MRN-10119',
    lastVisit: '2025-03-20',
    primaryCare: 'Dr. L. Chen',
    status: 'active',
  },
  {
    id: '5',
    fullName: 'Alex Rivera',
    dateOfBirth: '2001-09-05',
    mrn: 'MRN-10133',
    lastVisit: '2024-12-15',
    primaryCare: 'Dr. M. Ortiz',
    status: 'discharged',
  },
  {
    id: '6',
    fullName: 'Taylor Brooks',
    dateOfBirth: '1990-12-18',
    mrn: 'MRN-10140',
    lastVisit: '2025-03-21',
    primaryCare: 'Dr. L. Chen',
    status: 'review',
  },
]

interface PatientState {
  patients: Patient[]
  viewMode: PatientViewMode
  setViewMode: (mode: PatientViewMode) => void
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: mockPatients,
  viewMode: 'grid',
  setViewMode: (viewMode) => set({ viewMode }),
}))
