import { useState, useEffect, useRef } from "react";
import { _ConfessButtons, _ConfessEmoji, _ConfessFinalText, _ConfessRevealText, _themeColor } from "../../__config__";

// ── Button config ────────────────────────────────────────────────────────────
// clickable: true  → clicking redirects to `url`
// clickable: false → btn escapes the cursor (TikTok dodge trend)
const BUTTONS = _ConfessButtons
function DodgeButton({ text }) {
  const btnRef = useRef(null);
  const pos = useRef({ x: null, y: null });

  const dodge = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const mx = e.clientX ?? e.touches?.[0]?.clientX ?? cx;
    const my = e.clientY ?? e.touches?.[0]?.clientY ?? cy;
    const dx = cx - mx;
    const dy = cy - my;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const push = 140;
    let nx = (pos.current.x ?? 0) + (dx / dist) * -push;
    let ny = (pos.current.y ?? 0) + (dy / dist) * -push;
    // clamp to viewport
    const vw = window.innerWidth, vh = window.innerHeight;
    const hw = rect.width / 2, hh = rect.height / 2;
    const ax = rect.left - (pos.current.x ?? 0);
    const ay = rect.top - (pos.current.y ?? 0);
    nx = Math.max(-(ax - hw), Math.min(vw - ax - hw * 2, nx));
    ny = Math.max(-(ay - hh), Math.min(vh - ay - hh * 2, ny));
    pos.current = { x: nx, y: ny };
    el.style.transform = `translate(${nx}px, ${ny}px)`;
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={dodge}
      onMouseMove={dodge}
      onTouchStart={dodge}
      className="px-6 py-3 rounded-full border  text-[#c49aae] text-sm cursor-default select-none opacity-70"
      style={{
        transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        fontFamily: "Georgia, serif",
        border: `2px solid color-mix(in srgb, ${_themeColor} 16%, #0d0a0e)`
      }}
    >
      {text}
    </button>
  );
}

export default function Confess({ navigate }) {
  const [phase, setPhase] = useState(0);
  // 0: hidden → 1: line1 visible → 2: line1 slides up, line2 fades in → 3: btns appear

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2600);
    const t3 = setTimeout(() => setPhase(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleClickable = (url) => {
    if (navigate) navigate(url);
    else window.location.href = url;
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0d0a0e]"
    >
      {/* Subtle pulse glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 50%,
            color-mix(in srgb, ${_themeColor} 86%, #0d0a0e) 0%, transparent 70%)`,
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        {/* Line 1 */}
        <h1
          className="text-[clamp(2rem, 10vh, 4rem)] font-bold text-[#f2dde6] leading-tight"
          style={{
            fontFamily: "Georgia, serif",
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 2 ? "translateY(-3.5rem)" : "translateY(0)",
            transition: "opacity 1.1s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {_ConfessRevealText}
        </h1>

        {/* Line 2 */}
        <h1
          className="text-5xl md:text-7xl font-bold leading-tight"
          style={{
            fontFamily: "Georgia, serif",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(1.5rem)",
            transition: "opacity 1.2s ease 0.1s, transform 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        >
          <span style={{
            background: `linear-gradient(135deg,
            color-mix(in srgb, ${_themeColor} 16%, #fff) 0%,
            color-mix(in srgb, ${_themeColor} 76%, #fff) 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transition: "opacity 1.2s ease 0.1s, transform 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}> {_ConfessFinalText} </span>
          {_ConfessEmoji}
        </h1>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center mt-4"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(1rem)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {BUTTONS.map((btn) =>
            btn.clickable ? (
              <button
                key={btn.id}
                onClick={() => handleClickable(btn.url)}
                className="px-8 py-3 rounded-full text-sm text-[#fce8f0] active:scale-95 transition-all"
                style={{
                  fontFamily: "Georgia, serif",
                  background: `linear-gradient(135deg,
                  color-mix(in srgb, ${_themeColor} 66%, #0d0a0e),
                  color-mix(in srgb, ${_themeColor} 46%, #0d0a0e))`,
                  border: `1px solid color-mix(in srgb, ${_themeColor} 66%, #fff)`,
                  letterSpacing: "0.05em",
                }}
              >
                {btn.text}
              </button>
            ) : (
              <DodgeButton key={btn.id} text={btn.text} />
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}