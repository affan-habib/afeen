import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, content, title = 'Modal Title' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg h-auto max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">
            <FaTimes />
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
