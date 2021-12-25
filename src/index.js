import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./helpers";
import history from "./history";

const config = getConfig();

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.href,
  scope: config.scope,
  onRedirectCallback,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);


