import React, { useState } from 'react';

const paymentMethods = [
  { id: 'cash', name: 'Cash', icon: 'fa-money-bill-wave' },
  { id: 'debit', name: 'Debit', icon: 'fa-credit-card' },
  { id: 'qrs', name: 'QRS', icon: 'fa-qrcode' }
];

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('cash');
  
  const handleProcessTransaction = () => {
    alert('Transaction processed successfully!');
  };
  
  return (
    <>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map(method => (
            <div 
              key={method.id}
              className={`${
                selectedMethod === method.id ? 'bg-gray-200' : 'bg-gray-100'
              } rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <i className={`fas ${method.icon} text-gray-600 mb-1`}></i>
              <span className="text-xs font-medium">{method.name}</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="w-full bg-primary hover:bg-purple-700 text-white font-medium py-3 rounded-lg mt-6 transition duration-200"
        onClick={handleProcessTransaction}
      >
        Process transaction
      </button>
    </>
  );
};

export default PaymentMethods;
