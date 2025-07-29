'use client'; // 이 컴포넌트는 클라이언트 컴포넌트임을 명시

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js App Router용 훅

interface PaginationProps {
  totalPosts: number;      // 전체 게시물 수
  postsPerPage: number;    // 한 페이지당 보여줄 게시물 수
  pageRangeDisplayed: number; // 페이지네이션 바에 표시할 페이지 번호 개수 (예: 5개)
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ totalPosts, postsPerPage, pageRangeDisplayed, setCurrentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1; // URL에서 현재 페이지 번호를 가져오거나 기본값 1

  const totalPages = Math.ceil(totalPosts / postsPerPage); // 전체 페이지 수 계산

  // 페이지 이동 함수
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // 유효하지 않은 페이지 번호는 무시
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(page));
    // URL을 업데이트하여 페이지 변경 (Soft Navigation)
    router.push(`?${newSearchParams.toString()}`);
  };

  // 페이지 번호 그룹 계산 (예: 1 2 3 4 5 ... 10)
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    // 현재 페이지를 중심으로 표시할 시작/끝 페이지 계산
    let startPage = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2));
    let endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

    // 끝 페이지가 부족하면 시작 페이지를 조정하여 항상 pageRangeDisplayed 개수 유지 시도
    if (endPage - startPage + 1 < pageRangeDisplayed) {
      startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
    }

    // 맨 처음 페이지 (1)이 표시 범위 밖에 있고, 2페이지 이상 차이 나면 '...' 추가
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push('...');
    }

    // 실제 페이지 번호 추가
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // 맨 마지막 페이지가 (totalPages)가 표시 범위 밖에 있고, 끝에서 2페이지 이상 차이 나면 '...' 추가
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center m-5">
      <nav className="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
        {/* 이전 페이지 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
            ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">이전</span>
          {/* Heroicons에서 SVG 아이콘 가져와 사용 가능 */}
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* 페이지 번호들 */}
        {pageNumbers.map((pageNumber, index) => (
          typeof pageNumber === 'number' ? (
            <button
              key={index} // key는 고유해야 함. 실제로는 pageNumber 자체가 고유 키로 사용될 수 있음.
              onClick={() => handlePageChange(pageNumber)}
              // 현재 페이지일 경우 aria-current="page"로 접근성 향상
              aria-current={currentPage === pageNumber ? 'page' : undefined}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium
                ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              {pageNumber}
            </button>
          ) : (
            // '...' (생략) 표시
            <span key={index} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 cursor-default">
              {pageNumber}
            </span>
          )
        ))}

        {/* 다음 페이지 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
            ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">다음</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
}