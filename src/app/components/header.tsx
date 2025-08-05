// my-next-app/src/components/Header.tsx
"use client"; // 이 컴포넌트는 클라이언트에서 실행됩니다.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useUserStore } from "@/stores/useUserStore";
import { shallow } from 'zustand/shallow'; // shallow 임포트

import { useLoading } from '../context/loadingContext';
import { useRouter } from 'next/navigation'; // Next.js App Router용 훅

import { usePopupStore } from '@/stores/usePopupStore';

// 메인 헤더 컴포넌트
export default function Header() {
  const {userInfo, initUserInfo} = useUserStore(state => ({userInfo : state.userInfo, initUserInfo: state.initUserInfo}), shallow);
  // 로딩 상태를 관리하는 훅 사용
  const { startLoading, stopLoading } = useLoading(); // useLoading 훅 사용
  const router = useRouter();

  const { openPopup } = usePopupStore();
  const handleOpenPopup = () => {
    // openPopup 함수를 호출하여 팝업을 엽니다.
    openPopup(
      "portfolio",
      '환영합니다!', 
      <p className="text-center">이것은 **어떤 컴포넌트**에서도 열 수 있는 팝업입니다.</p>
    );
  };

  const logOut = async ()=>{
    startLoading();
    try{
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      if (response.ok) {
        initUserInfo();
        alert('로그아웃에 성공했습니다.')
        router.push('/');
      } else {
        // setMessage(`오류: ${data.message}`);
      }
    }catch (error) {
      console.error("로그아웃 실패:", error);
      // alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      stopLoading();
    }
  }
  return (
    <header className="bg-white shadow-sm py-4 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 max-w-6xl h-20">
        <h1 onClick={handleOpenPopup}>테스트</h1>
        <Link href="/" className="text-5xl font-extrabold text-gray-900 tracking-tight">
          VELLO:D
        </Link>
        <Link href={"/board/ask/list"}>문의</Link>
        <Link href={"/board/free/list"}>자유게시판</Link>
        <div>
          {
            userInfo.userName === "" ?
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-700 font-semibold mr-6 transition-colors duration-200">로그인</Link>
              <Link href="/signup" className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-semibold transition-colors duration-200 shadow-md">회원가입</Link>
            </>
            :
            <p>
              <span>{userInfo.userName}</span>로 로그인중.
              <button onClick={logOut}>로그아웃</button>
            </p>
          }
        </div>
      </div>
    </header>
  );
}