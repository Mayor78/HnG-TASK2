import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const TransferPayment = () => {
  const location = useLocation();
  const { totalAmount } = location.state || { totalAmount: 0 };
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTransferClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 60000); // 1 minute
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4 flex justify-center place-items-center">Pay With Bank Transfer</h1>
      </div>
      
      <div className="container mx-auto flex justify-center place-items-center p-4">
        <div className="bg-primary p-6 rounded shadow">
          <div className="mb-4">
            <h1 className="font-semibold text-lg">Bank Name:</h1>
            <h3>Opay/Paycom</h3>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-lg">Account Number:</h1>
            <h3>7084718050</h3>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-lg">Account Holder Name:</h1>
            <h3>Mayor Abraham</h3>
          </div>
          <p className="text-red-500 mb-4">Please transfer the exact amount to avoid failure.</p>
          <div className="mb-4">
            <h1 className="font-semibold text-lg">Transfer Amount:</h1>
            <h3 className='font-semibold'>${totalAmount.toFixed(2)}</h3>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={handleTransferClick} 
              className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading || success}
            >
              {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : success ? "Successful" : "Transfer"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferPayment;
