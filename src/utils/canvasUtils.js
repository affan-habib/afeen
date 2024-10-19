import { fabric } from 'fabric';

const generateUniqueId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const addTextToCanvas = (canvas, text, styles) => {
  const textbox = new fabric.Textbox(text, {
    left: 100,
    top: 100,
    width: 200,
    originX: 'left',
    originY: 'top',
    fontFamily: styles.fontFamily || 'Arial',
    fontSize: styles.fontSize || 20,
    fill: styles.fill || '#000000',
    fontWeight: styles.fontWeight || 'normal',
    fontStyle: styles.fontStyle || 'normal',
    underline: styles.underline || false,
    textAlign: styles.textAlign || 'left',
    lineHeight: styles.lineHeight || 1.16,
    charSpacing: styles.charSpacing || 0,
    opacity: styles.opacity || 1,
    id: generateUniqueId(), // Add unique ID
  });
  canvas.add(textbox);
  canvas.setActiveObject(textbox);
  canvas.renderAll();
};

export const addImageToCanvas = (canvas, url, imageStyles) => {
  fabric.Image.fromURL(url, (img) => {
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
      id: generateUniqueId(), // Add unique ID
    });

    const clipRect = new fabric.Rect({
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      width: img.width,
      height: img.height,
      rx: imageStyles.borderRadius,
      ry: imageStyles.borderRadius,
      scaleX: 1 / img.scaleX,
      scaleY: 1 / img.scaleY,
    });

    img.set({ clipPath: clipRect });

    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();
  }, { crossOrigin: 'anonymous' });
};

// src/utils/canvasUtils.js

export const getSelectionBounds = (objects) => {
  let minLeft = Infinity;
  let minTop = Infinity;
  let maxRight = -Infinity;
  let maxBottom = -Infinity;

  objects.forEach((object) => {
    const bound = object.getBoundingRect();

    minLeft = Math.min(minLeft, bound.left);
    minTop = Math.min(minTop, bound.top);
    maxRight = Math.max(maxRight, bound.left + bound.width);
    maxBottom = Math.max(maxBottom, bound.top + bound.height);
  });

  return {
    left: minLeft,
    top: minTop,
    width: maxRight - minLeft,
    height: maxBottom - minTop,
  };
};

export const alignObjects = (canvas, alignment) => {
  const activeObjects = canvas.getActiveObjects();
  if (activeObjects.length > 1) {
    const groupBounds = getSelectionBounds(activeObjects);

    activeObjects.forEach((object) => {
      const objectBounds = object.getBoundingRect();
      switch (alignment) {
        case 'left':
          object.set('left', groupBounds.left);
          break;
        case 'right':
          object.set('left', groupBounds.left + groupBounds.width - objectBounds.width);
          break;
        case 'center':
          object.set('left', groupBounds.left + groupBounds.width / 2 - objectBounds.width / 2);
          break;
        case 'top':
          object.set('top', groupBounds.top);
          break;
        case 'bottom':
          object.set('top', groupBounds.top + groupBounds.height - objectBounds.height);
          break;
        case 'middle':
          object.set('top', groupBounds.top + groupBounds.height / 2 - objectBounds.height / 2);
          break;
        default:
          break;
      }
      object.setCoords();
    });

    canvas.requestRenderAll();
  }
};

export const distributeObjects = (canvas, direction) => {
  const activeObjects = canvas.getActiveObjects();
  if (activeObjects.length > 2) {
    activeObjects.sort((a, b) => {
      return direction === 'horizontal' ? a.left - b.left : a.top - b.top;
    });

    const positions = activeObjects.map((obj) => ({
      obj,
      left: obj.left,
      top: obj.top,
      width: obj.getScaledWidth(),
      height: obj.getScaledHeight(),
    }));

    const firstObj = positions[0];
    const lastObj = positions[positions.length - 1];

    const firstEdge = direction === 'horizontal' ? firstObj.left : firstObj.top;
    const lastEdge =
      direction === 'horizontal' ? lastObj.left + lastObj.width : lastObj.top + lastObj.height;

    const totalObjectsSize = positions.reduce((sum, pos) => {
      return sum + (direction === 'horizontal' ? pos.width : pos.height);
    }, 0);

    const totalSpace = lastEdge - firstEdge;
    const spaceBetween = (totalSpace - totalObjectsSize) / (positions.length - 1);

    let currentPos = firstEdge;

    positions.forEach((pos, index) => {
      if (index === 0) {
        currentPos += direction === 'horizontal' ? pos.width : pos.height;
      } else {
        if (direction === 'horizontal') {
          pos.obj.set('left', currentPos + spaceBetween);
          currentPos = pos.obj.left + pos.width;
        } else {
          pos.obj.set('top', currentPos + spaceBetween);
          currentPos = pos.obj.top + pos.height;
        }
        pos.obj.setCoords();
      }
    });

    canvas.requestRenderAll();
  }
};

