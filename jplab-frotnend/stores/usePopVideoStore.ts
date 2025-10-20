// /stores/usePopVideoStore.ts
import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  checkModal: () => void;
};

export const usePopVideoModalStore = create<ModalState>((set) => ({
  isOpen: false,

  openModal: () => set({ isOpen: true }),

  closeModal: () => {
    localStorage.setItem("lastModalShown", Date.now().toString());
    set({ isOpen: false });
  },

  checkModal: () => {
    const lastShown = localStorage.getItem("lastModalShown");
    if (!lastShown) {
      set({ isOpen: true });
      return;
    }

    const lastTime = parseInt(lastShown, 10);
    const now = Date.now();
    const hoursPassed = (now - lastTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      set({ isOpen: true });
    }
  },
}));
