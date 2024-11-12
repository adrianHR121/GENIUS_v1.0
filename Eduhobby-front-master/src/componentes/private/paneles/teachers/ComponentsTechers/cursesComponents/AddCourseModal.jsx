// src/components/AddCourseModal.js
import React from 'react';
import { CircleX } from 'lucide-react';




const AddCourseModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--fondo-color)] rounded-lg shadow-lg p-6 w-full max-w-xl">
        <div className="w-full flex justify-end items-center mb-4">
          <button onClick={onClose} className="border border-none text-white "><CircleX className='w-10 h-10' /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AddCourseModal;
