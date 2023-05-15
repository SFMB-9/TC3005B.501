import React, { useState } from 'react';
import styles from '@/styles/custom_toggler_bar.module.css';

const CustomTogglerBar = ({ components, transparent = false, stretched = false, bold = false }) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);

  const handleComponentChange = (index) => {
    setSelectedComponentIndex(index);
  };

  const SelectedComponent = components[selectedComponentIndex].component;
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
      <div className={styles.content}>
        {SelectedComponent && <SelectedComponent />}
      </div>
    </div>
  );
};

export default CustomTogglerBar;