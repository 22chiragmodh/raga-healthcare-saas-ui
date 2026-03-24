import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

/** Temporary bootstrap until Firebase auth subscription is wired. */
export function AuthBootstrap() {
  const setInitialized = useAuthStore((s) => s.setInitialized)

  useEffect(() => {
    setInitialized(true)
  }, [setInitialized])

  return null
}
