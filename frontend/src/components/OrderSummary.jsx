import React from 'react';
import { useCart } from '../context/CartContext2';

const OrderSummary = () => {
  const { cart, subtotal, discount, tax, total } = useCart();
  
  return (
    <div className="mt-8">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">Item</span>
        <span className="font-medium">{cart.length} (Items)</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">Discount</span>
        <span className="font-medium text-status-error">-${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">Tax(10%)</span>
        <span className="font-medium">${tax.toFixed(2)}</span>
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-between">
        <span className="font-medium">Total</span>
        <span className="font-semibold text-lg">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
