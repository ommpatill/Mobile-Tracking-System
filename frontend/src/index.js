import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import './index.css'; // Corrected CSS import (relative path)
import App from './App'; // Import your App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
