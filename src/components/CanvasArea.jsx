// src/components/CanvasArea.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import CanvasPage from './CanvasPage';

const CanvasArea = () => {
  const selectedPageId = useSelector((state) => state.pages.selectedPageId);
  const pages = useSelector((state) => state.pages.pages);
  const selectedPage = pages.find((page) => page.id === selectedPageId);

  return (
    <div className="flex-1 bg-gray-200 p-4 flex justify-center items-center">
      {selectedPage ? <CanvasPage key={selectedPage.id} page={selectedPage} /> : null}
    </div>
  );
};

export default CanvasArea;
