// stores/useAccessFormStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AccessFormData {
  name: string
  email: string
  phone: string
}

interface AccessFormState {
  formData: AccessFormData
  accessGranted: boolean
  setFormData: (data: AccessFormData) => void
  setAccessGranted: (status: boolean) => void
  resetAccess: () => void
}

export const useAccessFormStore = create<AccessFormState>()(
  persist(
    (set) => ({
      formData: { name: '', email: '', phone: '' },
      accessGranted: false,
      setFormData: (data) => set({ formData: data }),
      setAccessGranted: (status) => set({ accessGranted: status }),
      resetAccess: () =>
        set({ formData: { name: '', email: '', phone: '' }, accessGranted: false }),
    }),
    {
      name: 'access-form-store', // key in localStorage
    }
  )
)
