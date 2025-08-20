import { use } from "react";
import BoardPageClient from './BoardPageClient';

interface ParamInfo{
  boardType: string
}

export default function BoardListPage({params} : AppPageProps<ParamInfo>){
  const {boardType} = use(params);
  return(
    <BoardPageClient boardType={boardType} />
  )
}