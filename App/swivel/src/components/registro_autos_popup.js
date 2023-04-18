import React from 'react'
import { FormControl, FormLabel } from '@mui/material'
import styles from './registro_autos_popup.module.css'

export default function RegistroAutosPopup(props) {
  return (props.trigger) ? (
    <div className = {styles.popup}>
      <div className= {styles.popupInner}>
        <button className= {styles.closeBtn}>x</button>
        {props.children}
      </div>
    </div>
  ) : "";
}
