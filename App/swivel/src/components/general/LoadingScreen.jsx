import React from 'react';
import styles from '@/styles/loadingScreen.module.css';
import {Image} from "@mui/material";

const LoadingScreen = () => {
  return (
    <div className={styles.spinnerContainer}>
      <img src="/swivel_logo_black.svg" />
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default LoadingScreen;
