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
import Checkout from './pages/CheckOut.jsx';
import AllProducts from './pages/AllProducts.jsx';
import TransferPayment from './pages/TransferPayment.jsx';
import Bedroom from './pages/Bedroom.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <SignUp /> },
       {path: 'bedroom', element: <Bedroom/>},
      { path: 'login', element: <Login /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <Checkout /> }, 
      { path: 'all-product', element: <AllProducts /> },
      { path: 'transfer-payment', element: <TransferPayment /> }, 
      

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
