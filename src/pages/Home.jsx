import { useState, useEffect } from "react";
import "../../__config__";
import { _HeroPara, _HeroTitle, _themeColor } from "../../__config__";

const COLOR = _themeColor;

export default function Home({ onNext }) {
  const [phase, setPhase] = useState(0);
  // 0: hidden → 1: heading fades in → 2: para + btn expand in

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `radial-gradient(ellipse clamp(100px, 100%, 800px) min(70vh, 500px) at 50% 50%, ${COLOR}40 50%, transparent 80%)`,
        }}
      />

      {/* centering shell */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      >
        {/* content box */}
        <div
          style={{
            width: "min(100%, 800px)",
            height: "min(70vh, 500px)",
            border: `1px solid ${COLOR}44`,
            borderRadius: "28px",
            background: `rgb( from color-mix(in srgb, ${COLOR} 16%, #0d0a0e) r g b / 0.67`,
            backdropFilter: "blur(7px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 1.5rem, 30px)",
            boxSizing: "border-box",
            gap: "0",
            overflow: "hidden",
          }}
        >
          {/* heading */}
          <h1
            style={{
              margin: 0,
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.4rem, 8vw, 5rem)",
              fontWeight: 700,
              color: `color-mix(in srgb, ${COLOR} 15%, #f2dde6)`,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              textAlign: "center",
              opacity: phase >= 1 ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          >
            {_HeroTitle}
          </h1>

          {/* para — max-height trick for 0→auto */}
          <div
            style={{
              maxHeight: phase >= 2 ? "400px" : "0px",
              opacity: phase >= 2 ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 1s ease 0.2s, opacity 0.9s ease 0.25s",
            }}
          >
            <p
              style={{
                margin: "0 0 0 0",
                fontFamily: "Georgia, serif",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: `color-mix(in srgb, ${COLOR} 40%, #c49aae)`,
                lineHeight: 1.8,
                maxWidth: "460px",
                textAlign: "center",
              }}
            >
              {_HeroPara} <br></br>
              <span className="" style={{ color: `color-mix(in srgb, ${COLOR} 25%, #e8c4d0)` }}>
                Take a moment. This is just for you.
              </span>
            </p>
          </div>

          {/* button — same max-height reveal */}
          <div className="mt-6"
            style={{
              scale: phase >= 2 ? 1 : 0,
              opacity: phase >= 2 ? 1 : 0,
              overflow: "hidden",
              transition: "scale 1s ease 0.4s, opacity 0.9s ease 0.5s",
            }}
          >
            <button
              onClick={onNext}
              style={{
                marginTop: "0",
                padding: "0.65rem 2rem",
                borderRadius: "9999px",
                border: `1px solid ${COLOR}`,
                background: "transparent",
                color: `color-mix(in srgb, ${COLOR} 10%, #f2dde6)`,
                fontFamily: "Georgia, serif",
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${COLOR}30`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Open ↓
            </button>
          </div>

        </div>
      </div>
    </>
  );
}