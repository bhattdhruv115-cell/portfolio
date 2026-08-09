import { useEffect, useRef } from "react";

// Background that shifts color as the user scrolls down the page
export function ScrollBackdrop() {
  const backdropRef = useRef(null);

  useEffect(() => {
    const stops = [
      [10, 6, 10],
      [58, 15, 10],
      [77, 38, 0],
      [46, 24, 6],
    ];

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    // Full color transition completes after this many pixels of scroll,
    // regardless of total page height — keeps the effect visible even on short pages.
    const SCROLL_DISTANCE = 1200;

    function onScroll() {
      const progress = Math.min(window.scrollY / SCROLL_DISTANCE, 1);

      const segment = progress * (stops.length - 1);
      const idx = Math.min(Math.floor(segment), stops.length - 2);
      const t = segment - idx;

      const c1 = stops[idx];
      const c2 = stops[idx + 1];
      const r = Math.round(lerp(c1[0], c2[0], t));
      const g = Math.round(lerp(c1[1], c2[1], t));
      const b = Math.round(lerp(c1[2], c2[2], t));

      if (backdropRef.current) {
        backdropRef.current.style.background = `radial-gradient(circle at 50% 0%, rgb(${r},${g},${b}) 0%, #0a0505 65%)`;
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={backdropRef} className="scroll-backdrop" />;
}

// Continuous falling technical characters — red/amber code rain
export function FallingBits() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, columns, drops, raf;

    const CHARS = "01{}<>/*#$%&ABCDEF01110101".split("");
    const FONT_SIZE = 16;

    function setup() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / FONT_SIZE);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    }
    setup();
    window.addEventListener("resize", setup);

    function draw() {
      ctx.fillStyle = "rgba(10, 5, 5, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        const palette = ["#ffb020", "#ff5b3b", "#ffd23f"];
        const color = palette[i % palette.length];
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = 0.75;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        if (y > height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i] += 0.08 + Math.random() * 0.06;
      }
    }

    // Cap the animation to ~24fps instead of the browser's native 60fps
    // so the rain visibly falls slower without changing the math above.
    let lastTime = 0;
    function loop(time) {
      if (time - lastTime > 1000 / 24) {
        draw();
        lastTime = time;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return <canvas ref={canvasRef} className="falling-bits" />;
}

// Soft glowing spotlight that follows the cursor across the whole page
export function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    function onMove(e) {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return <div ref={glowRef} className="cursor-glow" />;
}

// Real-time 3D tilt on hover, based on cursor position within the element
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }
    function reset() {
      el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [ref]);
}

export function TiltCard({ className, children, onClick, style }) {
  const ref = useRef(null);
  useTilt(ref);
  return (
    <div ref={ref} className={className} onClick={onClick} style={style}>
      {children}
    </div>
  );
}