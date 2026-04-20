import { useEffect, useRef } from 'react';

const RubberCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        if (trailRef.current) trailRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (trailRef.current) trailRef.current.style.opacity = '0';
    };

    const animate = () => {
      // Main cursor - snappy spring
      const dx1 = target.current.x - pos.current.x;
      const dy1 = target.current.y - pos.current.y;
      pos.current.x += dx1 * 0.15;
      pos.current.y += dy1 * 0.15;

      // Trail cursor - lazy rubber band
      const dx2 = target.current.x - trailPos.current.x;
      const dy2 = target.current.y - trailPos.current.y;
      trailPos.current.x += dx2 * 0.06;
      trailPos.current.y += dy2 * 0.06;

      // Calculate stretch for rubber band distortion
      const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      const scaleX = 1 + Math.min(dist * 0.003, 0.4);
      const scaleY = 1 - Math.min(dist * 0.002, 0.2);
      const angle = Math.atan2(dy2, dx2) * (180 / Math.PI);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 20}px, ${trailPos.current.y - 20}px) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Small dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <div className="w-3 h-3 rounded-full bg-accent mix-blend-difference" />
      </div>
      {/* Rubber trail ball */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-accent/60 mix-blend-difference" />
      </div>
    </>
  );
};

export default RubberCursor;
