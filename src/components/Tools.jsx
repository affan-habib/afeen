// Tools.js
import React from 'react';
import { FaPencilAlt, FaImage } from 'react-icons/fa';

const Tools = ({ activeTool, setActiveTool, addText }) => {
  const handleTextToolClick = () => {
    setActiveTool('text');
    addText();
  };

  const handleImageToolClick = () => {
    setActiveTool('image');
  };

  return (
    <div className="flex flex-col w-[80px] p-2 border h-[calc(100vh-80px)]">
      <button
        className={`p-2 bg-white rounded mb-2 hover:bg-gray-300 flex items-center justify-center`}
        onClick={handleTextToolClick}
        title="Add Text"
      >
        <FaPencilAlt size={32} color={activeTool === 'text' ? 'black' : '#6B7280'} />
      </button>
      <button
        className={`p-2 bg-white rounded mb-2 hover:bg-gray-300 flex items-center justify-center`}
        onClick={handleImageToolClick}
        title="Add Image"
      >
        <FaImage size={32} color={activeTool === 'image' ? 'black' : '#6B7280'} />
      </button>
    </div>
  );
};

export default Tools;
