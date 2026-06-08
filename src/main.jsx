import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EmojiBackground from "./EmojiBackground";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* Layer 0 — emoji canvas */}
      <EmojiBackground />
      <App />
  </StrictMode>,
)
