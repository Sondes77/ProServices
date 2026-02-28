import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css'; // Tailwind importé ici
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { HelmetProvider } from "react-helmet-async";

//import './style.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </UserProvider>
  </React.StrictMode>
);
