import React from 'react';

const Textarea = ({ placeholder, value, onChange, rows = 5 }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="border rounded-md p-2 w-full"
    />
  );
};

export default Textarea;
