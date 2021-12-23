import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-rlndq9pe.us.auth0.com"
    clientId="cgvRs9b5Dnql5uaEn0GDHuUANMNKytSH"
    redirectUri={window.location.href}
    audience="http://localhost:3001"
    scope="create:order"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
