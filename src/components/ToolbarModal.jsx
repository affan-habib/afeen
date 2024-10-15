// components/ToolbarModal.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen, updateToolbarProperty } from '../redux/canvasSlice';

const ToolbarModal = () => {
    const dispatch = useDispatch();
    const toolbarProperties = useSelector(state => state.canvas.toolbarProperties);

    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateToolbarProperty({ property: name, value }));
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Toolbar Settings</h2>

                <label className="block mb-2">Alignment</label>
                <select
                    name="alignment"
                    value={toolbarProperties.alignment}
                    onChange={handlePropertyChange}
                    className="w-full p-2 border mb-4"
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>

                <label className="block mb-2">Font Size</label>
                <input
                    name="fontSize"
                    type="number"
                    value={toolbarProperties.fontSize}
                    onChange={handlePropertyChange}
                    className="w-full p-2 border mb-4"
                />

                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => dispatch(setModalOpen(false))}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ToolbarModal;
