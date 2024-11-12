import React from 'react';
import { FiX } from "react-icons/fi";

const ModalVideo = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute text-3xl top-4 right-4 border-none text-gray-500 hover:text-gray-700"
        >
          <FiX />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalVideo;
