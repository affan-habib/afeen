// components/CustomControls.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateObjectProperty, updateToolbarProperty } from '../redux/canvasSlice';

const CustomControls = () => {
    const dispatch = useDispatch();
    const selectedObject = useSelector((state) => state.canvas.selectedObject);
    const toolbarProperties = useSelector((state) => state.canvas.toolbarProperties);

    const handleAlignmentChange = (alignment) => {
        if (selectedObject) {
            dispatch(updateObjectProperty({ property: 'textAlign', value: alignment }));
            dispatch(updateToolbarProperty({ property: 'alignment', value: alignment }));
        }
    };

    const handleTextColorChange = (e) => {
        const color = e.target.value;
        if (selectedObject) {
            dispatch(updateObjectProperty({ property: 'fill', value: color }));
            dispatch(updateToolbarProperty({ property: 'color', value: color }));
        }
    };

    const handleFontSizeChange = (e) => {
        const size = e.target.value;
        if (selectedObject) {
            dispatch(updateObjectProperty({ property: 'fontSize', value: size }));
            dispatch(updateToolbarProperty({ property: 'fontSize', value: size }));
        }
    };

    return (
        <div className="p-4 flex flex-col">
            <button
                className="bg-blue-500 text-white mb-2 p-2"
                onClick={() => handleAlignmentChange('left')}
            >
                Align Left
            </button>
            <button
                className="bg-blue-500 text-white mb-2 p-2"
                onClick={() => handleAlignmentChange('center')}
            >
                Align Center
            </button>
            <button
                className="bg-blue-500 text-white mb-2 p-2"
                onClick={() => handleAlignmentChange('right')}
            >
                Align Right
            </button>

            <label className="block mb-2">Font Size</label>
            <input
                type="number"
                value={toolbarProperties.fontSize}
                onChange={handleFontSizeChange}
                className="mb-4 p-2 border"
            />

            <label className="block mb-2">Text Color</label>
            <input
                type="color"
                value={toolbarProperties.color}
                onChange={handleTextColorChange}
                className="p-2 border"
            />
        </div>
    );
};

export default CustomControls;
