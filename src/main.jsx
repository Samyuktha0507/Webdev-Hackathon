import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx'; // Import ProductProvider
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DeliveryPartnerPage from './pages/DeliveryPartnerPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login/:role', element: <LoginPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/delivery-partner', element: <DeliveryPartnerPage /> },
  {
    element: <App />,
    children: [
      { path: '/products', element: <ProductsPage /> },
      { path: '/cart', element: <CartPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider> {/* Wrap with ProductProvider */}
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
