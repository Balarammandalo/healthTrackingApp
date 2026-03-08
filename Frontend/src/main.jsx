
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { SignupProvider } from './Context/SignupProvider.jsx'
createRoot(document.getElementById('root')).render(
  <SignupProvider>
      <App />
  </SignupProvider>,
)
