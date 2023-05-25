//Author: Regina Rodriguez
//Description: Popup component for the Swivel app

import Popup from 'reactjs-popup';
import React, { useState } from "react";
import Modal from 'react-modal'
import CloseIcon from '@mui/icons-material/Close';
//import 'reactjs-popup/dist/index.css';
import {
    Typography,
    Container
  } from "@mui/material";
import styles from "@/styles/popup.module.css";

const MyComponent = ({title, popUpContent, btnOpen}) => {
    const [isOpen, setIsOpen] = useState(false)
    const customStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
       },
        content: {
            zIndex: 10,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
       }
    }
    return (
       <div>
          <button className={styles.btnPopup} onClick={() => setIsOpen(true)}>{btnOpen}</button>
          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <div id={styles.popupBody}>
                <div id={styles.flexboxTitle}>
                    <Typography
                        id={styles.title}>
                            {title}
                    </Typography>
                    <button onClick={() => setIsOpen(false)} className={styles.btnPopup} id={styles.closeBtn}><CloseIcon/></button>
                    
                </div>

                <div id={styles.content}>
                    {popUpContent}
                </div>
            </div>
             
          </Modal>
       </div>
    )
 }
export default MyComponent