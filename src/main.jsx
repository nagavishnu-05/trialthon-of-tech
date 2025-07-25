import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { disableDevTools } from './disableDevTools';
import App from './App.jsx'

disableDevTools();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
