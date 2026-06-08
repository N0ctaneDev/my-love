import { useEffect, useRef } from "react";
import { _bgEmoji, _themeColor } from "../__config__";

const EMOJI = _bgEmoji;
const COUNT = 40;
const SIZE_RANGE = [0.06, 0.21]; // as fraction of viewport height

const COLOR = _themeColor;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function EmojiBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: COUNT }, () => ({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight),
      size: randomBetween(SIZE_RANGE[0], SIZE_RANGE[1]) * window.innerHeight,
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.3, 0.3),
      alpha: randomBetween(0.04, 0.14),
      alphaDir: Math.random() < 0.5 ? 1 : -1,
      alphaSpeed: randomBetween(0.0008, 0.002),
    }));

    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // smooth random drift
        p.vx += randomBetween(-0.015, 0.015);
        p.vy += randomBetween(-0.015, 0.015);
        // clamp speed
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));

        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        // breathe alpha
        p.alpha += p.alphaDir * p.alphaSpeed;
        if (p.alpha >= 0.14) { p.alpha = 0.14; p.alphaDir = -1; }
        if (p.alpha <= 0.04) { p.alpha = 0.04; p.alphaDir =  1; }

        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(EMOJI, p.x, p.y);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background: `color-mix(in srgb, ${COLOR} 26%, #111)`,
      }}
    />
  );
}