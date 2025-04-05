import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './pages/Not-found';
import { SidebarProvider } from './context/SidebarContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CustomerPage from './pages/CustomerPage';
import ProductPage from './pages/ProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddProduct from './pages/product/AddNewProduct';
// import UpdateProduct from './pages/product/AddNewProduct';

function loadFontAwesome() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);
}

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    loadFontAwesome();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <CartProvider>
          <BrowserRouter>
            {/* Layout without Sidebar */}
            <div className="flex flex-col lg:flex-row">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </CartProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
