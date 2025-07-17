"use client"
import { ChangeEvent, useState } from "react";

// 게시글 데이터 타입 정의 (선택 사항)
interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onInputChange = (type:string, e:React.ChangeEvent<HTMLInputElement>) => {
    const inputValue:string = e.target.value;
    type == "ID" ? setId(inputValue) : setPassword(inputValue);
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //리로드 방지
    e.preventDefault();

    // alert("로그인 시도");
    console.log("ID/PW", id, password);

    fetchPosts();
  }
  // API 호출 함수
  const fetchPosts = async () => {
    try {
      // const token = localStorage.getItem('token'); // localStorage에서 토큰 가져오기
      // if (!token) {
      //   throw new Error('인증 토큰이 없습니다. 로그인해주세요.');
      // }
      const requestBody = {
        userID : id,
        userPW : password
      };

      const response = await fetch('http://192.168.45.21:9999/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 담아 전송
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API 호출 실패');
      }

      const data = await response.json();
      console.log("🚀 ~ fetchPosts ~ data:", data)
      setPosts(data.posts);
    } catch (err: any) {
      setError(err.message);
      console.log("🚀 ~ ㄷㄷㄷㄱㄱㄱ", err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className={`flex w-100`}>
      <form onSubmit={onSubmit} className={`flex flex-col h-full justify-center items-center`}>
        <div className={`flex justify-between w-230`}>
          <label htmlFor="userID">아이디</label>
          <input type="text" onChange={(e)=>onInputChange("ID", e)} />
        </div>
        <div className={`flex justify-between w-230`}>
          <label htmlFor="userPW" className={``}>패스워드</label>
          <input type="password" onChange={(e)=>onInputChange("PW", e)} />
        </div>
        <button type="submit">확인</button>
      </form>
    // </div>
  );
}
