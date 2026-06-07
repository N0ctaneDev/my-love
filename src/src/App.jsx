import { useState } from "react";
import Home from "./pages/Home";
import Memories from "./pages/Memories";
import Confess from "./pages/Confess";

function Page() {
  const [page, setPage] = useState("home"); // "home" | "memories" | "confess" | "yes"
  
  const navigate = (route) => {
    const map = {
      "/memories": "memories",
      "/confess":  "confess",
      "/yes":      "yes",
    };
    setPage(map[route] ?? route.replace("/", "") ?? "home");
  };
  
  if (page === "home")      return <Home     onNext={() => setPage("memories")} />;
  if (page === "memories")  return <Memories onNext={() => setPage("confess")} />;
  if (page === "confess")   return <Confess  navigate={navigate} />;
  if (page === "yes")       return (
    <div className="min-h-screen bg-[#0d0a0e] flex flex-col items-center justify-center text-center px-6 gap-6">
      <h1 className="text-6xl text-[#f2dde6]" style={{ fontFamily: "Georgia, serif" }}>
        I knew it 🌹
      </h1>
      <p className="text-[#c49aae] text-lg" style={{ fontFamily: "Georgia, serif" }}>
        This is the happiest I've ever been.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0d0a0e]">
      <Page />
    </div>
  );
}