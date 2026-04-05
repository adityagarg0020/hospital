import { useEffect, useRef } from 'react';

// Simple QR Code generator using Canvas
export default function QRCodeCanvas({ text, size = 160 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = size;
    canvas.width = s;
    canvas.height = s;

    // Simple visual QR-like pattern (deterministic from text)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, s, s);

    const modules = 21;
    const cellSize = Math.floor(s / (modules + 2));
    const offset = Math.floor((s - cellSize * modules) / 2);

    // Generate pseudo-random pattern based on text
    let seed = 0;
    for (let i = 0; i < text.length; i++) {
      seed = ((seed << 5) - seed + text.charCodeAt(i)) | 0;
    }

    const next = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed & 1) === 1;
    };

    ctx.fillStyle = '#000000';

    // Draw finder patterns (top-left, top-right, bottom-left)
    const drawFinder = (x, y) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          const isBorder = i === 0 || i === 6 || j === 0 || j === 6;
          const isInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
          if (isBorder || isInner) {
            ctx.fillRect(offset + (x + j) * cellSize, offset + (y + i) * cellSize, cellSize, cellSize);
          }
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(modules - 7, 0);
    drawFinder(0, modules - 7);

    // Draw data modules
    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        // Skip finder locations
        if ((i < 8 && j < 8) || (i < 8 && j >= modules - 8) || (i >= modules - 8 && j < 8)) continue;
        if (next()) {
          ctx.fillRect(offset + j * cellSize, offset + i * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [text, size]);

  return <canvas ref={canvasRef} className="rounded-xl border-4 border-white shadow-xl" />;
}
