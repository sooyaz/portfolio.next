'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js App Router용 훅

import { usePostStore } from "@/stores/usePostStore";
import { useEffect } from "react";
import {shallow} from 'zustand/shallow';

interface PostDetailPageProps {
  id: string; // [id] 폴더명에 해당하는 값이 여기에 문자열로 들어옵니다.
}

export default function PostDetail({id}:PostDetailPageProps){
  const posts = usePostStore(state => state.posts);
  const currentPost = posts.filter((item, index)=> String(item.id) === id);
  console.log("!상세페이지 입니다.!", currentPost);
  
  useEffect(()=>{

  }, [])
  return(
    <div>
      {/* 타이틀 영억 */}
      <section>
        <div>제목</div>
        <div>작성일</div>
        <div>조회수</div>
      </section>
      {/* 내용 영역 */}
      <section>
        <p>내용이 들어 갑니다.</p>
      </section>

      {/* 하단 영역( 댓글 , 이전글, 다음글, 목록으로 등 ) */}
      <section>
        
      </section>
    </div>
  )
}