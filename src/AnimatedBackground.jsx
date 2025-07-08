import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const CIRCLES = 12;
const COLORS = [
  'rgba(99,102,241,0.18)', // blue
  'rgba(67,56,202,0.15)',  // indigo
  'rgba(168,85,247,0.13)', // purple
  'rgba(59,130,246,0.13)', // light blue
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const AnimatedBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--parallax-x', x * 20 + 'px');
        containerRef.current.style.setProperty('--parallax-y', y * 20 + 'px');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="animated-bg" ref={containerRef}>
      {Array.from({ length: CIRCLES }).map((_, i) => {
        const size = randomBetween(80, 180);
        const left = randomBetween(0, 100);
        const top = randomBetween(0, 100);
        const color = COLORS[i % COLORS.length];
        const duration = randomBetween(12, 28);
        return (
          <div
            key={i}
            className="bg-circle"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: color,
              animationDuration: `${duration}s`,
              filter: 'blur(2px)',
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedBackground; 