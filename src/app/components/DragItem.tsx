"use client";

import { useMemo } from "react";

interface DragItemProps {
  word: string;
}

export default function DragItem({ word }: DragItemProps) {
  const wordInfo = useMemo(() => word.split('').map((letter, index) => ({
    sort: index,
    value: letter
  })).sort(() => Math.random() - 0.5), [word]);

  return (
    <>
      {wordInfo.map((word, index) => (
        <span key={index} className={`dn${word.sort} dnd-drag-item`}>
          {word.value}
        </span>
      ))}
    </>
  );
}