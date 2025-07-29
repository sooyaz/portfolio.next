import PostDetail from './postDetail';
interface PostDetailPageProps {
  params: {
    id: string; // [id] 폴더명에 해당하는 값이 여기에 문자열로 들어옵니다.
  };
}

export default async function Post({ params }: PostDetailPageProps){
  const { id } = await params;
  console.log("@@여기@@", id);

  return(
    <div>
      <PostDetail id={id} />
      {/* 타이틀 영억 */}
      <section>
        <div></div>
      </section>
      {/* 내용 영역 */}
      <section>

      </section>

      {/* 하단 영역( 댓글 , 이전글, 다음글, 목록으로 등 ) */}
      <section>

      </section>
    </div>
  )
}