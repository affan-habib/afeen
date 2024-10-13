// ToolProperties.js
import React from 'react';
import TextProperties from './TextProperties';
import ImageProperties from './ImageProperties';

const ToolProperties = ({
  activeTool,
  isTextSelected,
  isImageSelected,
  selectionStyles,
  handleStyleChange,
  handleAlignmentChange,
  handleTextChange,
  handleLineHeightChange,
  handleCharSpacingChange,
  handleOpacityChange,
  handleListTypeChange,
  imageStyles,
  handleImageStyleChange,
  addImageToCanvas,
}) => {

  console.log(activeTool, isImageSelected, isTextSelected, 'tool img text')
  return (
    <div className="p-4 overflow-y-auto text-sm" style={{ width: '300px' }}>
      {activeTool == "text" && (
        <TextProperties
          selectionStyles={selectionStyles}
          handleStyleChange={handleStyleChange}
          handleAlignmentChange={handleAlignmentChange}
          handleTextChange={handleTextChange}
          handleLineHeightChange={handleLineHeightChange}
          handleCharSpacingChange={handleCharSpacingChange}
          handleOpacityChange={handleOpacityChange}
          handleListTypeChange={handleListTypeChange}
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
