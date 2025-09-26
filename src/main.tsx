import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Cursor-follow glow: update CSS variables on mouse move
window.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
