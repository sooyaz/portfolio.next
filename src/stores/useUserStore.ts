import {create} from 'zustand';

interface User {
  userID: string;
  userName: string;
}

interface UserStore {
  userInfo:User;
  setUserInfo: (info:User)=>void;
}

export const useUserStore = create<UserStore>((set, get)=>({
  userInfo: {userID:"", userName:""},
  setUserInfo: (info) => set({ userInfo: info })
}));