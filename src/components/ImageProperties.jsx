// ImageProperties.js
import React from 'react';
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';

const ImageProperties = ({
  isImageSelected,
  imageStyles,
  handleImageStyleChange,
  addImageToCanvas,
}) => {
  // Sample image URLs
  const imageUrls = [
    pic1,
    pic2,
  ];

  return (
    <>
      <h2 className="text-base font-bold mb-2">Image Properties</h2>
      {/* Image controls */}
      <div className="mb-2 flex items-center">
        <div className="w-1/2 pr-1">
          <label className="block mb-1 text-sm">Width</label>
          <input
            type="number"
            className="p-1 border w-full text-sm"
            value={imageStyles.width}
            onChange={(e) =>
              handleImageStyleChange('width', parseFloat(e.target.value))
            }
            disabled={!isImageSelected}
          />
        </div>
        <div className="w-1/2 pl-1">
          <label className="block mb-1 text-sm">Height</label>
          <input
            type="number"
            className="p-1 border w-full text-sm"
            value={imageStyles.height}
            onChange={(e) =>
              handleImageStyleChange('height', parseFloat(e.target.value))
            }
            disabled={!isImageSelected}
          />
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <div className="w-1/2 pr-1">
          <label className="block mb-1 text-sm">Border Width</label>
          <input
            type="number"
            className="p-1 border w-full text-sm"
            value={imageStyles.borderWidth}
            onChange={(e) =>
              handleImageStyleChange('borderWidth', parseFloat(e.target.value))
            }
            disabled={!isImageSelected}
          />
        </div>
        <div className="w-1/2 pl-1">
          <label className="block mb-1 text-sm">Border Radius</label>
          <input
            type="number"
            className="p-1 border w-full text-sm"
            value={imageStyles.borderRadius}
            onChange={(e) =>
              handleImageStyleChange('borderRadius', parseFloat(e.target.value))
            }
            disabled={!isImageSelected}
          />
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <div className="w-1/3 pr-1">
          <label className="block mb-1 text-sm">Border Color</label>
          <input
            type="color"
            className="p-1 border w-full"
            value={imageStyles.borderColor}
            onChange={(e) => handleImageStyleChange('borderColor', e.target.value)}
            disabled={!isImageSelected}
          />
        </div>
      </div>
      <h2 className="text-base font-bold mb-2">Select an Image</h2>
      <div className="grid grid-cols-2 gap-2">
        {imageUrls.map((url, index) => (
          <div key={index} className="cursor-pointer" onClick={() => addImageToCanvas(url)}>
            <img src={url} alt={`Sample ${index + 1}`} className="w-full h-auto border" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageProperties;
