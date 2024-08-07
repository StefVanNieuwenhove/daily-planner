'use client';
import { useRef, useEffect } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = posX + 'px';
        cursorDotRef.current.style.top = posY + 'px';

        cursorOutlineRef.current?.animate(
          {
            left: posX + 'px',
            top: posY + 'px',
          },
          {
            duration: 500,
            fill: 'forwards',
          }
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <>
      <div className='cursor-dot' ref={cursorDotRef}></div>
      <div className='cursor-outline' ref={cursorOutlineRef}></div>
    </>
  );
};

export default CustomCursor;
