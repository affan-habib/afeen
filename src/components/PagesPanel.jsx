import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, addPage } from '../store/pagesSlice';

const PagesPanel = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.pages);
  const selectedPageId = useSelector((state) => state.pages.selectedPageId);

  const handleSelectPage = (id) => {
    dispatch(selectPage(id));
  };

  const handleAddPage = () => {
    dispatch(addPage());
  };

  return (
    <div className="fixed right-0 top-16 bottom-0 w-64 bg-gray-50 border-r border-gray-300 p-4">
      <h2 className="text-lg font-semibold mb-4">Pages</h2>
      <ul className="space-y-2">
        {pages.map((page) => (
          <li
            key={page.id}
            onClick={() => handleSelectPage(page.id)}
            className={`p-2 rounded cursor-pointer ${page.id === selectedPageId ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
              }`}
          >
            {page.name}
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddPage}
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Page
      </button>
    </div>
  );
};

export default PagesPanel;