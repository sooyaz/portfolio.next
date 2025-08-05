'use client';

import React, { useMemo } from 'react';
import { usePopupStore } from '@/stores/usePopupStore';

export default function PortfolioModal() {
  const { popupData, closePopup } = usePopupStore();

  const popupContent = useMemo(()=>{
    let tag = <></>;
    return tag;
  }, [])
  if (popupData.isOpen && popupData.type == "portfolio")

  return (
    // 전체 화면을 덮는 팝업 컴포넌트 (이전과 동일)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
      <div className="w-full h-100 rounded-lg bg-white m-10 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-bold">{}</h2>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-800">
            {/* SVG 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="mt-4">{}</div>
      </div>
    </div>
  );

  else return null;
}