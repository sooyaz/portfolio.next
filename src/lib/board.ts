// my-next-app/src/lib/projects.ts
export interface Board {
  category: number;     //글 작성 카테고리  0:공지사항, 1:일반게시글, 2:문의게시글
  title: string;        //글 제목
  description: string;  //글 내용
  auth: string;         //작성자
  write_dt: string;     //작성일
  count: number;        //조회수
  thumbnail?: string;   //썸네일
}
//게시판 내용 예시
/**
 * no 카테고리 제목 작성자 작성일 조회수 수정일 
 */
export const myProjects: Board[] = [
  {
    category: 0,
    title: '게시판 테스트입니다.',
    description: "블라블라~",
    auth: '관리자',
    write_dt: "2025.07.25",
    count: 1,
    thumbnail: 'https://your-email-auth-demo.vercel.app'
  },
];

export const dataSample = [
    {
      category: 1,
      title: "첫 게시글입니다.",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.2222222",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    },
    {
      category: 1,
      title: "첫 게시글입니다.33333333333333",
      description: "블라블라~",
      auth: "관리자",
      write_dt: "2025.07.25",
      count: 1
    }
  ]