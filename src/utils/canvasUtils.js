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

// You can add more functions for shapes, etc.
