import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import AuthProvider ,{ SITE_NAME, ABBREVIATED_SITE_NAME } from './componentes/protected/AuthProvider.js';

// Agregar constantes al objeto window
window.SITE_NAME = SITE_NAME;
window.ABBREVIATED_SITE_NAME = ABBREVIATED_SITE_NAME;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
