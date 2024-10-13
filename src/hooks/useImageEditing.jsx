// useImageEditing.js
import { useState } from 'react';
import { fabric } from 'fabric';

const useImageEditing = (canvas, selectedObject) => {
  const [imageStyles, setImageStyles] = useState({
    borderColor: '#000000',
    borderWidth: 0,
    borderRadius: 0,
    width: 0,
    height: 0,
  });

  const updateImageStyles = (image) => {
    setImageStyles({
      borderColor: image.stroke || '#000000',
      borderWidth: image.strokeWidth || 0,
      borderRadius: image.clipPath?.rx || 0,
      width: image.getScaledWidth().toFixed(2),
      height: image.getScaledHeight().toFixed(2),
    });
  };

  const handleImageStyleChange = (styleName, value) => {
    if (selectedObject && selectedObject instanceof fabric.Image) {
      const img = selectedObject;

      if (styleName === 'width' || styleName === 'height') {
        const aspectRatio = img.width / img.height;
        let newWidth = img.getScaledWidth();
        let newHeight = img.getScaledHeight();

        if (styleName === 'width') {
          newWidth = value;
          newHeight = value / aspectRatio;
        } else {
          newHeight = value;
          newWidth = value * aspectRatio;
        }

        img.scaleToWidth(newWidth);
        img.scaleToHeight(newHeight);

        // Update clipPath to match new dimensions
        if (img.clipPath) {
          img.clipPath.set({
            scaleX: 1 / img.scaleX,
            scaleY: 1 / img.scaleY,
          });
        }
      } else if (styleName === 'borderRadius') {
        if (img.clipPath) {
          img.clipPath.set({
            rx: value,
            ry: value,
          });
        } else {
          const clipRect = new fabric.Rect({
            left: 0,
            top: 0,
            originX: 'center',
            originY: 'center',
            width: img.width,
            height: img.height,
            rx: value,
            ry: value,
            scaleX: 1 / img.scaleX,
            scaleY: 1 / img.scaleY,
          });
          img.set({ clipPath: clipRect });
        }
      } else if (styleName === 'borderWidth') {
        img.set({
          strokeWidth: value,
        });
      } else if (styleName === 'borderColor') {
        img.set({
          stroke: value,
        });
      }

      canvas.renderAll();
      updateImageStyles(img);
    }
  };

  return {
    imageStyles,
    handleImageStyleChange,
    updateImageStyles,
  };
};

export default useImageEditing;
