'use client'

import { useEffect } from 'react'
// import { useUserStore } from '@/store/useUserStore'
// import { User } from '@/types/user'
import { useUserStore } from "@/stores/useUserStore";

import Header from './Header'; // Header 컴포넌트 임포트
import Footer from './Footer'; // Footer 컴포넌트 임포트


export interface User {
  userID: string;
  userName: string;
  role?: 'user' | 'admin';
}

interface Props {
  user: User
  children: React.ReactNode
}

export default function ClientLayout({ user, children }: Props) {
  const setUserInfo = useUserStore(state => state.setUserInfo);

  useEffect(() => {
    if (user) {
      console.log("!!!!!", user)
      setUserInfo(user)
    }
  }, [user])

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}