// src/app/board/page.tsx
import { redirect } from 'next/navigation';

export default function BoardRootPage() {
  // /board 경로로 접근하면 /board/list로 리다이렉트
  redirect('/board/list');
  // 이 아래 코드는 실행되지 않지만, 컴파일러를 위해 간단한 null 또는 JSX를 반환할 수 있습니다.
  return null;
}