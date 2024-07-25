import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        {children}
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onConfirm} 
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">
            Confirm
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
