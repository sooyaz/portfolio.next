"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#FF9F43",
  "#74B9FF",
  "#CCCCCC",
];

export default function LunchGame(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [wheelSize, setWheelSize] = useState(320);

  const [input, setInput] = useState("");

  const [menus, setMenus] = useState<string[]>([
    "김치찌개",
    "제육볶음",
    "햄버거",
    "돈까스",
  ]);

  const [rotation, setRotation] = useState(0);

  const [isSpinning, setIsSpinning] = useState(false);

  const [result, setResult] = useState("");

  // 반응형 룰렛 크기
  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setWheelSize(width - 40);
      } else {
        setWheelSize(420);
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 룰렛 다시 그리기
  useEffect(() => {
    drawWheel();
  }, [menus, rotation, wheelSize]);

  const drawWheel = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const size = wheelSize;

    canvas.width = size;
    canvas.height = size;

    const center = size / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, size, size);

    const anglePerSlice = (Math.PI * 2) / menus.length;

    menus.forEach((menu, index) => {
      const startAngle = rotation + index * anglePerSlice;
      const endAngle = startAngle + anglePerSlice;

      // 조각
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fill();

      // 텍스트
      ctx.save();

      ctx.translate(center, center);
      ctx.rotate(startAngle + anglePerSlice / 2);

      ctx.textAlign = "right";
      ctx.fillStyle = "white";

      // 모바일 폰트 크기 자동 조절
      const fontSize = size < 400 ? 14 : 18;

      ctx.font = `bold ${fontSize}px sans-serif`;

      ctx.fillText(menu, radius - 20, 5);

      ctx.restore();
    });

    // 가운데 원
    ctx.beginPath();
    ctx.arc(center, center, size * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    // 화살표
    ctx.beginPath();

    ctx.moveTo(center, 38);
    ctx.lineTo(center - 16, 8);
    ctx.lineTo(center + 16, 8);

    ctx.closePath();

    ctx.fillStyle = "#ef4444";
    ctx.fill();
  };

  const addMenu = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    if (menus.includes(trimmed)) {
      alert("이미 추가된 메뉴입니다.");
      return;
    }

    setMenus((prev) => [...prev, trimmed]);

    setInput("");
  };

  const removeMenu = (target: string) => {
    setMenus((prev) => prev.filter((m) => m !== target));
  };

  const spinWheel = () => {
    if (isSpinning) return;

    if (menus.length < 2) {
      alert("메뉴를 2개 이상 추가해주세요.");
      return;
    }

    setResult("");

    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * menus.length);

    const anglePerSlice = (Math.PI * 2) / menus.length;

    const extraSpins = Math.PI * 2 * 5;

    const targetAngle =
      rotation +
      extraSpins +
      (Math.PI * 2 - randomIndex * anglePerSlice) -
      (rotation % (Math.PI * 2)) -
      anglePerSlice / 2;

    const start = rotation;

    const duration = 4500;

    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentRotation =
        start + (targetAngle - start) * easeOut;

      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        setResult(menus[randomIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  return(
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-center mb-6">
          🍴 점심 메뉴 룰렛
        </h1>

        {/* 입력 */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            placeholder="메뉴 입력"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addMenu();
              }
            }}
            className="
              flex-1
              h-12
              px-4
              rounded-2xl
              border
              bg-white
              text-base
              outline-none
            "
          />

          <button
            onClick={addMenu}
            disabled={isSpinning}
            className="
              px-5
              rounded-2xl
              bg-blue-500
              text-white
              font-semibold
              active:scale-95
              transition
            "
          >
            추가
          </button>
        </div>

        {/* 룰렛 */}
        <div className="flex flex-col items-center">
          <canvas
            ref={canvasRef}
            className="
              rounded-full
              shadow-xl
              bg-white
            "
            style={{
              width: wheelSize,
              height: wheelSize,
            }}
          />

          {/* 결과 */}
          {result && (
            <div
              className="
                mt-5
                text-2xl
                font-bold
                text-center
              "
            >
              🎉 오늘 점심은
              <div className="mt-2 text-red-500">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* 메뉴 리스트 */}
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">
            메뉴 목록
          </h2>

          <div className="flex flex-col gap-3">
            {menus.map((menu) => (
              <div
                key={menu}
                className="
                  bg-white
                  rounded-2xl
                  px-4
                  py-4
                  flex
                  items-center
                  justify-between
                  shadow-sm
                "
              >
                <span className="font-medium">
                  {menu}
                </span>

                <button
                  onClick={() => removeMenu(menu)}
                  className="
                    text-red-500
                    text-sm
                    font-semibold
                    active:scale-95
                  "
                  disabled={isSpinning}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div
        className="
          sticky
          bottom-0
          left-0
          w-full
          bg-white/90
          backdrop-blur
          border-t
          p-4
        "
      >
        <div className="max-w-xl mx-auto">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="
              w-full
              h-14
              rounded-2xl
              bg-red-500
              text-white
              text-lg
              font-bold
              shadow-lg
              active:scale-[0.98]
              transition
              disabled:opacity-50
            "
          >
            {isSpinning
              ? "룰렛 돌아가는 중..."
              : "룰렛 돌리기"}
          </button>
        </div>
      </div>
    </div>
  )
}