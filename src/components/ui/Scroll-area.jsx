import React from 'react';
import './ScrollArea.css'; // Import your styles here

// ScrollArea Component
const ScrollArea = ({ children, style, className }) => {
  return (
    <div className={`scroll-area ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ScrollArea;
