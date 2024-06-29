import React, { useEffect } from 'react';
import '../services/Alert.css';

function Alert({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <div className="alert">
      {message}
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  );
}

export default Alert;

