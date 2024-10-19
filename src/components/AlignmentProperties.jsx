// src/components/AlignmentProperties.jsx

import React from 'react';
import { 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight, 
  FaAlignJustify, 
  FaArrowUp, 
  FaArrowDown, 
  FaArrowsAltH, 
  FaArrowsAltV 
} from 'react-icons/fa';

const AlignmentProperties = ({
  alignObjects,
  distributeObjects,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', // Set the width of the parent div to 100%
        height: '80px', // Set the height of the parent div to 80px
      }}
    >
      <button onClick={() => alignObjects('left')} title="Align Left">
        <FaAlignLeft size="24" style={{ color: 'white' }} />
      </button>
      <button onClick={() => alignObjects('center')} title="Align Center">
        <FaAlignCenter size="24" style={{ color: 'white' }} />
      </button>
      <button onClick={() => alignObjects('right')} title="Align Right">
        <FaAlignRight size="24" style={{ color: 'white' }} />
      </button>
      <button onClick={() => alignObjects('top')} title="Align Top">
        <FaArrowUp size="24" style={{ color: 'white' }} />
      </button>
      <button onClick={() => alignObjects('middle')} title="Align Middle">
        <FaAlignJustify size="24" style={{ color: 'white' }} />
      </button>
      <button onClick={() => alignObjects('bottom')} title="Align Bottom">
        <FaArrowDown size="24" style={{ color: 'white' }} />
      </button>
      <button onClick={() => distributeObjects('horizontal')} title="Distribute Horizontally">
        <FaArrowsAltH size="24" style={{ color: 'white' }} />
      </button>
      <button onClick={() => distributeObjects('vertical')} title="Distribute Vertically">
        <FaArrowsAltV size="24" style={{ color: 'white' }} />
      </button>
    </div>
  );
};

export default AlignmentProperties;
