// Tools.js
import React from 'react';
import { FaPencilAlt, FaImage } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTool } from '../store/toolSlice';

const Tools = ({ addText }) => {
  const dispatch = useDispatch();
  const activeTool = useSelector((state) => state.tool.activeTool);

  const handleTextToolClick = () => {
    dispatch(setActiveTool('text'));
    addText();
  };

  const handleImageToolClick = () => {
    dispatch(setActiveTool('image'));
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
