import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Dashboard from "@/pages/Dashboard";


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
          <Dashboard />
  </StrictMode>,
)
