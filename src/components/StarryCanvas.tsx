import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  currentAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const StarryCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palettes for stars
    const starColors = [
      '#FFFFFF',
      '#FDE68A', // Warm gold
      '#F59E0B', // Amber
      '#E2E8F0', // Starlight
      '#93C5FD', // Soft blue
      '#DDD6FE'  // Ethereal violet
    ];

    // Generate stars
    const starCount = Math.min(220, Math.floor((width * height) / 7500));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      baseAlpha: Math.random() * 0.5 + 0.3,
      currentAlpha: Math.random() * 0.8,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    }));

    // Generate dust particles
    const dustCount = Math.min(45, Math.floor((width * height) / 32000));
    const dusts: DustParticle[] = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.4 ? '#FDE68A' : '#94A3B8'
    }));

    // Occasional shooting stars
    const shootingStars: ShootingStar[] = [];
    const triggerShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.4) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 12,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.3,
          alpha: 1,
          active: true
        });
      }
    };

    const interval = setInterval(triggerShootingStar, 6000);

    // Mouse glow interaction
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Subtle mouse radial glow
      if (mouseX > 0 && mouseY > 0) {
        const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
        mouseGrad.addColorStop(0, 'rgba(245, 158, 11, 0.05)');
        mouseGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
        mouseGrad.addColorStop(1, 'rgba(8, 11, 20, 0)');
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw dust
      dusts.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha * (0.8 + Math.sin(tick * 0.02 + d.x) * 0.2);
        ctx.fill();
      });

      // Draw stars
      stars.forEach((s) => {
        s.twinklePhase += s.twinkleSpeed;
        const pulse = (Math.sin(s.twinklePhase) + 1) / 2;
        s.currentAlpha = s.baseAlpha + pulse * (1 - s.baseAlpha);

        // Distance to cursor
        const dx = mouseX - s.x;
        const dy = mouseY - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let extraAlpha = 0;
        if (dist < 140) {
          extraAlpha = (1 - dist / 140) * 0.4;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.min(1, s.currentAlpha + extraAlpha);
        ctx.fill();

        // Star aura for brighter stars
        if (s.size > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = (s.currentAlpha + extraAlpha) * 0.15;
          ctx.fill();
        }
      });

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) {
          shootingStars.splice(i, 1);
          continue;
        }

        const nextX = ss.x + Math.cos(ss.angle) * ss.speed;
        const nextY = ss.y + Math.sin(ss.angle) * ss.speed;
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, nextX, nextY);
        grad.addColorStop(0, 'rgba(253, 230, 138, 0)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(nextX, nextY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        ss.x = nextX;
        ss.y = nextY;
        ss.alpha -= 0.02;

        if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
          ss.active = false;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
