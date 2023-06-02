/*

This is a simple container that collapses on itself once its header is clicked.

*/

import React, { useState } from 'react';

const CollapsibleContainer = (props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const containerStyle = {
    maxHeight: open ? '1000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
  };

  return (
    <div>
      <button onClick={toggle}>{props.header}</button>
      <div style={containerStyle}>
        {props.children}
      </div>
    </div>
  );
};

export default CollapsibleContainer;
