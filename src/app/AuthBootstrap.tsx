import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { getFirebaseAuth } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'

export function AuthBootstrap() {
  const setUser = useAuthStore((s) => s.setUser)
  const setInitialized = useAuthStore((s) => s.setInitialized)

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setInitialized(true)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? { uid: firebaseUser.uid, email: firebaseUser.email }
          : null,
      )
      setInitialized(true)
    })

    return unsubscribe
  }, [setUser, setInitialized])

  return null
}
