/*

This is a simple container that collapses on itself once its header is clicked.

*/

import { useState } from 'react';

export default function CollapsibleContainer(props){

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div onClick={toggleVisibility}>{props.containerTitle}</div>
      {isVisible && <div>{props.containerContent}</div>}
    </div>
  );
};

