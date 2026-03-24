import { create } from 'zustand'

export interface AuthUser {
  uid: string
  email: string | null
}

interface AuthState {
  user: AuthUser | null
  initialized: boolean
  setUser: (user: AuthUser | null) => void
  setInitialized: (value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  setUser: (user) => set({ user }),
  setInitialized: (initialized) => set({ initialized }),
}))
