import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./i18n.js";
import { BrowserRouter as Router} from 'react-router-dom';
import { FilterProvider } from "./context/FilterContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <FilterProvider>
        <App />
      </FilterProvider>
    </Router>
  </StrictMode>,
)
