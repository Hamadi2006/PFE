import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./i18n.js";
import { BrowserRouter as Router} from 'react-router-dom';
import { FilterProvider } from "./context/FilterContext";
import { GlobaleProvider } from  "./context/GlobaleContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <GlobaleProvider >
      <FilterProvider>
        <App />
      </FilterProvider>
      </GlobaleProvider >
    </Router>
  </StrictMode>,
)
