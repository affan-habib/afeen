import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { triggerAddRectangle, addPage } from '../store/pagesSlice';
import Button from './ui/Button';

const TopBar = () => {
  const dispatch = useDispatch();
  const selectedPageId = useSelector((state) => state.pages.selectedPageId);

  const handleAddPage = () => {
    dispatch(addPage());
  };

  const handleAddRectangle = () => {
    dispatch(triggerAddRectangle(selectedPageId));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10  p-4 bg-gray-100 border-b border-gray-300">
      <div className='flex gap-2'>
        <Button
          label='Add Rectangle'
          onClick={handleAddRectangle}
          className="px-3 py-1 bg-red-500 text-white border rounded hover:bg-red-600"
        >
          Add Rectangle
        </Button>
        <button
          onClick={handleAddPage}
          className=" px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Add Page
        </button>
      </div>
    </div>
  );
};

export default TopBar;