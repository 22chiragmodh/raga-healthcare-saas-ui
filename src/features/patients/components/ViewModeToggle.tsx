import type { PatientViewMode } from '../../../types/patient'

interface ViewModeToggleProps {
  value: PatientViewMode
  onChange: (mode: PatientViewMode) => void
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="view-toggle" role="group" aria-label="Patient view mode">
      <button
        type="button"
        className={`view-toggle__btn${value === 'grid' ? ' view-toggle__btn--active' : ''}`}
        onClick={() => onChange('grid')}
        aria-pressed={value === 'grid'}
      >
        Grid
      </button>
      <button
        type="button"
        className={`view-toggle__btn${value === 'list' ? ' view-toggle__btn--active' : ''}`}
        onClick={() => onChange('list')}
        aria-pressed={value === 'list'}
      >
        List
      </button>
    </div>
  )
}
