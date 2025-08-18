interface DropAreaProps {
  word: string;
}

export default function DropArea({ word }: DropAreaProps) {
  const wordInfo = word.split('').map((letter, index) => ({
    sort: index,
    value: letter
  }));

  return (
    <>
      {wordInfo.map((word, index) => (
        <span key={index} className={`dn${word.sort} dnd-drop-area`}></span>
      ))}
    </>
  );
}