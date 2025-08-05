'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation'; // Next.js App Router용 훅
import {replaceDateTime} from '../../../utils/utils';

// import {sortedPosts} from "../../../lib/board"
import Pagination from '../../components/pagination';
// import PAS from "../../components/pagination";
import { useEffect, useLayoutEffect, useState } from "react";
// import { usePostStore } from "@/stores/usePostStore";

interface Category {
  category: string;
}

export default function ClientBoardList({category}: Category){
  console.log("!!!카테고리!!!", category)
  const router = useRouter();

  const [totalPostsCnt, setTotalPostsCnt] = useState(0);
  const [postsList, setPostsList] = useState<any[]>([]);
  const [currnetPage, setCurrentPage] = useState(1);

  // const totalPostsCnt = 33;
  const showPosts = 10;

  const getPostsList = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/post/get-posts?page=${currnetPage}&showPostCnt=${10}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // ✅ 반드시 있어야 쿠키 전달됨
        credentials: 'include'
      });

      const data = await response.json();
      console.log("!!!gg", data)

      if(!response.ok){
        const errMessage = data.message;
        if(errMessage) throw new Error(errMessage);

        throw new Error("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }

      setTotalPostsCnt(data.totalCount);
      
      setPostsList(data.list);
      // alert("게시물 작성에 성공하였습니다.");
      // router.push('/board/list');

    } catch(err){
      console.error("실패", err);
      // alert("게시물 작성에 실패하였습니다. 다시 시도해 주세요.");
    }
  }

  useEffect(()=>{
    getPostsList();
  }, [currnetPage])

  return(
    <div className={`flex flex-col items-center h-screen p-10`}>
      <table className={`w-full m-10 min-h-28`}>
        <caption className="text-5xl m-5">게시판 설명 작성란</caption>
        <colgroup>
          <col className={`w-1/10`} />
          <col className={`w-1/10`} />
          <col className={`w-5/10`} />
          <col className={`w-1/10`} />
          <col className={`w-1/10`} />
          <col className={`w-1/10`} />
        </colgroup>
        <thead>
          <tr className={`border-b-1 border-gray-400`}>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>사용자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody className={`text-center`}>
          {
            postsList.map((item, index)=>{
              return(
                <tr key={index} className={`border-b-1 border-gray-400 ${index%2 > 0 ? 'bg-gray-100' : ''}`}>
                  <td>{totalPostsCnt - (((currnetPage - 1) * showPosts) + index)}</td>
                  <td>{item.category}</td>
                  <td className={`text-left`}>
                    <Link href={`/board/list/${item.id}`}>{item.title}</Link>
                  </td>
                  <td>{item.auth}</td>
                  <td>{replaceDateTime(item.created_dt)}</td>
                  <td>{item.views}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className={`relative w-full flex flex-col items-center`}>
        <Pagination
          totalPosts={totalPostsCnt}    // 총 게시물 수
          postsPerPage={10}             // 한 페이지에 보여줄 게시물 수
          pageRangeDisplayed={5}        // 페이지네이션 바에 나타낼 페이지 번호 갯수 표시
          setCurrentPage={setCurrentPage}
        />
        <div className={`flex`}>
          <select name="검색" id="search" className={`border border-black-500 rounded-[5]`}>
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </select>
          <input type="text" className={`mx-3`}/>
          <button className={`m-0`}>검색</button>
        </div>
        <Link href={`/board/write`} className={`absolute top-0 left-0 border p-3`}>글쓰기</Link>
      </div>
    </div>
  )
}