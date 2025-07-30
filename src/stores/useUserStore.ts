import {create} from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';

interface User {
  userID: string;
  userName: string;
}

interface UserState {
  userInfo:User;
  setUserInfo: (info:User)=>void;
  initUserInfo: ()=>void;
}

export const useUserStore = createWithEqualityFn<UserState>((set, get)=>({
  userInfo: {userID:"", userName:""},
  setUserInfo: (info) => set({ userInfo: info }),
  initUserInfo: () => set({ userInfo: {userID:"", userName:""}})
}));