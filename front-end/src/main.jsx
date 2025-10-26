import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./i18n.js";
import { BrowserRouter as Router} from 'react-router-dom';
import { FilterProvider } from "./context/FilterContext";
import { GlobaleProvider } from  "./context/GlobaleContext";
import { UserProvider } from './context/UserContext.jsx';
import {ImmobilierProvider} from "./context/ImmobilierContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ImmobilierProvider>
  <UserProvider>
      <GlobaleProvider >
      <FilterProvider>
        <App />
      </FilterProvider>
      </GlobaleProvider >
      </UserProvider>
      </ImmobilierProvider>
      
    </Router>
  </StrictMode>,
)
