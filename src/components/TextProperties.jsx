// TextProperties.js
import React from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListOl,
  FaListUl,
  FaFont,
} from 'react-icons/fa';

const TextProperties = ({ selectionStyles, updateTextStyle, handleTextChange }) => {
  const handleToggle = (styleName, currentValue, toggleValue) => {
    const newValue = currentValue === toggleValue ? 'normal' : toggleValue;
    updateTextStyle(styleName, newValue);
  };

  return (
    <div className="text-properties">
      {/* Text Alignment */}
      <div className="mb-2 border p-1">
        <label className="block mb-1 font-bold">Text Alignment</label>
        <div className="flex items-center">
          <button
            className={`p-1 mr-1 border ${
              selectionStyles.textAlign === 'left' ? 'bg-gray-300' : ''
            }`}
            onClick={() => updateTextStyle('textAlign', 'left')}
            title="Align Left"
          >
            <FaAlignLeft />
          </button>
          <button
            className={`p-1 mr-1 border ${
              selectionStyles.textAlign === 'center' ? 'bg-gray-300' : ''
            }`}
            onClick={() => updateTextStyle('textAlign', 'center')}
            title="Align Center"
          >
            <FaAlignCenter />
          </button>
          <button
            className={`p-1 mr-1 border ${
              selectionStyles.textAlign === 'right' ? 'bg-gray-300' : ''
            }`}
            onClick={() => updateTextStyle('textAlign', 'right')}
            title="Align Right"
          >
            <FaAlignRight />
          </button>
          <button
            className={`p-1 mr-1 border ${
              selectionStyles.textAlign === 'justify' ? 'bg-gray-300' : ''
            }`}
            onClick={() => updateTextStyle('textAlign', 'justify')}
            title="Justify"
          >
            <FaAlignJustify />
          </button>
        </div>
      </div>

      {/* Font Family */}
      <div className="mb-2">
        <label className="block mb-1 font-bold">Font</label>
        <select
          className="p-1 border w-full text-sm"
          value={selectionStyles.fontFamily}
          onChange={(e) => updateTextStyle('fontFamily', e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Courier">Courier</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* Add more font options as needed */}
        </select>
      </div>

      {/* Font Size and Font Style */}
      <div className="mb-2 flex">
        <div className="w-1/2 mr-1">
          <label className="block mb-1 font-bold">Font Size</label>
          <input
            type="number"
            className="p-1 border w-full text-sm"
            value={selectionStyles.fontSize}
            onChange={(e) =>
              updateTextStyle('fontSize', parseInt(e.target.value, 10))
            }
          />
        </div>
        <div className="w-1/2 ml-1">
          <label className="block mb-1 font-bold">Font Style</label>
          <div className="flex items-center">
            <button
              className={`p-1 mr-1 border ${
                selectionStyles.fontWeight === 'bold' ? 'bg-gray-300' : ''
              }`}
              onClick={() =>
                handleToggle('fontWeight', selectionStyles.fontWeight, 'bold')
              }
              title="Bold"
            >
              <FaBold />
            </button>
            <button
              className={`p-1 mr-1 border ${
                selectionStyles.fontStyle === 'italic' ? 'bg-gray-300' : ''
              }`}
              onClick={() =>
                handleToggle('fontStyle', selectionStyles.fontStyle, 'italic')
              }
              title="Italic"
            >
              <FaItalic />
            </button>
            <button
              className={`p-1 mr-1 border ${
                selectionStyles.underline ? 'bg-gray-300' : ''
              }`}
              onClick={() =>
                updateTextStyle('underline', !selectionStyles.underline)
              }
              title="Underline"
            >
              <FaUnderline />
            </button>
          </div>
        </div>
      </div>

      {/* Line Height and Letter Spacing */}
      <div className="mb-2 flex">
        <div className="w-1/2 mr-1">
          <label className="block mb-1 font-bold">Line Height</label>
          <input
            type="number"
            step="0.1"
            className="p-1 border w-full text-sm"
            value={selectionStyles.lineHeight}
            onChange={(e) =>
              updateTextStyle('lineHeight', parseFloat(e.target.value))
            }
          />
        </div>
        <div className="w-1/2 ml-1">
          <label className="block mb-1 font-bold">Letter Spacing</label>
          <input
            type="number"
            className="p-1 border w-full text-sm"
            value={selectionStyles.charSpacing}
            onChange={(e) =>
              updateTextStyle('charSpacing', parseFloat(e.target.value))
            }
          />
        </div>
      </div>

      {/* Font Color and Opacity */}
      <div className="mb-2 flex items-center">
        <div className="w-1/2 mr-1">
          <label className="block mb-1 font-bold">Font Color</label>
          <input
            type="color"
            className="p-1 border w-full"
            value={selectionStyles.fill}
            onChange={(e) => updateTextStyle('fill', e.target.value)}
          />
        </div>
        <div className="w-1/2 ml-1">
          <label className="block mb-1 font-bold">Opacity (%)</label>
          <input
            type="number"
            className="p-1 border w-full text-sm"
            min="0"
            max="100"
            value={Math.round(selectionStyles.opacity * 100)}
            onChange={(e) =>
              updateTextStyle('opacity', parseFloat(e.target.value) / 100)
            }
          />
        </div>
      </div>

      {/* List Type */}
      <div className="mb-2 border p-1">
        <label className="block mb-1 font-bold">List Type</label>
        <div className="flex items-center">
          <button
            className={`p-1 mr-1 border ${
              selectionStyles.listType === 'ordered' ? 'bg-gray-300' : ''
            }`}
            onClick={() => updateTextStyle('listType', 'ordered')}
            title="Ordered List"
          >
            <FaListOl />
          </button>
          <button
            className={`p-1 mr-1 border ${
              selectionStyles.listType === 'unordered' ? 'bg-gray-300' : ''
            }`}
            onClick={() => updateTextStyle('listType', 'unordered')}
            title="Unordered List"
          >
            <FaListUl />
          </button>
          <button
            className={`p-1 mr-1 border ${
              selectionStyles.listType === 'none' ? 'bg-gray-300' : ''
            }`}
            onClick={() => updateTextStyle('listType', 'none')}
            title="No List"
          >
            <FaFont />
          </button>
        </div>
      </div>

      {/* Text Content */}
      <div className="mb-2">
        <label className="block mb-1 font-bold">Text Content</label>
        <textarea
          className="p-1 border w-full text-sm"
          value={selectionStyles.text}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};

export default TextProperties;
