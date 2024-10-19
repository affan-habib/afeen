// useTextEditing.js
import { useState, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import { useObjectSelectionContext } from '../context/ObjectSelectionContext';

const useTextEditing = (canvas) => {
  const { selectedObject } = useObjectSelectionContext();
  const [selectionStyles, setSelectionStyles] = useState({
    text: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: false,
    fill: '#000000',
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'left',
    lineHeight: 1.16,
    charSpacing: 0,
    opacity: 1,
    listType: 'none',
  });

  useEffect(() => {
    if (selectedObject && selectedObject instanceof fabric.Textbox) {
      updateSelectionStyles(selectedObject);

      // Attach event listeners
      selectedObject.on('modified', handleObjectModified);
      selectedObject.on('changed', handleObjectModified);
      selectedObject.on('editing:entered', handleObjectModified);
      selectedObject.on('editing:exited', handleObjectModified);

      // Cleanup function to remove the event listeners
      return () => {
        selectedObject.off('modified', handleObjectModified);
        selectedObject.off('changed', handleObjectModified);
        selectedObject.off('editing:entered', handleObjectModified);
        selectedObject.off('editing:exited', handleObjectModified);
      };
    } else {
      // Reset selection styles when no text object is selected
      resetSelectionStyles();
    }
  }, [selectedObject]);

  const handleObjectModified = useCallback(() => {
    if (selectedObject && selectedObject instanceof fabric.Textbox) {
      updateSelectionStyles(selectedObject);
    }
  }, [selectedObject]);

  const updateSelectionStyles = (text) => {
    setSelectionStyles({
      text: text.text || '',
      fontWeight: text.fontWeight || 'normal',
      fontStyle: text.fontStyle || 'normal',
      underline: !!text.underline,
      fill: text.fill || '#000000',
      fontSize: text.fontSize || 20,
      fontFamily: text.fontFamily || 'Arial',
      textAlign: text.textAlign || 'left',
      lineHeight: text.lineHeight || 1.16,
      charSpacing: (text.charSpacing || 0) / 1000, // Convert from 1/1000 em
      opacity: text.opacity !== undefined ? text.opacity : 1,
      listType: text.listType || 'none',
    });
  };

  const resetSelectionStyles = () => {
    setSelectionStyles({
      text: '',
      fontWeight: 'normal',
      fontStyle: 'normal',
      underline: false,
      fill: '#000000',
      fontSize: 20,
      fontFamily: 'Arial',
      textAlign: 'left',
      lineHeight: 1.16,
      charSpacing: 0,
      opacity: 1,
      listType: 'none',
    });
  };

  const updateTextStyle = (styleName, value) => {
    if (!selectedObject || !(selectedObject instanceof fabric.Textbox)) return;

    let updatedValue = value;

    // Handle special cases
    switch (styleName) {
      case 'charSpacing':
        updatedValue = value * 1000; // Convert to 1/1000 em
        break;
      case 'opacity':
        updatedValue = value; // Expecting a value between 0 and 1
        break;
      case 'listType':
        applyListType(value);
        return; // listType is handled separately
      default:
        break;
    }

    selectedObject.set(styleName, updatedValue);
    selectedObject.setCoords(); // Update object coordinates
    canvas.requestRenderAll();
    updateSelectionStyles(selectedObject);
  };

  const applyListType = (type) => {
    if (!selectedObject || !(selectedObject instanceof fabric.Textbox)) return;

    let textLines = selectedObject.text.split('\n');

    if (type === 'ordered') {
      textLines = textLines.map((line, index) =>
        `${index + 1}. ${removeListMarkers(line)}`
      );
    } else if (type === 'unordered') {
      textLines = textLines.map((line) => `• ${removeListMarkers(line)}`);
    } else {
      // Remove list formatting
      textLines = textLines.map((line) => removeListMarkers(line));
    }

    selectedObject.set({ text: textLines.join('\n'), listType: type });
    selectedObject.setCoords();
    canvas.requestRenderAll();
    updateSelectionStyles(selectedObject);
  };

  const removeListMarkers = (line) => {
    return line.replace(/^\d+\.\s*/, '').replace(/^•\s*/, '');
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (selectedObject && selectedObject instanceof fabric.Textbox) {
      selectedObject.set('text', value);
      canvas.requestRenderAll();
      updateSelectionStyles(selectedObject);
    }
  };

  return {
    selectionStyles,
    updateTextStyle,
    handleTextChange,
  };
};

export default useTextEditing;
