import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-vm2wqw78us6b0zvw.us.auth0.com"
    clientId="pMsblyJmWOzfXJ8OndraEdNW6hUgNg84"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
