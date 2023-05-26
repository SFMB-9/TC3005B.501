// Author: Mateeo Herrera
// Description: This component is a sticky div that is used in the swivel app to
// display the filters and the table header
import React, { useEffect, useRef, useState } from 'react';

const StickyDiv = (props) => {
  const isStickyRef = useRef(false);
  const ref = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 1]
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry && entry.boundingClientRect.y) {
          const isScrollingUp = entry.boundingClientRect.y < entry.rootBounds.y;

          if (!entry.isIntersecting && isScrollingUp) {
            isStickyRef.current = true;
            setIsSticky(true);
            ref.current.style.position = 'fixed';
            ref.current.style.top = '0';
            ref.current.style.zIndex = '100';
            ref.current.style.width = '100%';
          } else {
            setHeight(ref.current.getBoundingClientRect().height)
            isStickyRef.current = false;
            ref.current.style.position = '';
            ref.current.style.top = '';
            ref.current.style.width = '';
            setIsSticky(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    observer.observe(document.querySelector('#sensor'));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div id='sensor'></div>
      <div style={isSticky ? { visibility: 'visible', height: `${height}px` } : { visibility: 'hidden', height: 0 }}></div>
      <div ref={ref}>
        {props.children}
      </div>
    </div>
  );
};

export default StickyDiv;
