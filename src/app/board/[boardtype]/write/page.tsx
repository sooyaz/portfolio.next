import WritePageClient from './WritePageClient';

interface ParamInfo{
  params:{
    boardType: string
  }
}

export default function PostWritePage({ params }:ParamInfo){
  const {boardType} = params;
  return(
    <WritePageClient boardType={boardType} />
  )
}