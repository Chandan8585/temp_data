import { createContext, useContext, useState, useEffect } from 'react';
import { fetchDataUsingBearerToken, postData, deleteData } from '../lib/api';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0); 
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart from API on initial load
  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    const getCartFromApi = async () => {
    
      if (!storedToken) {
          console.log("No token found. Redirecting to login...");
          navigate("/Login");
          return;
        }
      try {
        // Try to get cart data from your API
        const cartData = await fetchDataUsingBearerToken('/cart' , storedToken);
        console.log("cartData",cartData);
        if (cartData) {
          setCart(cartData);
        }
      } catch (error) {
        console.log(error);
        console.log('Using local cart storage instead of API', error);
        // If the API fails, we'll just use the local state
      }
    };

    getCartFromApi();
  }, []);
    
  // Calculate totals whenever cart changes
  useEffect(() => {
    const calculateTotals = () => {
      const subtotalValue = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
      const roundedSubtotal = Math.round(subtotalValue * 100) / 100;
      
      setSubtotal(roundedSubtotal);
      
      const taxValue = roundedSubtotal * 0.1; // 10% tax
      const roundedTax = Math.round(taxValue * 100) / 100;
      setTax(roundedTax);
      
      const totalValue = roundedSubtotal - discount + roundedTax;
      const roundedTotal = Math.round(totalValue * 100) / 100;
      setTotal(roundedTotal);
    };
    
    calculateTotals();
  }, [cart, discount]);

  // Add product to cart
  const addToCart = async (product) => {
    console.log("🛒 Attempting to add product to cart:", product);
    setIsLoading(true);
  
    if (!storedToken) {
      console.log("❌ No token found. Redirecting to login...");
      navigate("/Login");
      return;
    }
  
    try {
      console.log("🔐 Token found. Making API call to add to cart..." , product._id);
  
      const response = await axios.post(
        'http://localhost:5001/cart/add',
        {
          productId: product._id,
          quantity: product.quantity || 1
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log("✅ API Response from /cart/add:", response);
  
      if (response.data?.message) {
        console.log("🎉 Success Message:", response.data.message);
      }
  
      // Update local cart state
      setCart(prevCart => {
        const existing = prevCart.find(item => item.product._id === product._id);
        if (existing) {
          return prevCart.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { product, quantity: 1 }];
        }
      });
  
    } catch (error) {
      console.error("❌ Error adding to cart:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Remove product from cart
  const removeFromCart = async (productId) => {
    setIsLoading(true);
    try {
      // Try API first
      await deleteData(`/cart/product/${productId}`);
      // Then update local state
      setCart(prevCart => prevCart.filter(product => product.id !== productId));
    } catch (error) {
      console.log('API cart delete failed, using local state only');
      // Fallback to local state if API fails
      setCart(prevCart => prevCart.filter(product => product.id !== productId));
    } finally {
      setIsLoading(false);
    }
  };

  // Increase product quantity
  const increaseQuantity = async (productId) => {
    setIsLoading(true);
    try {
      // Try API first
      await postData(`/cart/product/${productId}/increase`, {});
      // Then update local state
      setCart(prevCart => 
        prevCart.map(product => 
          product.id === productId 
            ? { ...product, quantity: product.quantity + 1 } 
            : product
        )
      );
    } catch (error) {
      console.log('API cart update failed, using local state only');
      // Fallback to local state if API fails
      setCart(prevCart => 
        prevCart.map(product => 
          product.id === productId 
            ? { ...product, quantity: product.quantity + 1 } 
            : product
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Decrease product quantity
  const decreaseQuantity = async (productId) => {
    setIsLoading(true);
    try {
      // Try API first
      await postData(`/cart/product/${productId}/decrease`, {});
      // Then update local state
      setCart(prevCart => {
        const product = prevCart.find(product => product.id === productId);
        
        if (product.quantity === 1) {
          // Remove product if quantity would be 0
          return prevCart.filter(product => product.id !== productId);
        } else {
          // Decrease quantity
          return prevCart.map(product => 
            product.id === productId 
              ? { ...product, quantity: product.quantity - 1 } 
              : product
          );
        }
      });
    } catch (error) {
      console.log('API cart update failed, using local state only');
      // Fallback to local state if API fails
      setCart(prevCart => {
        const product = prevCart.find(product => product.id === productId);
        
        if (product.quantity === 1) {
          return prevCart.filter(product => product.id !== productId);
        } else {
          return prevCart.map(product => 
            product.id === productId 
              ? { ...product, quantity: product.quantity - 1 } 
              : product
          );
        }
      });
    } finally {
      setIsLoading(false);
    }
  };
  console.log("cartfinally",cart);
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      increaseQuantity, 
      decreaseQuantity,
      subtotal,
      discount,
      tax,
      total,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};
