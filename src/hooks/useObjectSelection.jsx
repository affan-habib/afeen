// useObjectSelection.js
import { useState, useEffect } from 'react';

const useObjectSelection = (canvas) => {
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (event) => {
      if (event.selected && event.selected.length > 0) {
        setSelectedObject(event.selected[0]);
      } else {
        setSelectedObject(null);
      }
    };

    const handleDeselection = () => {
      setSelectedObject(null);
    };

    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;
      const isInputField = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

      if (!isInputField && (event.key === 'Backspace' || event.key === 'Delete') && selectedObject) {
        canvas.remove(selectedObject);
        setSelectedObject(null);
      }
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleDeselection);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared', handleDeselection);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas, selectedObject]);

  return [selectedObject, setSelectedObject];
};

export default useObjectSelection;
