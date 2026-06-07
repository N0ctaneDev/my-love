import { useState, useEffect } from "react";

export default function Home({ onNext }) {
  const [phase, setPhase] = useState(0);
  // 0: hidden → 1: heading fades in → 2: heading slides up, para + btn fade in

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* Layer 0.5 — soft radial glow, sits above emojis */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,80,120,0.90) 0%, transparent 70%)",
        }}
      />

      {/* Layer 1 — text content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ 
          zIndex: 2,
          height: "100%",
        }}
      >
        {/* Big heading */}
        <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontWeight: 700,
            color: "#f2dde6",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 1.2s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          Hey, you.
        </h1>

        {/* Para — slides in under heading after it moves up */}
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "#c49aae",
            lineHeight: 1.8,
            maxWidth: "420px",
            height: phase >= 2 ? "auto" : "0px",
            marginTop: "0.5rem",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 1s ease 0.25s,height 1s ease 0.25s",
          }}
        >
          There's something I've been meaning to show you.
          <br />
          Something that lives in my chest every single day.
          <br /><br />
          <span style={{ color: "#e8c4d0" }}>Take a moment. This is just for you.</span>
        </p>

        {/* Button */}
        <button
          onClick={onNext}
          style={{
            marginTop: "2.5rem",
            padding: "0.7rem 2.2rem",
            borderRadius: "9999px",
            border: "1px solid #b06080",
            background: "transparent",
            color: "#f2dde6",
            fontFamily: "'Georgia', serif",
            fontSize: "0.8rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(1.2rem)",
            transition:
              "opacity 1s ease 0.5s, transform 1s ease 0.5s, background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(176,96,128,0.18)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Open ↓
        </button>
      </div>
    </>
  );
}