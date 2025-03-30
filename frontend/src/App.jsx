import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/sonner';
import NotFound from './pages/Not-found';
import { SidebarProvider } from './context/SidebarContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Home from './pages/Home';

function loadFontAwesome() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);
}

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/signup' element={<Signup/> } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// function Home() {
//   return <div>Welcome to the Home Page!</div>;
// }

function App() {
  useEffect(() => {
    loadFontAwesome();
  }, []);

  return (
    <SidebarProvider>
      <CartProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster />
      </CartProvider>
    </SidebarProvider>
  );
}

export default App;
