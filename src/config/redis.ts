// config/redis.ts
import Redis from 'ioredis';
import dotenv from 'dotenv'; // Express 프로젝트에서는 필요. Next.js에서는 보통 불필요.
dotenv.config(); // .env 파일의 환경 변수 로드 (Express용)

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully!');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
  // 실제 운영 환경에서는 재연결 로직, 로그 기록 등 추가 처리 필요
});

export default redisClient;