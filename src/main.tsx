import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './lib/context/CartContext';
import { AuthProvider } from './lib/context/AuthContext';
import { ToastProvider } from './lib/context/ToastContext';
import { BusinessProvider } from './lib/context/BusinessContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <BusinessProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </BusinessProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);