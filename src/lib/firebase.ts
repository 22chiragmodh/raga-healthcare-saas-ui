import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

function readWebConfig() {
  const env = import.meta.env
  if (!env.VITE_FIREBASE_API_KEY) return null
  return {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  }
}

let app: FirebaseApp | null = null

export function getFirebaseApp(): FirebaseApp | null {
  if (app) return app
  const config = readWebConfig()
  if (!config) return null
  app = initializeApp(config)
  return app
}

export function getFirebaseAuth(): Auth | null {
  const instance = getFirebaseApp()
  return instance ? getAuth(instance) : null
}

export function isFirebaseConfigured(): boolean {
  return readWebConfig() !== null
}
