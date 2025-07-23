// my-next-app/utils/generateCode.ts
function generateVerificationCode(): string {
  const min = 100000; // 6자리 숫자의 최소값 (100,000)
  const max = 999999; // 6자리 숫자의 최대값 (999,999)

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}

export default generateVerificationCode;