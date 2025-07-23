// my-next-app/src/app/context/LoadingContext.tsx
"use client"; // 클라이언트 컴포넌트임을 명시

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

// Context 생성
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider 컴포넌트: 로딩 상태를 제공
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// useLoading 훅: 로딩 상태와 제어 함수를 쉽게 사용하기 위함
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    // Provider 내에서 사용되지 않았을 때 에러 발생
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};