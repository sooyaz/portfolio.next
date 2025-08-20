import { use } from "react";
import WritePageClient from './WritePageClient';

interface ParamInfo{
  boardType: string
}

export default function PostWritePage({ params }:AppPageProps<ParamInfo>){
  const {boardType} = use(params);
  return(
    <WritePageClient boardType={boardType} />
  )
}