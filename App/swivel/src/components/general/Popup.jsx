//Author: Regina Rodriguez
//Description: Popup component for the Swivel app

import Popup from 'reactjs-popup';
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
//import 'reactjs-popup/dist/index.css';
import {
    Typography,
    Container
  } from "@mui/material";
import styles from "@/styles/popup.module.css";

export default function PopUpComponent({btn, title})
{
    return(
        <>
        
            <Container maxWidth="xl">
                
                <Popup trigger={btn} 
                    position="right center">
                    <div id={styles.popupBody}>
                        <button 
                        className="d-flex justify-content-end" 
                        id={styles.closeBtn}> 
                            <CloseIcon></CloseIcon>
                        </button>
                        <Typography
                        id={styles.title}>
                            {title = "Prueba"}
                        </Typography>
                        <div id={styles.content}>
                            content
                        </div>
                    </div>
                </Popup>
            </Container>
        

        
        {/*<div>
            <h4>NextJs Popup - GeeksforGeeks</h4>
            <Popup trigger={<button> Click to open popup </button>} 
            position="right center">
            <div>GeeksforGeeks</div>
            <button>Click here</button>
            </Popup>
    </div> */}
    </>
    )
};