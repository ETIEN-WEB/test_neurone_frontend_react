import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//import './indexOLD.css'
import {ContextProvider} from "./contexts/ContextProvider";



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ContextProvider>
            <App />
    </ContextProvider>
  </StrictMode>,
)
