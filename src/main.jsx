import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import { CartProvider } from './context/CartContext.jsx';
import Checkout from './pages/CheckOut.jsx';
import AllProducts from './pages/AllProducts.jsx';
import TransferPayment from './pages/TransferPayment.jsx';
import Bedroom from './pages/Bedroom.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import MobileProductDetails from './pages/MobileProductDetails.jsx';
import SearchResults from './pages/SearchResults.jsx';
import { ProductsProvider } from './context/ProductContext.jsx';
import Profile from './pages/Profile.jsx';
import Thanks from './pages/Thanks.jsx';
import Orders from './components/Orders.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { UserProvider } from './context/UserContext.jsx';
import AdminRoute from './components/AdminRoute'; // Import AdminRoute
import ProtectedRoutes from './pages/ProtectedRoutes.jsx';
import AuthProvider from './context/AuthContext.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import SearchPage from './pages/SearchPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'bedroom', element: <Bedroom /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'all-products', element: <AllProducts /> },
      { path: 'transfer-payment', element: <TransferPayment /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'mobile-product/:id', element: <MobileProductDetails /> },
      { path: 'search-results', element: <SearchResults /> },
      { path: 'profile', element: <Profile /> },
      { path: 'thank-you', element: <Thanks /> },
     
      { 
        path: 'orders', 
        element: (
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'admin/create-product', 
        element: (
          <AdminRoute>
            <CreateProduct />
          </AdminRoute>
        ),
      },
      { 
        path: 'admin', 
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: 'signup', element: <SignUp /> },
  { path: 'login', element: <Login /> },
  { path: 'search', element: <SearchPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <ToastContainer />
            <RouterProvider router={router} />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </AuthProvider>

    
  </React.StrictMode>
);
