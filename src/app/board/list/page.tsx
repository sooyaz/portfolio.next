import Link from "next/link";
import {dataSample} from "../../../lib/board"

export default function BoardList(){
  const test = [1,2,3,4,5,6,7,8,9,10];
  return(
    <div className={`flex flex-col items-center justify-center h-screen p-10`}>
      <table className={`w-full m-10`}>
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
            dataSample.map((item, index)=>{
              return(
                <tr key={index} className={`border-b-1 border-gray-400 ${index%2 > 0 ? 'bg-gray-100' : ''}`}>
                  <td>{index}</td>
                  <td>{item.category}</td>
                  <td className={`text-left`}>{item.title}</td>
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
        <div className={`text-3xl mb-5`}>
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
        </div>
        <div className={`flex`}>
          <select name="검색" id="search" className={`border border-black-500 rounded-[5]`}>
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </select>
          <input type="text" className={`mx-3`}/>
          <button className={`m-0`}>검색</button>
        </div>
        <button className={`absolute top-0 left-0`}>글쓰기</button>
      </div>
    </div>
  )
}