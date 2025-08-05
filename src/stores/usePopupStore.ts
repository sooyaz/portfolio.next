import { create } from 'zustand';

interface PopupState {
  popupData: {
    isOpen: boolean;
    type: string;
    callback?: Function|null;
  }
  openPopup: (isOpen:boolean, type: string, callback?: Function | null) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  popupData: {
    isOpen: false,
    type: '',
    callback: null
  },
  openPopup: (isOpen, type, callback) => set({ popupData: {isOpen:isOpen, type:type, callback:callback}}),
  closePopup: () => set({ popupData: {isOpen:false, type:'', callback:null} }),
}));