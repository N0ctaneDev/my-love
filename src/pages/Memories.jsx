import { useState, useEffect, useRef } from "react";
import { _MemoryGallerySpeed, _MemoryMessages, _REPO, _themeColor } from "../../__config__";

const COLOR = _themeColor;
const Repo = _REPO;
const MESSAGES = _MemoryMessages;

// Horizontal scrolling row — images scroll left or right
function GalleryRow({ images, direction }) {
  const rowRef = useRef(null);
  const offset = useRef(0);
  const rafRef = useRef(null);
  const speed = direction === "right" ? _MemoryGallerySpeed : -_MemoryGallerySpeed;
 
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
    fetch(`/${Repo}/memories/index.json`)
      .then((r) => r.json())
      .then((files) => {
        if (Array.isArray(files) && files.length >= 7) {
          setImages(files.map((f) => `/${Repo}/memories/${f}`));
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
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent:"space-between",opacity: 1, zIndex: 0 }}>
          {/* top row — scrolls left, exactly 50vh */}
          <div style={{ height: "40vh", width: "100%" }}>
            <GalleryRow images={topImages.length ? topImages : images.slice(0, Math.ceil(images.length / 2))} direction="left" />
          </div>
          {/* bottom row — scrolls right, exactly 50vh */}
          <div style={{ height: "40vh", width: "100%" }}>
            <GalleryRow images={botImages.length ? botImages : images.slice(Math.ceil(images.length / 2))} direction="right" />
          </div>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",zIndex: 1, height: "100%",
            background: "linear-gradient(to bottom, transparent 25dvh, #0d0a0e 40dvh,  #0d0a0e 60dvh, transparent 75dvh)",
          }} />
        </div>
      ) : null}

      {/* radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `radial-gradient(ellipse clamp(300px, 88vw, 520px) 50% at 50% 50%, ${COLOR}22 50%, transparent 80%)`,
        }}
      />
      
      {/* ── Layer 1: dark vignette overlay ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1.5, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,10,14,0.05) 20%, rgba(13,10,14,0.52) 100%)",
        }}
      />

      {/* ── Layer 2: message box ── */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2,padding: "0 1rem"}}
      >
        <div
          style={{
            // width: clamp 300px → 90vw → 520px
            width: "clamp(300px, 88vw, 520px)",
            // height: clamp 200px → 55vh → 600px
            height: "clamp(360px, auto, 35vh)",
            borderRadius: "24px",
            border: `1px solid ${COLOR}44`,
            background: `rgb( from color-mix(in srgb, ${COLOR} 18%, #0d0a0e) r g b / 0.75`,
            backdropFilter: "blur(7px)",
            padding: "clamp(1.2rem, 4vw, 2.2rem)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.6rem, 1.5vh, 1.2rem)",
            boxSizing: "border-box",
            overflow: "hidden",
            transition: "height 2s ease",
          }}
        >
          {/* counter */}
          <p style={{
            margin: 0,
            fontSize: "clamp(0.6rem, 1.2vh, 1.5rem)",
            color: `color-mix(in srgb, ${COLOR} 40%, #c49aae)`,
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
              color: `color-mix(in srgb, ${COLOR} 15%, #f2dde6)`,
              lineHeight: 1.25,
            }}>
              {MESSAGES[msgIdx].title}
            </h2>
            <p style={{
              margin: 0,
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1rem, 1.8vw, 1.05rem)",
              color: `color-mix(in srgb, ${COLOR} 25%, #e8c4d0)`,
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
                marginTop: "0",
                padding: "0.45rem 1rem",
                borderRadius: "9999px",
                border: `1px solid ${COLOR}`,
                background: "transparent",
                color: `color-mix(in srgb, ${COLOR} 10%, #f2dde6)`,
                fontFamily: "Georgia, serif",
                fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: msgIdx === 0 ? "not-allowed" : "pointer",
                opacity: msgIdx === 0 ? 0.2 : 1,
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => { if (msgIdx !== 0) e.currentTarget.style.background = `color-mix(in srgb, ${COLOR} 46%, #0d0a0e)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              ← Prev
            </button>

            {isLast ? (
              <button
                onClick={onNext}
                style={{
                  marginTop: "0",
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  border: `1px solid ${COLOR}`,
                  background: `color-mix(in srgb, ${COLOR} 70%, #111)`,
                  color: `color-mix(in srgb, ${COLOR} 10%, #fff)`,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `color-mix(in srgb, ${COLOR} 80%, #555)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `color-mix(in srgb, ${COLOR} 70%, #111)`; }}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => changeMsg(1)}
                style={{
                  marginTop: "0",
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  border: `1px solid ${COLOR}`,
                  background: "transparent",
                  color: `color-mix(in srgb, ${COLOR} 10%, #f2dde6)`,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `color-mix(in srgb, ${COLOR} 46%, #0d0a0e)`; }}
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