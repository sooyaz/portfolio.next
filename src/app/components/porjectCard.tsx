'use client';
// my-next-app/src/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../../lib/projects'; // 정의한 Project 인터페이스 임포트

import { usePopupStore } from '@/stores/usePopupStore';

// Project 타입을 직접 props로 받도록 변경
export default function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  technologies,
  demoUrl,
  githubUrl,
  detailPageUrl,
  span = 'col-span-1' // 기본값 설정
}: Project) {
  const { openPopup } = usePopupStore();
  const openProject = () => {
    // openPopup 함수를 호출하여 팝업을 엽니다.
    openPopup(
      true,
      id
    );
  }
  return (
    // 그리드 span을 prop으로 받아서 적용
    <div className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${span}`}
         onClick={openProject}
    >
      {/* 이미지 미리보기 */}
      <div className="relative w-full h-100 overflow-hidden"> {/* 높이 고정 */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105" // 호버 시 확대 효과
          quality={80}
        />
        {/* 이미지 위에 오버레이 효과 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 className="text-xl font-bold text-white relative z-10">{title}</h3>
        </div>
      </div>

      {/* 프로젝트 상세 정보 (호버 시 나타나는 오버레이 또는 항상 표시) */}
      <div className="p-6">
        <h3 className="text-3xl font-bold mb-2 text-gray-800">{title}</h3> {/* 중복이지만 호버 전에 표시될 타이틀 */}
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p> {/* 2줄 이상 잘리도록 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xl font-medium rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          {demoUrl && (
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white text-base font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200">
              데모
            </Link>
          )}
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-base font-semibold rounded-md hover:bg-gray-100 transition-colors duration-200">
              코드
            </Link>
          )}
          {detailPageUrl && (
            <Link href={detailPageUrl}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-base font-semibold rounded-md hover:bg-gray-100 transition-colors duration-200">
              더 보기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}