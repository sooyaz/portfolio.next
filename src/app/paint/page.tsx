"use client"
import { useEffect, useState, useRef } from "react";

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.95;
      canvas.height = window.innerHeight * 0.8;
      const context = canvas.getContext('2d');
      if (context) {
        setCtx(context);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  // 픽셀 데이터에서 RGB 값 배열을 가져오는 함수
  const getPixelRgb = (data: Uint8ClampedArray, x: number, y: number, width: number): number[] => {
    const index = (y * width + x) * 4;
    return [data[index], data[index + 1], data[index + 2]];
  };

  // 픽셀에 RGB 값을 설정하는 함수
  const setPixelRgb = (data: Uint8ClampedArray, x: number, y: number, width: number, newRgb: number[]) => {
    const index = (y * width + x) * 4;
    data[index] = newRgb[0];
    data[index + 1] = newRgb[1];
    data[index + 2] = newRgb[2];
    data[index + 3] = 255;
  };

  // 두 색상의 유사도를 계산하는 함수 (유클리드 거리 기반)
  const areColorsSimilar = (color1: number[], color2: number[], tolerance: number): boolean => {
    const rDiff = color1[0] - color2[0];
    const gDiff = color1[1] - color2[1];
    const bDiff = color1[2] - color2[2];
    const distance = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    return distance <= tolerance;
  };

  // 16진수 색상 코드를 RGB 배열로 변환
  const hexToRgb = (hex: string): number[] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const handleFill = (e: React.MouseEvent) => {
    if (!ctx) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;
    const newRgb = hexToRgb(color);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const tolerance = 50; // 허용 오차 값

    const startRgb = getPixelRgb(data, startX, startY, canvas.width);

    if (areColorsSimilar(startRgb, newRgb, 0)) {
      return;
    }

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const [x, y] = queue.shift() as [number, number];
      const key = `${x},${y}`;

      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height || visited.has(key)) {
        continue;
      }
      visited.add(key);

      const currentRgb = getPixelRgb(data, x, y, canvas.width);

      if (areColorsSimilar(currentRgb, startRgb, tolerance)) {
        setPixelRgb(data, x, y, canvas.width, newRgb);
        queue.push([x + 1, y]);
        queue.push([x - 1, y]);
        queue.push([x, y + 1]);
        queue.push([x, y - 1]);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const startDrawing = (e: React.MouseEvent) => {
    if (!ctx) return;
    if (tool === 'fill') {
      handleFill(e);
      return;
    }
    setIsDrawing(true);
    ctx.beginPath();
    ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
    ctx.lineWidth = tool === 'eraser' ? 20 : lineWidth;
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !ctx) return;
    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 space-x-4 bg-gray-200 w-full flex justify-center">
        <button onClick={() => setTool('pen')} className="p-2 border rounded-md">펜</button>
        <button onClick={() => setTool('fill')} className="p-2 border rounded-md">페인트</button>
        <button onClick={() => setTool('eraser')} className="p-2 border rounded-md">지우개</button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input type="range" min="1" max="50" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} />
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="border border-gray-400 bg-white"
      />
    </div>
  );
}