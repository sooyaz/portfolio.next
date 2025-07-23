// Request, NextResponse는 'next/server'에서 임포트합니다.
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// 상대 경로를 정확히 맞춰주세요. (src/app/api/auth/send-verification-email 에서 config/redis.ts까지)
import redisClient from '../../../../config/redis';
import generateVerificationCode from '../../../../utils/generateCode';

// Nodemailer transporter 설정은 동일합니다.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// App Router에서는 HTTP 메서드에 해당하는 이름 있는 함수를 export 합니다.
export async function POST(req: Request) {
  try {
    const { email } = await req.json(); // Request 객체에서 .json() 메서드로 본문 파싱

    if (!email) {
      return NextResponse.json({ message: '이메일 주소를 입력해주세요.' }, { status: 400 });
    }

    const verificationCode = generateVerificationCode();
    const expirationSeconds = 3 * 60; // 3분

    await redisClient.setex(`verification:${email}`, expirationSeconds, verificationCode);
    console.log(`Redis: Stored code ${verificationCode} for ${email} (expires in ${expirationSeconds}s)`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '[회원가입 인증] 이메일 인증 코드입니다.',
      html: `
        <p>안녕하세요!</p>
        <p>회원가입을 위한 이메일 인증 코드입니다.</p>
        <h2>인증 코드: <strong>${verificationCode}</strong></h2>
        <p>이 코드는 ${expirationSeconds / 60}분 후에 만료됩니다.</p>
        <p>감사합니다.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '인증 이메일이 성공적으로 전송되었습니다.' }, { status: 200 });

  } catch (error) {
    console.error('이메일 전송 또는 Redis 저장 실패:', error);
    return NextResponse.json({ message: '인증 이메일 전송에 실패했습니다. 다시 시도해주세요.' }, { status: 500 });
  }
}

// 만약 다른 HTTP 메소드를 허용하지 않으려면, 명시적으로 export 하지 않습니다.
// 예를 들어, GET 요청에 대해 405 응답을 보내려면:
// export async function GET() {
//   return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
// }