import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  {
    title: "The Beginning",
    content:
      "I remember the exact moment I knew — not a grand gesture, just a quiet Tuesday, and you laughed at something small. And that was it. That was the beginning of everything.",
  },
  {
    title: "The Little Things",
    content:
      "The way you hold your mug with both hands. How you get excited about clouds. The specific hum you do when you're thinking. I've catalogued all of it without even trying.",
  },
  {
    title: "When You Were Sad",
    content:
      "I hated that I couldn't fix it. But I loved that you let me sit with you in it. That kind of trust — I don't take it lightly.",
  },
  {
    title: "Every Ordinary Day",
    content:
      "Nothing special happened. We just existed in the same space. And somehow, those are the days I replay the most.",
  },
  {
    title: "What I Never Said",
    content:
      "I wanted to say it a hundred times but the moment always felt too small or too big. So I saved it. For here. For now.",
  },
  {
    title: "Something Ridiculous",
    content:
      "That one time we laughed so hard neither of us could speak. I don't even remember what it was about. I just remember your face.",
  },
  {
    title: "Right Now",
    content:
      "You're reading this, and somehow that feels like the bravest thing I've ever done — handing you something real and watching you open it.",
  },
];

// Horizontal scrolling row — images scroll left or right
function GalleryRow({ images, direction }) {
  const rowRef = useRef(null);
  const offset = useRef(0);
  const rafRef = useRef(null);
  const speed = direction === "right" ? 0.5 : -0.5;
 
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
 
    // stagger the right row so the two rows don't look identical
    if (direction === "right") offset.current = -el.scrollWidth / 4;
 
    const tick = () => {
      const half = el.scrollWidth / 2;
      offset.current += speed;
      // scrolling left (negative): reset when we've moved one full copy width
      if (direction === "left"  && offset.current <= -half) offset.current += half;
      // scrolling right (positive): reset when offset returns to 0 territory
      if (direction === "right" && offset.current >= 0)     offset.current -= half;
      el.style.transform = `translateX(${offset.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);
 
  const doubled = [...images, ...images];
 
  return (
    // outer clip
    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      {/* inner strip — flex row, no wrap */}
      <div
        ref={rowRef}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "12px",
          height: "100%",
          willChange: "transform",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            style={{
              height: "100%",
              flexShrink: 0,
              borderRadius: "16px",
              overflow: "hidden",
              // width auto so aspect ratio is preserved — browser sizes it from height
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                height: "100%",
                width: "auto",
                display: "block",
                objectFit: "cover",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Memories({ onNext }) {
  const [images, setImages] = useState([]);
  const [msgIdx, setMsgIdx] = useState(0);
  const [msgAnim, setMsgAnim] = useState("in");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/my-love/memories/index.json")
      .then((r) => r.json())
      .then((files) => {
        if (Array.isArray(files) && files.length >= 7) {
          setImages(files.map((f) => `/my-love/memories/${f}`));
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const changeMsg = (dir) => {
    setMsgAnim("out");
    setTimeout(() => {
      setMsgIdx((prev) =>
        Math.max(0, Math.min(MESSAGES.length - 1, prev + dir))
      );
      setMsgAnim("in");
    }, 350);
  };

  const isLast = msgIdx === MESSAGES.length - 1;
  const useGallery = images.length >= 7;

  const topImages = useGallery ? images.filter((_, i) => i % 2 === 0) : [];
  const botImages = useGallery ? images.filter((_, i) => i % 2 === 1) : [];

  return (
    <>
      {/* ── Layer 0: background ── */}
      {useGallery ? (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", opacity: 1, zIndex: 0 }}>
          {/* top row — scrolls left, exactly 50vh */}
          <div style={{ height: "50vh", width: "100%" }}>
            <GalleryRow images={topImages.length ? topImages : images.slice(0, Math.ceil(images.length / 2))} direction="left" />
          </div>
          {/* bottom row — scrolls right, exactly 50vh */}
          <div style={{ height: "50vh", width: "100%" }}>
            <GalleryRow images={botImages.length ? botImages : images.slice(Math.ceil(images.length / 2))} direction="right" />
          </div>
        </div>
      ) : null}

      {/* ── Layer 1: dark vignette overlay ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,10,14,0.05) 20%, rgba(13,10,14,0.52) 100%)",
        }}
      />

      {/* ── Layer 2: message box ── */}
      <div className="absolute top-5/12 left-1/2 -translate-1/2 flex items-center justify-center"
        style={{ zIndex: 2,padding: "0 1rem"}}
      >
        <div
          style={{
            // width: clamp 300px → 90vw → 520px
            width: "clamp(300px, 88vw, 520px)",
            // height: clamp 200px → 55vh → 600px
            height: "clamp(200px, 55vh, 600px)",
            borderRadius: "24px",
            border: "1px solid rgba(92,46,66,0.6)",
            background: "rgba(30,14,22,0.84)",
            backdropFilter: "blur(28px)",
            padding: "clamp(1.2rem, 4vw, 2.2rem)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.6rem, 1.5vh, 1.2rem)",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* counter */}
          <p style={{
            margin: 0,
            fontSize: "clamp(0.6rem, 1.2vh, 1.5rem)",
            color: "#9a6070",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            fontWeight: 500,
            fontFamily: "Georgia, serif",
          }}>
            Memory {msgIdx + 1} of {MESSAGES.length}
          </p>

          {/* animated content area */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              opacity: msgAnim === "in" ? 1 : 0,
              transform: msgAnim === "in" ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <h2 style={{
              margin: "0 0 clamp(0.4rem, 1vh, 0.8rem) 0",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.2rem, 3vh, 1.85rem)",
              fontWeight: 700,
              color: "#f2dde6",
              lineHeight: 1.25,
            }}>
              {MESSAGES[msgIdx].title}
            </h2>
            <p style={{
              margin: 0,
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1rem, 1.8vw, 1.05rem)",
              color: "#c49aae",
              lineHeight: 1.75,
            }}>
              {MESSAGES[msgIdx].content}
            </p>
          </div>

          {/* nav buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <button
              onClick={() => changeMsg(-1)}
              disabled={msgIdx === 0}
              style={{
                padding: "0.45rem 1.2rem",
                borderRadius: "9999px",
                border: "1px solid #5c2e42",
                background: "transparent",
                color: "#c49aae",
                fontFamily: "Georgia, serif",
                fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                cursor: msgIdx === 0 ? "not-allowed" : "pointer",
                opacity: msgIdx === 0 ? 0.2 : 1,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { if (msgIdx !== 0) e.currentTarget.style.background = "rgba(92,46,66,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              ← Prev
            </button>

            {isLast ? (
              <button
                onClick={onNext}
                style={{
                  padding: "0.45rem 1.4rem",
                  borderRadius: "9999px",
                  border: "1px solid #d08090",
                  background: "rgba(176,96,128,0.8)",
                  color: "#fce8f0",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#c0708a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(176,96,128,0.8)"; }}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => changeMsg(1)}
                style={{
                  padding: "0.45rem 1.2rem",
                  borderRadius: "9999px",
                  border: "1px solid #5c2e42",
                  background: "transparent",
                  color: "#c49aae",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(92,46,66,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}