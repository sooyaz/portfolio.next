// my-next-app/src/components/Header.tsx
"use client"; // 이 컴포넌트는 클라이언트에서 실행됩니다.

import React, { useState } from 'react';
import Link from 'next/link';

// 메인 헤더 컴포넌트
export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 max-w-6xl h-20">
        <Link href="/" className="text-5xl font-extrabold text-gray-900 tracking-tight">
          VELLO:D
        </Link>
        <div>
          <Link href="/login" className="text-gray-600 hover:text-blue-700 font-semibold mr-6 transition-colors duration-200">로그인</Link>
          <Link href="/signup" className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-semibold transition-colors duration-200 shadow-md">회원가입</Link>
        </div>
      </div>
    </header>
  );
}