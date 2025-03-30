import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Cart items
  const [isLoading, setIsLoading] = useState(false);

  // Add item to cart
  const addToCart = (item) => {
    setIsLoading(true);

    setTimeout(() => { // Simulate delay
      setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          // Update the quantity if the item is already in the cart
          return prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }

        // Add new item to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      });
      setIsLoading(false);
    }, 500);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Increment quantity
  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity
  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = cart.reduce((total, item) => total + (item.discount || 0), 0);
  const tax = subtotal * 0.1; // Assume 10% tax
  const total = subtotal - discount + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        subtotal,
        discount,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
