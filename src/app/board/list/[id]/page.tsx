import {replaceDateTime} from '../../../../utils/utils';

interface Post {
  id: number;
  category: string;     //글 작성 카테고리  0:공지사항, 1:일반게시글, 2:문의게시글
  title: string;        //글 제목
  content: string;      //글 내용
  auth: string;         //작성자
  created_dt: string;   //작성일
  views: number;        //조회수
  thumbnail?: string;   //썸네일
}

export default async function Post({ params }: { params: { id: string } }){
  const postId = params.id;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/post/get-post/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // ✅ 반드시 있어야 쿠키 전달됨
      credentials: 'include'
    });

    const data = await response.json();
    const postDetail = data.post;
    console.log("!!!gg", postDetail)

    if(!response.ok){
      const errMessage = postDetail.message;
      if(errMessage) throw new Error(errMessage);

      throw new Error("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/post/increment-views/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ✅ 반드시 있어야 쿠키 전달됨
      credentials: 'include',
      // API 호출이 캐시되지 않도록 설정
      cache: 'no-store'
    }).then((response)=>{
      console.log("조회수 업데이트 성공 !!");
    })
    .catch((error)=>{
      // 조회수 업데이트 실패 시 로그
      console.error('조회수 업데이트 실패:', error);
    });


    return(
      <div className="container mx-auto px-4 py-12">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">{postDetail.title}</h1>
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <span className="text-2xl text-gray-500">작성자: {postDetail.auth}</span>
            <span className="text-2xl text-gray-500">작성일: {replaceDateTime(postDetail.created_dt)}</span>
          </div>
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: postDetail.content }}
          ></div>
        </div>
      </div>
    )
// setPostDetail()
  } catch(err){
    console.error("실패", err);
    alert('게시물을 정상적으로 가져오지 못했습니다.');
    return(
      <div className="container mx-auto px-4 py-12">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">{""}</h1>
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <span className="text-sm text-gray-500">작성자: {""}</span>
            <span className="text-sm text-gray-500">작성일: {""}</span>
          </div>
          <div className="prose max-w-none text-gray-700">
            <p>{""}</p>
          </div>
        </div>
      </div>
    )
    // alert("게시물 작성에 실패하였습니다. 다시 시도해 주세요.");
  }
}