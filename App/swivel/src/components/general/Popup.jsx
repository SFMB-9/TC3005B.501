//Author: Regina Rodriguez
//Description: Popup component for the Swivel app

/* EXAMPLE OF HOW TO USE COMPONENT:

    <PopUpComponent
        title = "Titulo"
        popUpContent = {<div> Contenido del popup </div>}
        btnOpen = {<button> Haz click aquí </button>} 
    />
*/

import React, { useState } from "react";
import Modal from 'react-modal'
import CloseIcon from '@mui/icons-material/Close';
import {Typography} from "@mui/material";
import styles from "@/styles/popup.module.css";

const PopUpComponent = ({title, popUpContent, btnOpen, btnClose}) => {
    const [isOpen, setIsOpen] = useState(false)
    const customStyles = {
        overlay: {
            zIndex: '10',
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
       },
        content: {
            background: "none",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: "none",
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
       }
    }
    return (
       <div>
          <button className={styles.btnPopup} onClick={() => setIsOpen(true)}>{btnOpen}</button>
          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <div id={styles.popupBody}>
                <div id={styles.headerPopup}>                    
                    <button onClick={() => setIsOpen(false)} className={styles.btnPopup} id={styles.closeBtn}><CloseIcon/></button>                   
                    <Typography
                        id={styles.title}>
                            {title}
                    </Typography>
                </div>
                <div id={styles.content}>
                    {popUpContent}
                    <button onClick={() => setIsOpen(false)} className={styles.btnPopup}> {btnClose} </button>
  
                </div>
            </div>
             
          </Modal>
       </div>
    )
 }
export default PopUpComponent

