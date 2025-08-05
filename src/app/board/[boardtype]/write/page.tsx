import WritePageClient from './WritePageClient';

export default function PostWritePage({ params }: { params: { boardtype: string } }){
  const boardType = params.boardtype;
  return(
    <WritePageClient boardType={boardType} />
  )
}