// my-next-app/src/lib/projects.ts
export interface Board {
  id: number;           //글 번호
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
    id: 1,
    category: 0,
    title: '게시판 테스트입니다.',
    description: "블라블라~",
    auth: '관리자',
    write_dt: "2025.07.25",
    count: 1,
    thumbnail: 'https://your-email-auth-demo.vercel.app'
  },
];
export const dataSample = 
[
  {
    "id": 1,
    "category": 2,
    "title": "게시글 제목 1번째입니다. Next.js 개발 이야기",
    "description": "이것은 1번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자2",
    "write_dt": "2025.07.01",
    "count": 923
  },
  {
    "id": 2,
    "category": 3,
    "title": "게시글 제목 2번째입니다. Next.js 개발 이야기",
    "description": "이것은 2번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자3",
    "write_dt": "2025.07.02",
    "count": 481
  },
  {
    "id": 3,
    "category": 1,
    "title": "게시글 제목 3번째입니다. Next.js 개발 이야기",
    "description": "이것은 3번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자4",
    "write_dt": "2025.07.03",
    "count": 765
  },
  {
    "id": 4,
    "category": 2,
    "title": "게시글 제목 4번째입니다. Next.js 개발 이야기",
    "description": "이것은 4번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자5",
    "write_dt": "2025.07.04",
    "count": 234
  },
  {
    "id": 5,
    "category": 3,
    "title": "게시글 제목 5번째입니다. Next.js 개발 이야기",
    "description": "이것은 5번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자1",
    "write_dt": "2025.07.05",
    "count": 890
  },
  {
    "id": 6,
    "category": 1,
    "title": "게시글 제목 6번째입니다. Next.js 개발 이야기",
    "description": "이것은 6번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자2",
    "write_dt": "2025.07.06",
    "count": 567
  },
  {
    "id": 7,
    "category": 2,
    "title": "게시글 제목 7번째입니다. Next.js 개발 이야기",
    "description": "이것은 7번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자3",
    "write_dt": "2025.07.07",
    "count": 101
  },
  {
    "id": 8,
    "category": 3,
    "title": "게시글 제목 8번째입니다. Next.js 개발 이야기",
    "description": "이것은 8번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자4",
    "write_dt": "2025.07.08",
    "count": 789
  },
  {
    "id": 9,
    "category": 1,
    "title": "게시글 제목 9번째입니다. Next.js 개발 이야기",
    "description": "이것은 9번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자5",
    "write_dt": "2025.07.09",
    "count": 456
  },
  {
    "id": 10,
    "category": 2,
    "title": "게시글 제목 10번째입니다. Next.js 개발 이야기",
    "description": "이것은 10번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자1",
    "write_dt": "2025.07.10",
    "count": 999
  },
  {
    "id": 11,
    "category": 3,
    "title": "게시글 제목 11번째입니다. Next.js 개발 이야기",
    "description": "이것은 11번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자2",
    "write_dt": "2025.07.11",
    "count": 321
  },
  {
    "id": 12,
    "category": 1,
    "title": "게시글 제목 12번째입니다. Next.js 개발 이야기",
    "description": "이것은 12번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자3",
    "write_dt": "2025.07.12",
    "count": 654
  },
  {
    "id": 13,
    "category": 2,
    "title": "게시글 제목 13번째입니다. Next.js 개발 이야기",
    "description": "이것은 13번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자4",
    "write_dt": "2025.07.13",
    "count": 12
  },
  {
    "id": 14,
    "category": 3,
    "title": "게시글 제목 14번째입니다. Next.js 개발 이야기",
    "description": "이것은 14번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자5",
    "write_dt": "2025.07.14",
    "count": 87
  },
  {
    "id": 15,
    "category": 1,
    "title": "게시글 제목 15번째입니다. Next.js 개발 이야기",
    "description": "이것은 15번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자1",
    "write_dt": "2025.07.15",
    "count": 456
  },
  {
    "id": 16,
    "category": 2,
    "title": "게시글 제목 16번째입니다. Next.js 개발 이야기",
    "description": "이것은 16번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자2",
    "write_dt": "2025.07.16",
    "count": 789
  },
  {
    "id": 17,
    "category": 3,
    "title": "게시글 제목 17번째입니다. Next.js 개발 이야기",
    "description": "이것은 17번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자3",
    "write_dt": "2025.07.17",
    "count": 201
  },
  {
    "id": 18,
    "category": 1,
    "title": "게시글 제목 18번째입니다. Next.js 개발 이야기",
    "description": "이것은 18번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자4",
    "write_dt": "2025.07.18",
    "count": 305
  },
  {
    "id": 19,
    "category": 2,
    "title": "게시글 제목 19번째입니다. Next.js 개발 이야기",
    "description": "이것은 19번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자5",
    "write_dt": "2025.07.19",
    "count": 500
  },
  {
    "id": 20,
    "category": 3,
    "title": "게시글 제목 20번째입니다. Next.js 개발 이야기",
    "description": "이것은 20번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자1",
    "write_dt": "2025.07.20",
    "count": 600
  },
  {
    "id": 21,
    "category": 1,
    "title": "게시글 제목 21번째입니다. Next.js 개발 이야기",
    "description": "이것은 21번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자2",
    "write_dt": "2025.07.21",
    "count": 700
  },
  {
    "id": 22,
    "category": 2,
    "title": "게시글 제목 22번째입니다. Next.js 개발 이야기",
    "description": "이것은 22번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자3",
    "write_dt": "2025.07.22",
    "count": 800
  },
  {
    "id": 23,
    "category": 3,
    "title": "게시글 제목 23번째입니다. Next.js 개발 이야기",
    "description": "이것은 23번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자4",
    "write_dt": "2025.07.23",
    "count": 900
  },
  {
    "id": 24,
    "category": 1,
    "title": "게시글 제목 24번째입니다. Next.js 개발 이야기",
    "description": "이것은 24번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자5",
    "write_dt": "2025.07.24",
    "count": 1000
  },
  {
    "id": 25,
    "category": 2,
    "title": "게시글 제목 25번째입니다. Next.js 개발 이야기",
    "description": "이것은 25번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자1",
    "write_dt": "2025.07.25",
    "count": 1
  },
  {
    "id": 26,
    "category": 3,
    "title": "게시글 제목 26번째입니다. Next.js 개발 이야기",
    "description": "이것은 26번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자2",
    "write_dt": "2025.07.01",
    "count": 123
  },
  {
    "id": 27,
    "category": 1,
    "title": "게시글 제목 27번째입니다. Next.js 개발 이야기",
    "description": "이것은 27번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자3",
    "write_dt": "2025.07.02",
    "count": 456
  },
  {
    "id": 28,
    "category": 2,
    "title": "게시글 제목 28번째입니다. Next.js 개발 이야기",
    "description": "이것은 28번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자4",
    "write_dt": "2025.07.03",
    "count": 789
  },
  {
    "id": 29,
    "category": 3,
    "title": "게시글 제목 29번째입니다. Next.js 개발 이야기",
    "description": "이것은 29번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자5",
    "write_dt": "2025.07.04",
    "count": 987
  },
  {
    "id": 30,
    "category": 1,
    "title": "게시글 제목 30번째입니다. Next.js 개발 이야기",
    "description": "이것은 30번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자1",
    "write_dt": "2025.07.05",
    "count": 654
  },
  {
    "id": 31,
    "category": 2,
    "title": "게시글 제목 31번째입니다. Next.js 개발 이야기",
    "description": "이것은 31번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자2",
    "write_dt": "2025.07.06",
    "count": 321
  },
  {
    "id": 32,
    "category": 3,
    "title": "게시글 제목 32번째입니다. Next.js 개발 이야기",
    "description": "이것은 32번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자3",
    "write_dt": "2025.07.07",
    "count": 10
  },
  {
    "id": 33,
    "category": 1,
    "title": "게시글 제목 33번째입니다. Next.js 개발 이야기",
    "description": "이것은 33번째 게시글의 상세 내용입니다. 블라블라~ 더미 텍스트를 채워 넣습니다.",
    "auth": "작성자4",
    "write_dt": "2025.07.08",
    "count": 20
  }
]
export const sortedPosts = [...dataSample].sort((a, b) => {
  // '2025.07.25' 형식을 'YYYY-MM-DD'로 변환하여 Date 객체로 파싱합니다.
  // JavaScript Date 객체는 'YYYY.MM.DD' 형식도 어느 정도 파싱하지만,
  // 일관성을 위해 'YYYY-MM-DD' 형식을 사용하는 것이 안전합니다.
  const dateA = new Date(a.write_dt.replace(/\./g, '-'));
  const dateB = new Date(b.write_dt.replace(/\./g, '-'));

  // 내림차순 정렬 (최신 날짜가 앞으로 오도록)
  // b - a 가 양수이면 b가 a보다 크다는 의미이므로, b가 a보다 앞에 옵니다.
  // 즉, dateB가 더 최신이면 양수, dateA가 더 최신이면 음수
  return dateB.getTime() - dateA.getTime();
});