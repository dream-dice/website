import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import 'bulma/css/bulma.css'

import App from './app'

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />)
} else {
  const root = createRoot(rootElement)
  root.render(<App />);
}
