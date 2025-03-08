import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes } from "./routes/index";
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Toaster richColors />
    <Routes />
  </StrictMode>,
)
