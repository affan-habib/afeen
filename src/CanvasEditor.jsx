// CanvasEditor.js
import React, { useState, useEffect } from 'react';
import useFabricCanvas from './hooks/useFabricCanvas';
import useObjectSelection from './hooks/useObjectSelection';
import useTextEditing from './hooks/useTextEditing';
import useImageEditing from './hooks/useImageEditing';
import Tools from './components/Tools';
import ToolProperties from './components/ToolProperties';
import { fabric } from 'fabric';
import TopBar from './components/TopBar';
import Modal from './components/Modal';
import CodeDisplay from './components/CodeDisplay';
import PreviewDisplay from './components/PreviewDisplay';

const CanvasEditor = () => {
  const canvas = useFabricCanvas();
  const [selectedObject, setSelectedObject] = useObjectSelection(canvas);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const {
    selectionStyles,
    handleStyleChange,
    handleAlignmentChange,
    handleTextChange,
    handleLineHeightChange,
    handleCharSpacingChange,
    handleOpacityChange,
    handleListTypeChange,
  } = useTextEditing(canvas, selectedObject);

  const { imageStyles, handleImageStyleChange } = useImageEditing(canvas, selectedObject);
  const [activeTool, setActiveTool] = React.useState(null); // No tool selected by default

  const addText = () => {
    if (canvas) {
      const textbox = new fabric.Textbox('Edit me', {
        left: 100,
        top: 100,
        width: 200,
        originX: 'left',
        originY: 'top',
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#000000',
        fontWeight: 'normal',
        fontStyle: 'normal',
        underline: false,
        textAlign: 'left',
        lineHeight: 1.16,
        charSpacing: 0,
        opacity: 1,
      });
      canvas.add(textbox);
      canvas.setActiveObject(textbox);
      setSelectedObject(textbox); // Manually update selectedObject
      customizeTextControls(textbox);
      canvas.renderAll();
    }
  };
  const addImageToCanvas = (url) => {
    if (canvas) {
      fabric.Image.fromURL(
        url,
        (img) => {
          // Calculate scaling to fit within the canvas if necessary
          const maxWidth = canvas.width * 0.8; // 80% of canvas width
          const maxHeight = canvas.height * 0.8; // 80% of canvas height
          let scale = 1;

          if (img.width > maxWidth || img.height > maxHeight) {
            const scaleX = maxWidth / img.width;
            const scaleY = maxHeight / img.height;
            scale = Math.min(scaleX, scaleY);
          }

          img.set({
            left: canvas.width / 2,
            top: canvas.height / 2,
            originX: 'center',
            originY: 'center',
            scaleX: scale,
            scaleY: scale,
            selectable: true,
            stroke: imageStyles.borderColor,
            strokeWidth: imageStyles.borderWidth,
          });

          // Create the clipPath
          const clipRect = new fabric.Rect({
            left: 0,
            top: 0,
            originX: 'center',
            originY: 'center',
            width: img.width,
            height: img.height,
            rx: imageStyles.borderRadius,
            ry: imageStyles.borderRadius,
            // Inverse scaling
            scaleX: 1 / img.scaleX,
            scaleY: 1 / img.scaleY,
          });

          img.set({ clipPath: clipRect });

          canvas.add(img);
          canvas.setActiveObject(img);
          setSelectedObject(img); // Manually update selectedObject
          canvas.renderAll();
        },
        { crossOrigin: 'anonymous' }
      );
    }
  };

  const customizeTextControls = (textbox) => {
    // Only adjust the width when resizing from the sides
    textbox.setControlsVisibility({
      mt: false,
      mb: false,
      ml: true,
      mr: true,
      tl: true,
      tr: true,
      bl: true,
      br: true,
      mtr: true,
    });

    // Override the action handler for the side controls
    textbox.controls.ml.actionHandler = resizeTextboxWidth;
    textbox.controls.mr.actionHandler = resizeTextboxWidth;
  };

  const resizeTextboxWidth = fabric.controlsUtils.changeWidth;

  const isTextSelected = selectedObject instanceof fabric.Textbox;
  const isImageSelected = selectedObject instanceof fabric.Image;

  const showCode = () => {
    // Get the canvas JSON representation
    const canvasData = canvas.toJSON();
    const code = JSON.stringify(canvasData, null, 2); // Format the JSON for better readability
    setModalContent(<CodeDisplay code={code} />);
    setModalOpen(true);
  };

  const showPreview = () => {
    const canvasData = canvas.toJSON();
    setModalContent(<PreviewDisplay canvasData={canvasData} />);
    setModalOpen(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <div className="w-full h-[80px] bg-gray-800 text-white flex items-center justify-center">
        <TopBar onShowCode={showCode} onPreview={showPreview} />
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="w-100 h-full overflow-y-auto">
          <div className='flex'>
            <Tools
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              addText={addText}
            />
            {activeTool &&
              <ToolProperties
                activeTool={activeTool}
                isTextSelected={isTextSelected}
                isImageSelected={isImageSelected}
                selectionStyles={selectionStyles}
                handleStyleChange={handleStyleChange}
                handleAlignmentChange={handleAlignmentChange}
                handleTextChange={handleTextChange}
                imageStyles={imageStyles}
                handleImageStyleChange={handleImageStyleChange}
                addImageToCanvas={addImageToCanvas}
                handleLineHeightChange={handleLineHeightChange}
                handleCharSpacingChange={handleCharSpacingChange}
                handleOpacityChange={handleOpacityChange}
                handleListTypeChange={handleListTypeChange}
              />}
          </div>
        </div>
        {/* Sidebar and Canvas area */}
        <div className="flex-1 h-full overflow-y-auto p-20 bg-gray-100 flex justify-center items-center">
          <div className="mt-[450px] bg-white shadow-md flex items-center justify-center">
            <canvas id='canvas'></canvas>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} content={modalContent} />
    </div>
  );
};

export default CanvasEditor;
