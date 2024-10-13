// useTextEditing.js
import { useState, useEffect } from 'react';
import { fabric } from 'fabric';

const useTextEditing = (canvas, selectedObject) => {
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
    }
  }, [selectedObject]);

  const handleObjectModified = () => {
    if (selectedObject && selectedObject instanceof fabric.Textbox) {
      updateSelectionStyles(selectedObject);
    }
  };

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

  const handleStyleChange = (styleName, value) => {
    if (selectedObject && selectedObject instanceof fabric.Textbox) {
      selectedObject.set(styleName, value);
      canvas.requestRenderAll();
      updateSelectionStyles(selectedObject);
    }
  };

  const handleAlignmentChange = (alignment) => {
    handleStyleChange('textAlign', alignment);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (selectedObject && selectedObject instanceof fabric.Textbox) {
      selectedObject.set('text', value);
      canvas.requestRenderAll();
      updateSelectionStyles(selectedObject);
    }
  };

  const handleLineHeightChange = (value) => {
    handleStyleChange('lineHeight', value);
  };

  const handleCharSpacingChange = (value) => {
    // Fabric.js uses charSpacing in units of 1/1000 em
    handleStyleChange('charSpacing', value * 1000);
  };

  const handleOpacityChange = (value) => {
    handleStyleChange('opacity', value);
  };

  const handleListTypeChange = (type) => {
    if (selectedObject && selectedObject instanceof fabric.Textbox) {
      let textLines = selectedObject.text.split('\n');

      if (type === 'ordered') {
        textLines = textLines.map((line, index) =>
          `${index + 1}. ${line.replace(/^\d+\.\s*/, '').replace(/^•\s*/, '')}`
        );
      } else if (type === 'unordered') {
        textLines = textLines.map(
          (line) => `• ${line.replace(/^\d+\.\s*/, '').replace(/^•\s*/, '')}`
        );
      } else {
        // Remove list formatting
        textLines = textLines.map((line) =>
          line.replace(/^\d+\.\s*/, '').replace(/^•\s*/, '')
        );
      }

      selectedObject.set({ text: textLines.join('\n'), listType: type });
      canvas.requestRenderAll();
      updateSelectionStyles(selectedObject);
    }
  };

  return {
    selectionStyles,
    handleStyleChange,
    handleAlignmentChange,
    handleTextChange,
    handleLineHeightChange,
    handleCharSpacingChange,
    handleOpacityChange,
    handleListTypeChange,
  };
};

export default useTextEditing;
