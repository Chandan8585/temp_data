import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, isLoading } = useCart();
  
  return (
    <div className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-16 h-16 rounded-lg object-cover mr-3"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.category}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <button 
              className={`w-5 h-5 bg-white rounded border border-gray-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => decreaseQuantity(item.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse w-2 h-2 bg-gray-300 rounded-full"></span>
              ) : (
                <i className="fas fa-minus text-xs text-gray-500"></i>
              )}
            </button>
            <span className="text-xs font-medium mx-1">{item.quantity}</span>
            <button 
              className={`w-5 h-5 bg-white rounded border border-gray-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => increaseQuantity(item.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse w-2 h-2 bg-gray-300 rounded-full"></span>
              ) : (
                <i className="fas fa-plus text-xs text-gray-500"></i>
              )}
            </button>
          </div>
          <span className="text-sm font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
