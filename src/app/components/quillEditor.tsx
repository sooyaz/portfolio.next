// components/QuillEditor.tsx (예시 파일명)
'use client'; // Next.js App Router 사용 시

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
// import  useQuill  from 'react-quill-new'; // 'react-quill' 라이브러리 사용 가정
import 'react-quill-new/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid
import type { Quill } from 'react-quill-new';

// Quill 동적 임포트 (SSR 방지)
// const ReactQuill = dynamic(async () => {
//   const { default: RQ } = await import('react-quill-new');
//   return ({ quillRef, ...props }: any) => <RQ ref={quillRef} {...props} />;
// }, { ssr: false });

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    // ref를 전달할 수 있도록 래핑
    return ({ quillRef, ...props }: any) => <RQ ref={quillRef} {...props} />;
  },
  { ssr: false }
);

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  onFilesChange: (files: { id: string; file: File }[]) => void; // 최종 업로드할 파일 목록을 부모 컴포넌트로 전달하는 콜백
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, onFilesChange }) => {
  const quillRef = useRef<{ getEditor: () => Quill } | null>(null);
  if (!quillRef.current) {
    console.error("Quill ref is not available !!");
    return;
  }
  const quillInstance = quillRef.current.getEditor();
  if(!quillInstance){
    console.error("Quill editor instance is not available !!");
    return;
  }
  // const quillInstance = quillRef.current?.getEditor(); // Quill 인스턴스 직접 접근
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 숨겨진 파일 input 참조

  // 임시로 첨부된 파일들을 관리하는 상태
  const [tempAttachedFiles, setTempAttachedFiles] = useState<{ id: string; file: File }[]>([]);

  useEffect(() => {
    // 부모 컴포넌트에 현재 파일 목록을 전달
    onFilesChange(tempAttachedFiles);
  }, [tempAttachedFiles, onFilesChange]);

  const imageHandler = useCallback(() => {
    // 1. 숨겨진 파일 input 요소 생성 (또는 기존 요소 재활용)
    if (!fileInputRef.current) {
      fileInputRef.current = document.createElement('input');
      fileInputRef.current.setAttribute('type', 'file');
      fileInputRef.current.setAttribute('accept', 'image/*'); // 이미지 파일만 허용
      fileInputRef.current.style.display = 'none'; // 화면에 보이지 않게 숨김
      document.body.appendChild(fileInputRef.current); // DOM에 추가
    }

    // 2. 파일 선택 시 이벤트 핸들러
    fileInputRef.current.onchange = async () => {
      const file = fileInputRef.current?.files?.[0]; // 선택된 파일 객체
      if (file) {
        try {
          const reader = new FileReader(); // FileReader 인스턴스 생성

          reader.onload = (e) => {
            const base64Url = e.target?.result as string; // Base64 데이터 URL 획득

            const quillEditor = quillInstance;
            if (quillEditor) {
              const range = quillEditor.getSelection(); // 현재 커서 위치 또는 선택 영역

              // 3. 고유한 임시 ID 생성 및 파일 객체 저장
              const tempId = uuidv4(); // 각 이미지에 대한 고유 ID
              setTempAttachedFiles(prev => [...prev, { id: tempId, file: file }]);

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
          console.error('이미지 미리보기 처리 중 오류 발생:', error);
          alert('이미지 미리보기에 실패했습니다.');
        } finally {
          // 파일 input을 초기화하여 같은 파일 재선택 시에도 change 이벤트 발생
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      }
    };

    // 5. 파일 input 클릭 이벤트 트리거
    fileInputRef.current?.click();
  }, [quillInstance, setTempAttachedFiles]);


  // Quill 모듈 설정
  const modules = React.useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'], // 이미지 버튼 포함
        ['clean']
      ],
      handlers: {
        image: imageHandler, // 이미지 버튼 클릭 시 커스텀 핸들러 연결
      },
    },
    clipboard: {
      matchVisual: false, // HTML 붙여넣기 시 시각적 일치를 비활성화
    },
  }), [imageHandler]);

  // Quill 포맷 (허용되는 스타일)
  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', // 이미지 포맷 허용
  ];

  return (
    <ReactQuill
      quillRef={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="내용을 작성하세요..."
      style={{ height: '400px', marginBottom: '50px' }} // 높이 조절
    />
  );
};

export default QuillEditor;