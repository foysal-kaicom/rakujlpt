// stores/useAgreementStore.ts
import { create } from 'zustand';

interface AgreementState {
 isFormValid: boolean;
  setAgreement: (isFormValid: boolean) => void;
  resetAgreement: () => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  isFormValid: false,
  setAgreement: (isFormValid) => set({ isFormValid }),
  resetAgreement: () => set({ isFormValid: false }),
}));
