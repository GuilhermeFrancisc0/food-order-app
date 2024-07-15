"use client"

import { useEffect, useRef, useState } from "react";

// Cálculo da largura total do container de categorias
//
// EXEMPLO:
// 8 + 128 = 148 => length = 1
// 8 + 128 + 16 + 128 = 292 => length = 2
// 8 + 128 + 16 + 128 + 16 + 128 = 436 => length = 3
//
// FÓRMULA: 
// width = CONTAINER_PADDINGX + length * CARD_WIDTH + (length - 1) * CARD_GAP 
// width = 8 + length * 128 + (length - 1) * 16
// width = 8 + length * 128 + length * 16 - 16
// width = length * 144 - 8
// length = (width + 8) / 144;

const Loading = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [length, setLength] = useState<number>(0);

  const handleResize = (e: ResizeObserverEntry[]) => {
    const { width } = e[0].contentRect;

    const calculatedLength = (width + 8) / 144;

    if (length !== calculatedLength)
      setLength(Math.floor(calculatedLength));
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className='flex overflow-x-auto no-scrollbar space-x-4 mx-2 px-1 w-full'>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className={`skeleton w-[128px] h-[118px] my-2 shadow-sm`}></div>
      ))}
    </div>
  )
};

export default Loading;