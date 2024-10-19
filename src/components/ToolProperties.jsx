// ToolProperties.js
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import TextProperties from './TextProperties';
import ImageProperties from './ImageProperties';
import { useObjectSelectionContext } from '../context/ObjectSelectionContext';

const ToolProperties = ({
  selectionStyles,
  handleTextChange,
  updateTextStyle,
  imageStyles,
  handleImageStyleChange,
  addImageToCanvas,
}) => {
  const { selectedObject } = useObjectSelectionContext(); // Use context to access selectedObject
  const activeTool = useSelector((state) => state.tool.activeTool); // Access activeTool from Redux store

  const isTextSelected = selectedObject instanceof fabric.Textbox;
  const isImageSelected = selectedObject instanceof fabric.Image;

  return (
    <div className="p-4 overflow-y-auto text-sm" style={{ width: '300px' }}>
      {isTextSelected && (
        <TextProperties
          selectionStyles={selectionStyles}
          updateTextStyle={updateTextStyle}
          handleTextChange={handleTextChange}
        />
      )}
      {activeTool === 'image' && (
        <ImageProperties
          isImageSelected={isImageSelected}
          imageStyles={imageStyles}
          addImageToCanvas={addImageToCanvas}
          handleImageStyleChange={handleImageStyleChange}
        />
      )}
    </div>
  );
};

export default ToolProperties;
