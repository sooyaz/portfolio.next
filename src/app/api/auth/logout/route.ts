import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  // 1. HttpOnly 쿠키 등 모든 인증 관련 쿠키를 삭제합니다.
  //    (쿠키 이름은 실제 사용하시는 이름으로 변경하세요)
  cookieStore.delete('accessToken'); // 예시: HttpOnly로 저장된 접근 토큰
  cookieStore.delete('refreshToken'); // 예시: HttpOnly로 저장된 갱신 토큰
  cookieStore.delete('sessionId');    // 예시: 세션 ID

  // 2. (선택 사항) 서버 측에서 세션 또는 토큰을 무효화하는 로직
  //    예: 데이터베이스에서 해당 refresh token을 삭제하거나 블랙리스트에 추가
  //    await invalidateRefreshTokenInDb(oldRefreshToken);

  // 3. 성공 응답을 클라이언트에게 보냅니다.
  return NextResponse.json({ message: '성공적으로 로그아웃되었습니다.' }, { status: 200 });
}