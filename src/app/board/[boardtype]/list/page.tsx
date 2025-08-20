import BoardPageClient from './BoardPageClient';

interface ParamInfo{
  params:{
    boardType: string
  }
}

export default function BoardListPage({ params }: ParamInfo){
  const {boardType} = params;
  return(
    <BoardPageClient boardType={boardType} />
  )
}