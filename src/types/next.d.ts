export {}; // 모듈로 인식되지 않게 방지 (중요)

declare global {
  // 페이지 props 유틸 타입
  type AppPageProps<TParams = {}, TSearch = {}> = {
    params: Promise<TParams>;
    searchParams?: Promise<TSearch>;
  };
}