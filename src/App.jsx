import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home";
import Memories from "./pages/Memories";
import Confess from "./pages/Confess";
import { _FinalCompliment, _FinalText, _name, _REPO, _themeColor, _FinalGif } from "../__config__";


function Yes() {
  return (
    <div style={{ 
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", gap: "1.5rem", padding: "1.5rem",
      background: "transparent",
    }}>
      <img
        src={`/${_REPO}/${_FinalGif}.gif`}
        alt=""
        style={{
          width: "clamp(120px, 30vw, 220px)",
          height: "auto",
          borderRadius: "1rem",
        }}
      />
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem,8vw,4rem)", color: `color-mix(in srgb, ${_themeColor} 26%, #fff)`, position: "relative", zIndex: 1 }}>
        {_FinalText}
      </h1>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2vw,1.2rem)", color: `color-mix(in srgb, ${_themeColor} 46%, #fff)`, position: "relative", zIndex: 1 }}>
        {_FinalCompliment}
      </p>
    </div>
  );
}

const FADE_MS = 600; // fade duration in ms

export default function App() {
  const [current, setCurrent]     = useState("home"); // fully visible page
  const [next,    setNext]        = useState(null);   // page waiting to enter
  const [phase,   setPhase]       = useState("idle"); // "idle" | "out" | "in"
  const timerRef = useRef(null);

  const navigate = (to) => {
    if (to === current || phase !== "idle") return;
    clearTimeout(timerRef.current);
    setNext(to);
    setPhase("out"); // start fading current out
    timerRef.current = setTimeout(() => {
      setCurrent(to); // swap page (next is now current, but still opacity 0)
      setNext(null);
      setPhase("in");
      timerRef.current = setTimeout(() => {
        setPhase("idle");
      }, FADE_MS);
    }, FADE_MS);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // opacity of the single rendered page
  const opacity = phase === "out" ? 0 : 1;

  const pageProps = {
    home:     { onNext: () => navigate("memories") },
    memories: { onNext: () => navigate("confess")  },
    confess:  { navigate: (route) => {
      const map = { "/memories": "memories", "/confess": "confess", "/yes": "yes" };
      navigate(map[route] ?? route.replace("/", ""));
    }},
    yes: {},
  };

  const PageMap = { home: Home, memories: Memories, confess: Confess, yes: Yes };
  const ActivePage = PageMap[current];


  useEffect(() => {
      document.title = _name;
    }, []);
  
  return (<>
    <title>${_name}</title>
    
    <div style={{ position: "relative", width: "100vw", height: "100dvh", overflow: "hidden", background: "transparent" }}>
      <div
        style={{
          position: "absolute", inset: 0,
          opacity,
          transition: `opacity ${FADE_MS}ms ease`,
          // pre-render keeps components mounted so their internal state/animations
          // aren't destroyed — only visibility changes
        }}
      >
        <ActivePage {...pageProps[current]} />
      </div>
      <p className="absolute bottom-0 right-0 z-50 text-indigo-200 text-[0.7rem]">Made by
        <a href="https://github.com/N0ctaneDev" target="_blank" style={{color: `color-mix(in srgb, ${_themeColor} 56%, #fff)`}}> N0ctaneDev</a> &
        <a href="https://github.com/GamesOfNamanInc" target="_blank" style={{color: `color-mix(in srgb, ${_themeColor} 56%, #fff)`}}> GamesOfNamanInc </a>
      </p>
    </div>
  </>);
}