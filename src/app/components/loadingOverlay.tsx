// my-next-app/src/app/components/LoadingOverlay.tsx
"use client"; // 클라이언트 컴포넌트임을 명시

import React from 'react';
import { useLoading } from '../context/loadingContext'; // 생성한 훅 임포트

export default function LoadingOverlay() {
  const { isLoading } = useLoading();

  // isLoading이 false이면 아무것도 렌더링하지 않음
  if (!isLoading) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999, // 다른 UI 요소 위에 표시
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* 로딩 스피너 UI (이전 loading.tsx와 동일) */}
      <div style={{
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ fontSize: '1.2em', color: '#333' }}>로딩 중...</p>

      {/* 애니메이션 CSS */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}