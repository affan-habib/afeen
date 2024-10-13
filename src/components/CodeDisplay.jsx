import React from 'react';

const CodeDisplay = ({ code }) => {
  return (
    <pre className="bg-gray-100 p-4 rounded overflow-y-auto">
      <code>{code}</code>
    </pre>
  );
};

export default CodeDisplay;
