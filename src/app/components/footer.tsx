// my-next-app/src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // SVG 아이콘을 Image 컴포넌트로 사용할 경우

export default function Footer() {
  return (
    // 푸터 배경색과 패딩, 상단 테두리 조정
    <footer className="bg-white border-t border-gray-100 py-10 mt-16 text-center text-gray-500 text-lg">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 저작권 정보 */}
        <p>&copy; 2025 VELLO:D. All Rights Reserved.</p>

        {/* 소셜 미디어 링크 - 아이콘만 작게 표시 */}
        <div className="mt-6 flex justify-center space-x-6">
          <Link href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors duration-200">
            {/* GitHub 아이콘 SVG (또는 public/icons/github.svg 파일을 Image 컴포넌트로 사용) */}
            <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 fill-current"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.73.084-.73 1.205.086 1.838 1.235 1.838 1.235 1.07 1.835 2.809 1.305 3.49.998.108-.77.422-1.305.76-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.3-.54-1.523.14-3.18 0 0 1-.322 3.3 1.22.96-.26 1.98-.39 3-.39.043 0 .085 0 .128.002 1.02.13 2.04.38 3 .692 2.3-1.54 3.3-1.22 3.3-1.22.68 1.65.27 2.88.14 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.096.81 2.22 0 1.6-.015 2.88-.015 3.28 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"/></svg>
          </Link>
          <Link href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
            {/* LinkedIn 아이콘 SVG */}
            <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 fill-current"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.565c0-1.343-.024-3.065-1.866-3.065-1.867 0-2.153 1.458-2.153 2.97V20.452h-3.554V9.29h3.413v1.561h.048c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.368 4.267 5.455v6.248zM3.376 7.423a2.203 2.203 0 01-2.204-2.204 2.204 2.204 0 012.204-2.204 2.204 2.204 0 012.204 2.204 2.203 2.203 0 01-2.204 2.204zm1.788 13.029H1.588V9.29h3.576v11.163zM22.227 0H1.771C.792 0 0 .771 0 1.722v20.556C0 23.229.792 24 1.771 24h20.456C23.207 24 24 23.229 24 22.278V1.722C24 .771 23.207 0 22.227 0z"/></svg>
          </Link>
          {/* 필요하다면 Dribbble, Twitter 등 다른 소셜 미디어 아이콘도 추가 */}
        </div>
      </div>
    </footer>
  );
}