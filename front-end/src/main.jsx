import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./i18n.js";
import { BrowserRouter as Router } from 'react-router-dom';
import { FilterProvider } from "./context/FilterContext";
import { GlobaleProvider } from "./context/GlobaleContext";
import { UserProvider } from './context/UserContext.jsx';
import { ImmobilierProvider } from "./context/ImmobilierContext";
import { DemandesProvider } from './context/DemandeContext';
import { CompanyProvider } from './context/ComapanieContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CompanyProvider>
        <DemandesProvider  >
        <ImmobilierProvider>
          <UserProvider>
            <GlobaleProvider >
              <FilterProvider>
                <App />
              </FilterProvider>
            </GlobaleProvider >
          </UserProvider>
        </ImmobilierProvider>
      </DemandesProvider>
      </CompanyProvider>

    </Router>
  </StrictMode>,
)
