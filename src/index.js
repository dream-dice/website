import React from 'react';

import { hydrate, render } from "react-dom";
import './index.css';
import 'bulma/css/bulma.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './app'

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

serviceWorkerRegistration.unregister();