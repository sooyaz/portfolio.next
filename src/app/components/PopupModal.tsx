'use client';

import React from 'react';
import { usePopupStore } from '@/stores/usePopupStore';

export default function GlobalPopupModal() {
  const { isOpen, popType, title, content, closePopup } = usePopupStore();

  if (isOpen && popType == "global")

  return (
    // 전체 화면을 덮는 팝업 컴포넌트 (이전과 동일)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
      <div className="w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-xl md:w-full">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-800">
            {/* SVG 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="mt-4">{content}</div>
        {/* <div className="mt-4 flex justify-end">
          <button onClick={closePopup} className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
            닫기
          </button>
        </div> */}
      </div>
    </div>
  );

  else return null;
}