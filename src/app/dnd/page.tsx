"use client"
import { useEffect, useState } from "react";
import { registDND } from "@/lib/dndmatch";

import DragItem from "../components/DragItem";
import DropArea from "../components/DropArea";

export default function DragNDrop() {
  const word = 'apple';
  const wordKor = '사과';
  const [selectWord, setSelectWord] = useState<string>('');

  const checkAnswer = () => {
    const isCorrect = selectWord === word;

    if (isCorrect) {
      alert('정답입니다!');
    } else {
      alert('틀렸습니다. 다시 시도해 주세요!');
    }
  };

  const resetGame = () => {
    const dropAreaList = document.querySelectorAll<HTMLElement>('.dnd-drop-area');
    const dragItemList = document.querySelectorAll<HTMLElement>('.dnd-drag-item');
    
    dropAreaList.forEach((area) => {
      area.classList.remove('active');
      area.classList.remove('lock-in');
      area.removeAttribute('aria-valuetext');
      area.innerHTML = '';
    });

    dragItemList.forEach((item) => {
      item.removeAttribute('style');
    });

    setSelectWord('');
  };

  useEffect(()=>{
    registDND(({source, selectWord, dropIn, dropBoxNo, dragItemNo, word})=>{
      setSelectWord(word);
    });
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4" id="dnd-wrapper">
      {/* 문제 제목 */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">단어 맞추기 퀴즈!</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{wordKor}</h2>
      
      {/* 문제 영역 (빈칸) */}
      <div className="flex space-x-4 mb-12">
        <DropArea word={word} />
      </div>

      {/* 보기 영역 (알파벳 사각형) */}
      <div className="flex flex-wrap justify-center gap-4">
        <DragItem word={word} />
      </div>

      {/* 버튼영역 */}
      <div className="flex absolute bottom-4 right-4">
        <button onClick={checkAnswer}>정답확인</button>
        <button onClick={resetGame}>다시하기</button>
      </div>
    </div>
  );
}
