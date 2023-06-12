import React from 'react';

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        fontSize: '24px',
      }}
    >
      Loading...
    </div>
  );
};

export default LoadingScreen;
