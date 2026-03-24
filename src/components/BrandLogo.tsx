import logo from '../assets/v987-18a.jpg'

type BrandLogoProps = {
  variant?: 'sidebar' | 'auth'
}

export function BrandLogo({ variant = 'sidebar' }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${variant}`} aria-hidden>
      <img src={logo} alt="" className="brand-logo__img" decoding="async" />
    </span>
  )
}
