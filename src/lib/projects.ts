// my-next-app/src/lib/projects.ts
export interface Project {
  id: string; // 고유 ID
  title: string;
  description: string; // 프로젝트 카드에 표시될 간략한 설명
  imageUrl: string; // public 폴더 기준 경로 (예: "/images/projects/project1.png")
  technologies: string[]; // 사용 기술 스택
  category?: string; // 프로젝트 필터링에 사용될 카테고리 (예: "Web App", "Mobile", "UI/UX")
  demoUrl?: string; // 배포된 서비스 링크
  githubUrl?: string; // GitHub 저장소 링크
  detailPageUrl?: string; // 프로젝트 상세 설명 페이지 링크 (추가 구현 시)
  span?: 'col-span-1' | 'col-span-2' | 'col-span-full'; // 그리드 크기 조절 (선택 사항)
}

export const myProjects: Project[] = [
  {
    id: 'email-auth-system',
    title: '이메일 인증 시스템',
    description: 'Next.js, Express, Redis를 활용한 사용자 이메일 인증 및 회원가입 시스템. 보안과 효율성을 최적화하여 개발했습니다.',
    imageUrl: '/images/dashboard-preview.png', // 이미지 경로 확인
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Redis', 'MySQL'],
    category: 'Web App',
    demoUrl: 'https://your-email-auth-demo.vercel.app',
    githubUrl: 'https://github.com/your-username/your-email-auth-repo',
    span: 'col-span-1', // 기본 크기
  },
  {
    id: 'portfolio-v1',
    title: '개인 포트폴리오 웹사이트 v1',
    description: '반응형 디자인과 SEO 최적화에 중점을 둔 개인 포트폴리오 웹사이트. 저의 개발 여정을 담았습니다.',
    imageUrl: '/images/dashboard-preview.png', // 이미지 경로 확인
    technologies: ['React', 'Gatsby', 'Styled Components'],
    category: 'Web App',
    demoUrl: 'https://old-portfolio.vercel.app',
    githubUrl: 'https://github.com/your-username/old-portfolio',
    span: 'col-span-1',
  },
  {
    id: 'ecommerce-platform',
    title: '온라인 쇼핑몰 플랫폼',
    description: '상품 관리, 결제 시스템, 사용자 인증 등 풀스택 기능을 갖춘 온라인 쇼핑몰입니다. 백엔드와 프론트엔드 연동에 집중했습니다.',
    imageUrl: '/images/dashboard-preview.png', // 이미지 경로 확인
    technologies: ['Next.js', 'GraphQL', 'Apollo Client', 'PostgreSQL', 'Stripe API'],
    category: 'Web App',
    // demoUrl: '', // 아직 배포 안됐거나 비공개일 경우 비워둠
    githubUrl: 'https://github.com/your-username/ecommerce-platform',
    span: 'col-span-1', // 이 프로젝트는 좀 더 크게 보이도록 2칸 차지
  },
  {
    id: 'mobile-app-concept',
    title: '모바일 앱 UI/UX 컨셉',
    description: '피그마(Figma)를 활용하여 디자인한 모바일 앱의 UI/UX 컨셉입니다. 사용자 흐름과 인터랙션을 고려했습니다.',
    imageUrl: '/images/dashboard-preview.png', // 이미지 경로 확인
    technologies: ['Figma', 'UI/UX Design'],
    category: 'UI/UX',
    // demoUrl: '',
    // githubUrl: '',
    span: 'col-span-1',
  },
  // TODO: 여러분의 다른 프로젝트들을 여기에 추가하세요.
];