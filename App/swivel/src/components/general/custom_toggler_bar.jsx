import React, { useState } from 'react';
import styles from '@/styles/custom_toggler_bar.module.css';

const CustomTogglerBar = ({ components, transparent = false, stretched = false }) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);

  const handleComponentChange = (index) => {
    setSelectedComponentIndex(index);
  };

  const SelectedComponent = components[selectedComponentIndex];

  return (
    <div>
      <nav className={`${styles.bar} ${stretched ? styles.stretched : ''}`}>
        {/* Your navbar content here */}
        {components.map((Component, index) => (
          <button
            key={index}
            onClick={() => handleComponentChange(index)}
            className={`${styles.button} ${selectedComponentIndex === index ? styles.selected : ''} ${
              transparent ? styles.transparent : ''
            }`}
          >
            Component {index + 1}
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