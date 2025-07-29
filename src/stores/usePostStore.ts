import {create} from 'zustand';

interface Post {
  id: number;
  category: number;     //글 작성 카테고리  0:공지사항, 1:일반게시글, 2:문의게시글
  title: string;        //글 제목
  description: string;  //글 내용
  auth: string;         //작성자
  write_dt: string;     //작성일
  count: number;        //조회수
  thumbnail?: string;   //썸네일
}
interface PostStore {
  posts: Post[]; // 게시물 목록 상태
  // selectedPost: Post | null; // 선택된 게시물 상세 상태 (상세 페이지용)
  setPosts: (newPosts: Post[]) => void; // 게시물 목록을 설정하
}

export const usePostStore = create<PostStore>((set, get)=>({
  posts:[],
  setPosts: (newPosts) => set({ posts: newPosts })
}));