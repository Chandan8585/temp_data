import React from 'react';
import { useCart } from '../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart, isLoading } = useCart();
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
      {item.discount && (
        <div className="absolute top-2 left-2 bg-status-error text-white text-xs font-bold py-1 px-2 rounded">
          {item.discount}
        </div>
      )}
      <div className="h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold mb-1">{item.name}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{item.available} Available</span>
          <span>{item.sold} Sold</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-primary font-medium">${item.price.toFixed(2)}</span>
            {item.originalPrice && (
              <span className="text-gray-400 line-through text-xs ml-1">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className={`bg-gray-100 rounded-md p-1 hover:bg-gray-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => addToCart(item)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4">
                  <svg className="animate-spin w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <i className="fas fa-shopping-cart text-gray-500"></i>
              )}
            </button>
            {item._id === 1 && (
              <button 
                className={`bg-primary text-white text-xs rounded-md py-1 px-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => addToCart(item)}
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add to cart'}
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
