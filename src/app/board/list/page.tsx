'use client';

import Link from "next/link";
import {sortedPosts} from "../../../lib/board"
import Pagination from '../../components/pagination';
import { useEffect, useState } from "react";
import { usePostStore } from "@/stores/usePostStore";

interface Post {
  id: number;
  category: number;     //글 작성 카테고리  0:공지사항, 1:일반게시글, 2:문의게시글
  title: string;        //글 제목
  description: string;  //글 내용
  auth: string;         //작성자
  write_dt: string;     //작성일
  count: number;        //조회수
  thumbnail?: string;   //썸네일
}

export default function BoardList(){
  const setPosts = usePostStore(state => state.setPosts);
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [currnetPage, setCurrentPage] = useState(1);

  const totalPostsCnt = 33;
  const showPosts = 10;

  useEffect(()=>{
    const currentList = sortedPosts.filter((item, index)=> showPosts * (currnetPage - 1) <= index && index < showPosts * currnetPage);
    setPostsList(currentList);
    setPosts(currentList);
  }, [currnetPage])

  const test = [1,2,3,4,5,6,7,8,9,10];
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
                  <td>{item.write_dt}</td>
                  <td>{item.count}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className={`relative w-full flex flex-col items-center`}>
        <Pagination
          totalPosts={33}         // 총 게시물 수
          postsPerPage={10}       // 한 페이지에 보여줄 게시물 수
          pageRangeDisplayed={5}  // 페이지네이션 바에 나타낼 페이지 번호 갯수 표시
          setCurrentPage={setCurrentPage}
        />
        {/* <div className={`text-3xl mb-5`}>
          <span className={`text-3xl mx-1`}>⏪️</span>
          <span className={`text-3xl mx-1`}>◀️</span>
          {
            test.map((item, index)=>{
              return(
                <span key={index} className={`text-3xl mx-1`}>
                  {item}
                </span>
              )
            })
          }
          <span className={`text-3xl mx-1`}>▶️</span>
          <span className={`text-3xl mx-1`}>⏩️</span>
        </div> */}
        <div className={`flex`}>
          <select name="검색" id="search" className={`border border-black-500 rounded-[5]`}>
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </select>
          <input type="text" className={`mx-3`}/>
          <button className={`m-0`}>검색</button>
        </div>
        <Link href={`/board/write`} className={`absolute top-0 left-0 border p-3`}>글쓰기</Link>
        {/* <button className={`absolute top-0 left-0`}>글쓰기</button> */}
      </div>
    </div>
  )
}