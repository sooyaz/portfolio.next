// my-next-app/src/app/api/auth/verify-email/route.ts
import { NextResponse } from 'next/server';
// 상대 경로를 정확히 맞춰주세요.
import redisClient from '../../../../config/redis';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ message: '이메일과 인증 코드를 입력해주세요.' }, { status: 400 });
    }

    const storedCode = await redisClient.get(`verification:${email}`);

    if (!storedCode) {
      return NextResponse.json({ message: '인증 코드가 유효하지 않거나 만료되었습니다.' }, { status: 400 });
    }

    if (storedCode !== code) {
      return NextResponse.json({ message: '인증 코드가 일치하지 않습니다.' }, { status: 400 });
    }

    await redisClient.del(`verification:${email}`);
    console.log(`Redis: Deleted code for ${email} after successful verification.`);

    return NextResponse.json({ message: '이메일 인증이 성공적으로 완료되었습니다!', verified: true }, { status: 200 });

  } catch (error) {
    console.error('인증 코드 검증 실패:', error);
    return NextResponse.json({ message: '인증 코드 검증 중 오류가 발생했습니다.' }, { status: 500 });
  }
}