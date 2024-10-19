import React, { createContext, useContext, useState } from 'react';

// Create a context for object selection
const ObjectSelectionContext = createContext();

// Create a provider component
export const ObjectSelectionProvider = ({ children }) => {
  const [selectedObject, setSelectedObject] = useState(null); // Change to a single object

  return (
    <ObjectSelectionContext.Provider value={{ selectedObject, setSelectedObject }}>
      {children}
    </ObjectSelectionContext.Provider>
  );
};

// Custom hook to use the ObjectSelectionContext
export const useObjectSelectionContext = () => {
  return useContext(ObjectSelectionContext);
};
