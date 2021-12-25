import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./helpers";

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.href,
  scope: config.scope,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);


