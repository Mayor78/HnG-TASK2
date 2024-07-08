import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './components/Layout.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './pages/CartPage.jsx';
import { CartProvider } from './context/CartContext.jsx'; // Import CartProvider

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* Wrap the RouterProvider with CartProvider */}
      <ToastContainer />
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
