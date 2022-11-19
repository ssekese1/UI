import React from 'react';
import createRoot from 'react-dom';
import App from './App';
import './App.css';
 
createRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);