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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'bedroom', element: <Bedroom /> },
      { path: 'login', element: <Login /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'all-products', element: <AllProducts /> },
      { path: 'transfer-payment', element: <TransferPayment /> },
      { path: 'product/:id', element: <ProductDetails /> },
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
        path: 'admin', 
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>
);
