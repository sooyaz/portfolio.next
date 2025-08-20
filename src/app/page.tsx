import Image from "next/image";
import Link from 'next/link';
import ProjectCard from './components/PorjectCard'; // ProjectCard 컴포넌트 임포트
import { myProjects } from '../lib/projects'; // 프로젝트 데이터 임포트

export default function Home() {
  return (
    <div>
      {/* 프로젝트 섹션 - Benoît Boucart 스타일 */}
      <section className="py-16 px-4 mx-60">
        <h2 className="text-5xl font-bold mb-12 text-center text-gray-900">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"> {/* auto-rows-fr로 행 높이 동일하게 */}
          {myProjects.map((project) => (
            // ProjectCard 컴포넌트에 프로젝트 데이터 전달
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        {/* 더 많은 프로젝트 보기 버튼 */}
        {myProjects.length > 3 && ( // 3개 이상일 때만 버튼 표시
            <div className="text-center mt-12">
                <Link href="/projects" className="px-8 py-4 text-xl font-bold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                    모든 프로젝트 보기
                </Link>
            </div>
        )}
      </section>

      {/* 기술 스택 섹션 (이전과 유사하게 구성) */}
      <section className="mx-auto py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">기술 스택</h2>
        {/* 로고들을 여기에 배치 */}
        <div className="flex flex-wrap justify-center items-center gap-8">
            <Image src="/images/icons/react.svg" alt="React" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/nextdotjs.svg" alt="Next.js" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/typescript.svg" alt="TypeScript" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/tailwindcss.svg" alt="Tailwind CSS" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />

            <Image src="/images/icons/git.svg" alt="Git" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/github.svg" alt="GitHub" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/mysql.svg" alt="MySQL" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/php.png" alt="PHP" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />

            <Image src="/images/icons/javascript.svg" alt="JavaScript" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/svelte.svg" alt="Svelte" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/vercel.svg" alt="Vercel" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
            <Image src="/images/icons/vuejs.svg" alt="Vue.js" width={64} height={64} className="hover:scale-110 transition-transform duration-200" />
        </div>
      </section>
    </div>
  );
}
