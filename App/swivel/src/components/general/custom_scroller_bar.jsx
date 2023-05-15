import React, { useState, useRef } from 'react';
import styles from '@/styles/custom_toggler_bar.module.css';

const CustomScrollerBar = ({ components, transparent = false, stretched = false, bold = false }) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);
  const contentRef = useRef(null);

  const handleComponentChange = (index) => {
    setSelectedComponentIndex(index);
    scrollContentToComponent(index);
  };

  const scrollContentToComponent = (index) => {
    const componentRef = contentRef.current.children[index];
    if (componentRef) {
      componentRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const componentNames = components.map(({ name }) => name);

  return (
    <div>
      <nav className={`${styles.bar} ${stretched ? styles.stretched : ''}`}>
        {components.map(({ name }, index) => (
          <button
            key={index}
            onClick={() => handleComponentChange(index)}
            className={`${styles.button} ${selectedComponentIndex === index ? styles.selected : ''} ${
              transparent ? styles.transparent : ''
            } ${bold ? styles.bold : ''}`}
          >
            {name}
          </button>
        ))}
      </nav>
      <div className={styles.content} ref={contentRef}>
        {components.map(({ component: Component }, index) => (
          <div key={index}>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomScrollerBar;