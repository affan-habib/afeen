// TopBar.js
import React from 'react';
import { FaCode, FaEye } from 'react-icons/fa';

const TopBar = ({ onShowCode, onPreview }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between h-20 bg-gray-800 text-white px-4">
      <div className="text-xl font-bold">No Code Builder</div>
      <div>
        <button
          className="mr-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          onClick={onShowCode}
        >
          <FaCode size={20} />
        </button>
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
          onClick={onPreview}
        >
          <FaEye size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
