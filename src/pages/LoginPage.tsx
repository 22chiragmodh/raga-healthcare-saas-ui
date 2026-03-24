import { signInWithEmailAndPassword } from 'firebase/auth'
import { type FormEvent, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { isFirebaseConfigured, getFirebaseAuth } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'

export function LoginPage() {
  const { user, initialized } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const configured = useMemo(() => isFirebaseConfigured(), [])

  if (!initialized) {
    return (
      <div className="auth-page">
        <p className="muted">Checking session…</p>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      setError('Enter both email and password.')
      return
    }

    const auth = getFirebaseAuth()
    if (!auth) {
      setError('Firebase is not configured. Add keys to your .env file.')
      return
    }

    setSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password)
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : ''
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Incorrect email or password.')
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Try again later.')
      } else {
        setError('Sign-in failed. Check your credentials and try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <BrandLogo variant="auth" />
          <div>
            <h1 className="auth-card__title">RAGA Care</h1>
            <p className="auth-card__subtitle">Sign in to the clinical workspace</p>
          </div>
        </div>

        {!configured && (
          <div className="banner banner--warning" role="status">
            Firebase env vars are missing. Copy <code>.env.example</code> to{' '}
            <code>.env</code> and paste your project keys.
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="field__label">Work email</span>
            <input
              className="field__input"
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              disabled={submitting}
            />
          </label>
          <label className="field">
            <span className="field__label">Password</span>
            <input
              className="field__input"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              disabled={submitting}
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn--primary" type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
