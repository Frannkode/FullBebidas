import React, { useRef, useState, MouseEvent } from 'react';

interface HorizontalScrollProps {
  className?: string;
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ className = '', children }) => {
  const slider = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!slider.current) return;
    setIsDown(true);
    setStartX(e.pageX - slider.current.offsetLeft);
    setScrollLeft(slider.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !slider.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    
    // Smooth out updates with requestAnimationFrame
    const targetScroll = scrollLeft - walk;
    window.requestAnimationFrame(() => {
      if (slider.current) {
        slider.current.scrollLeft = targetScroll;
      }
    });
  };

  return (
    <div
      ref={slider}
      className={`${className} cursor-grab active:cursor-grabbing select-none will-change-scroll`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;