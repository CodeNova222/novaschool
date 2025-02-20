import React, { createContext, useContext, useState } from 'react';
import './../assets/styles/toast.css';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [show, setShow] = useState(false);
  const [toastType, setToastType] = useState(''); // Added state for type

  const showToast = (message, type = 'success') => {
    if (show) {
      setToastMessage(message);
      setToastType(type);
    } else {
      setToastMessage(message);
      setToastType(type);
      setShow(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {show && (
        <div className="toast-container">
          <div className={`toast ${toastType}`}>
            {toastMessage}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
