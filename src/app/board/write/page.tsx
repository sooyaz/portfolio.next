'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Quill } from 'react-quill-new';

import 'react-quill-new/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

/**
 * 에디터 특성상 dom을 조작하기 때문에 nextjs에서 사용시 SSR을 사용하지 않음을 명시해야 하기 때문
 * 또한 타입스크립트상 타입충돌로 인해 import시 컴포넌트를 한번 더 래핑하기 위해서 
 */
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    // ref를 전달할 수 있도록 래핑
    return ({ quillRef, ...props }: any) => <RQ ref={quillRef} {...props} />;
  },
  { ssr: false }
);

export default function PostWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef<{ getEditor: () => Quill } | null>(null);
  const quillInstance = quillRef.current?.getEditor();
    // 임시로 첨부된 파일들을 관리하는 상태
    const [tempAttachedFiles, setTempAttachedFiles] = useState<{ id: string; file: File; base64Url: string }[]>([]);
  // Quill 에디터의 툴바 및 핸들러 설정을 useMemo로 메모이제이션
  // 컴포넌트가 리렌더링될 때마다 객체가 새로 생성되는 것을 방지
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // 헤더 태그 (h1~h6)
        ['bold', 'italic', 'underline', 'strike'],        // 볼드, 이탤릭, 밑줄, 취소선
        [{ 'color': [] }, { 'background': [] }],          // 텍스트 색상, 배경색
        [{ 'align': [] }],                                // 정렬 (왼쪽, 중앙, 오른쪽, 양쪽 맞춤)
        ['image'],                                        // 이미지 삽입 버튼
        // ['blockquote', 'code-block'],                     // 인용구, 코드 블록
        // [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // 숫자 목록, 불릿 목록
        // [{ 'indent': '-1' }, { 'indent': '+1' }],         // 들여쓰기/내어쓰기
        // ['link', 'image', 'video'],                       // 링크, 이미지, 비디오 삽입 버튼
        // ['clean']                                         // 모든 서식 지우기
      ],
      handlers: {
        image: async ()=>{
          if (!quillRef.current) {
            console.error("Quill ref is not available !!");
            return;
          }
          const editor = quillRef.current.getEditor();
          // testref.current = 1
          if(!editor){
            console.error("Quill editor instance is not available !!");
            return;
          }
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = async () => {
            const file = input.files?.[0]; // optional chaining
            if (file) {
              try {
                const reader = new FileReader(); // FileReader 인스턴스 생성

                reader.onload = (e) => {
                  const base64Url = e.target?.result as string; // Base64 데이터 URL 획득

                  const quillEditor = editor;
                  if (quillEditor) {
                    const range = quillEditor.getSelection(); // 현재 커서 위치 또는 선택 영역

                    // 3. 고유한 임시 ID 생성 및 파일 객체 저장
                    const tempId = uuidv4(); // 각 이미지에 대한 고유 ID
                    setTempAttachedFiles(prev => [...prev, { id: tempId, file: file, base64Url }]);

                    // 4. Base64 URL을 에디터에 삽입하여 즉각적인 미리보기 제공
                    //    data-temp-id 속성을 추가하여 나중에 어떤 파일과 연결할지 식별
                    if (range) {
                      quillEditor.insertEmbed(range.index, 'image', base64Url, 'user');
                      // HTML로 삽입된 이미지 태그에 data-temp-id 속성 추가 (Quill Delta로 직접 조작하는 것이 더 견고)
                      // 현재는 간단한 예시를 위해 HTML 직접 조작 로직은 생략.
                      // 실제로는 Quill Delta를 통해 custom attribute를 추가하는 것이 좋습니다.
                      // 또는 나중에 글 저장 시 HTML에서 Base64 이미지를 찾아 임시 ID와 매핑하는 복잡한 로직이 필요.
                      // 가장 간단한 접근: 백엔드에서 Base64를 파싱하고 UUID로 매핑하는 것. (그러나 Data URL의 단점 상존)
                      // 여기서는 임시 ID를 React state에 저장하고, 실제 파일 업로드 시에만 활용.

                      quillEditor.setSelection(range.index + 1); // 커서를 이미지 뒤로 이동
                    } else {
                      // 커서가 없는 경우 (예: 초기 로드 시), 문서 끝에 삽입
                      quillEditor.insertEmbed(quillEditor.getLength(), 'image', base64Url, 'user');
                      quillEditor.setSelection(quillEditor.getLength() + 1);
                    }
                  }
                };

                reader.readAsDataURL(file); // 파일을 Base64 데이터 URL로 읽기 시작

              } catch (error) {
                console.error('이미지 업로드 중 오류 발생:', error);
                alert('이미지 업로드에 실패했습니다.');
              }
            }
          };
        }
      },
    },
    // 클립보드 붙여넣기 시 시각적 스타일 일치 여부 (옵션)
    clipboard: {
      matchVisual: false,
    },
    // 실행 취소/다시 실행 기록 모듈 (옵션)
    history: {
      delay: 2000, // 변경 감지 지연 시간 (ms)
      maxStack: 50, // 최대 기록 스택 수
      userOnly: true // 사용자 동작만 기록
    },
  }), []); // 의존성 배열이 비어있으므로 컴포넌트 마운트 시 한 번만 생성

  // 에디터 내용 변경 시 호출되는 핸들러
  const handleContentChange = (value: string) => {
    setContent(value);
  };

  // 게시글 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제목:', title);
    console.log('게시글 내용 (HTML):', content);
    console.log('555', tempAttachedFiles);

    // TODO: 제목과 content (HTML 형식)를 백엔드로 전송하는 API 호출 로직 구현
    alert('게시글 내용이 콘솔에 출력되었습니다. 실제 전송 로직을 구현하세요.');
  };

  useEffect(() => {
    if (quillInstance) {
      const handleTextChange = () => {
        // 현재 에디터의 HTML 콘텐츠를 가져옴
        const currentHtml = quillInstance.root.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(currentHtml, 'text/html');
        const currentImageElements = Array.from(doc.querySelectorAll('img'));

        // 현재 에디터에 남아있는 이미지들의 Base64 URL 목록
        const currentImageBase64Urls = new Set(
          currentImageElements
            .map(img => img.getAttribute('src'))
            .filter((src): src is string => src !== null && src.startsWith('data:image'))
        );

        // tempAttachedFiles에서 현재 에디터에 없는 이미지들을 찾아 제거
        setTempAttachedFiles(prevFiles => {
          return prevFiles.filter(fileInfo =>
            currentImageBase64Urls.has(fileInfo.base64Url)
          );
        });
      };

      quillInstance.on('text-change', handleTextChange);

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        quillInstance.off('text-change', handleTextChange);
      };
    }
  }, [quillInstance, setTempAttachedFiles]);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 필드 */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* ReactQuill 에디터 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            내용
          </label>
          {/* 에디터의 높이를 반드시 지정해야 합니다. */}
            <ReactQuill
              quillRef={quillRef} // ref를 연결하여 Quill 인스턴스에 접근
              theme="snow" // Snow 테마 적용
              value={content} // 현재 에디터 내용
              onChange={handleContentChange} // 내용 변경 시 호출될 핸들러
              modules={modules} // 에디터 기능 모듈 설정
              // formats는 modules.toolbar에 맞게 자동으로 추출되지만, 명시적으로 제어할 수 있습니다.
              // formats={['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video', 'color', 'background', 'align', 'code-block']}
              placeholder="내용을 입력하세요..."
              className="h-full" // 부모 div의 높이에 맞추기 위해 h-full 적용 (Tailwind CSS)
            />
        </div>

        <div className="mt-16 flex justify-end"> {/* 에디터 높이 고려하여 margin-top 조정 */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            게시글 등록
          </button>
        </div>
      </form>
    </div>
  );
}