import { create } from 'zustand';

interface PopupState {
  isOpen: boolean;
  popType: string;
  title: string;
  content: string | React.ReactNode;
  openPopup: (popType:string, title: string, content: string | React.ReactNode) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  popType: '',
  title: '',
  content: '',
  openPopup: (popType, title, content) => set({ isOpen: true, popType, title, content }),
  closePopup: () => set({ isOpen: false, title: '', content: '' }),
}));