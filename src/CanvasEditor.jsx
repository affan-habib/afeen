// CanvasEditor.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { fabric } from 'fabric';
import useFabricCanvas from './hooks/useFabricCanvas';
import useObjectSelection from './hooks/useObjectSelection';
import useTextEditing from './hooks/useTextEditing';
import useImageEditing from './hooks/useImageEditing';
import Tools from './components/Tools';
import ToolProperties from './components/ToolProperties';
import TopBar from './components/TopBar';
import Modal from './components/Modal';
import CodeDisplay from './components/CodeDisplay';
import PreviewDisplay from './components/PreviewDisplay';
import { useObjectSelectionContext } from './context/ObjectSelectionContext';
import { addTextToCanvas, addImageToCanvas, alignObjects, distributeObjects } from './utils/canvasUtils';
import AlignmentProperties from './components/AlignmentProperties';

const CanvasEditor = () => {
  const canvas = useFabricCanvas();
  useObjectSelection(canvas);
  const { selectedObject, setSelectedObject } = useObjectSelectionContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const activeTool = useSelector((state) => state.tool.activeTool);

  const {
    selectionStyles,
    updateTextStyle,
    handleTextChange,
  } = useTextEditing(canvas);

  const { imageStyles, handleImageStyleChange } = useImageEditing(canvas, selectedObject);

  const addText = () => {
    if (canvas) {
      addTextToCanvas(canvas, 'Edit me', {
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
      canvas.renderAll();
    }
  };

  const addImage = (url) => {
    if (canvas) {
      addImageToCanvas(canvas, url, imageStyles);
      canvas.renderAll();
    }
  };

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
  const handleAlignObjects = (alignment) => {
    if (canvas) {
      alignObjects(canvas, alignment);
    }
  };

  const handleDistributeObjects = (direction) => {
    if (canvas) {
      distributeObjects(canvas, direction);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <div className="w-full h-[80px] bg-gray-800 text-white flex items-center justify-center">
        <TopBar onShowCode={showCode} onPreview={showPreview} />
      </div>
      <AlignmentProperties alignObjects={handleAlignObjects}
        distributeObjects={handleDistributeObjects} />
      <div className="flex flex-1 min-h-0">
        <div className="w-100 h-full overflow-y-auto">
          <div className='flex'>
            <Tools addText={addText} />
            {activeTool && (
              <ToolProperties
                selectionStyles={selectionStyles}
                updateTextStyle={updateTextStyle}
                handleTextChange={handleTextChange}
                imageStyles={imageStyles}
                handleImageStyleChange={handleImageStyleChange}
                addImageToCanvas={addImage}
              />
            )}
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
