// src/app/loading.tsx
"use client";
// 이 파일은 Next.js의 클라이언트 컴포넌트로, 로딩 상태를 표시하는 컴포넌트입니다.
// 로딩 중일 때 사용자에게 피드백을 제공하기 위해 사용됩니다.
import React from 'react';

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // 전체 화면 높이
      width: '100vw',  // 전체 화면 너비
      position: 'fixed', // 화면에 고정
      top: 0,
      left: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // 반투명 배경
      zIndex: 9999, // 다른 요소 위에 표시
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* 로딩 스피너 (간단한 CSS로 구현) */}
      <div style={{
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ fontSize: '1.2em', color: '#333' }}>로딩 중...</p>

      {/* 로딩 스피너 CSS (Global CSS 파일 또는 styled-jsx 사용) */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}