"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Next.js App Router용 훅
import { useUserStore } from "@/stores/useUserStore";

export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const [error, setError] = useState<string | null>(null);

  const setUserInfo = useUserStore(state => state.setUserInfo);
  const router = useRouter();

  const onInputChange = (type:string, e:React.ChangeEvent<HTMLInputElement>) => {
    const inputValue:string = e.target.value;
    type == "ID" ? setId(inputValue) : setPassword(inputValue);
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //리로드 방지
    e.preventDefault();
    
    try {
      if (!id || !password) { 
        throw new Error("아이디와 비밀번호를 입력해주세요.");
      }

      if (id.length < 4) {
        throw new Error("아이디는 4자 이상이어야 합니다.");
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID:id, userPW:password })
      });

      const data = await response.json();

      if (!response.ok) {
        const errMessage = data.message;
        if(errMessage) throw new Error(errMessage);

        throw new Error("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }

      if (data.status !== 200) {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      // 로그인 성공 후 처리 (예: 토큰 저장, 리다이렉트 등)
      console.log("로그인 성공:", data);
      setUserInfo(data.data);
      alert('로그인에 성공했습니다.');
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      alert(err.message);
      console.log("🚀 ~ onSubmit ~ err:", err.message)
      return;
    }
  }

  return (
    <div className={`flex flex-col h-full justify-center items-center py-20 px-4`}>
      <h1 className={`font-bold mb-10 text-4xl`}>로그인</h1>
      <form onSubmit={onSubmit} className={`flex flex-col`}>
        <div className={`input-container`}>
          <label htmlFor="userID" className={``}>아이디</label>
          <input type="text" value={id} onChange={(e)=>onInputChange("ID", e)} />
        </div>
        <div className={`input-container py-4`}>
          <label htmlFor="userPW" className={``}>패스워드</label>
          <input type="password" value={password} onChange={(e)=>onInputChange("PW", e)} />
        </div>
        <button type="submit" className={`bg-gray-100 px-4 py-2 rounded-md`}>로그인</button>
      </form>
    </div>
  );
}
