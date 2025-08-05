import BoardPageClient from './BoardPageClient';

export default function BoardListPage({ params }: { params: { boardtype: string } }){
  const boardType = params.boardtype;
  return(
    <BoardPageClient boardType={boardType} />
  )
}