import { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    interface Dot { x: number; y: number; age: number; }
    const trail: Dot[] = [];
    let mouse = { x: -999, y: -999 };

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      trail.push({ x: mouse.x, y: mouse.y, age: 0 });
      if (trail.length > 28) trail.shift();
    };
    window.addEventListener('mousemove', onMove);

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < trail.length; i++) {
        trail[i].age++;
        const progress = i / trail.length;
        const alpha = progress * 0.7;
        const radius = progress * 5 + 1;
        const hue = 160 + progress * 60; // green → cyan
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
        ctx.fill();
      }
      // Glowing dot at cursor tip
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,100,0.9)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,100,0.15)';
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[998]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CursorTrail;
