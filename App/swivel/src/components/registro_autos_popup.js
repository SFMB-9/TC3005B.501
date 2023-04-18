import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel } from '@mui/material'
import { TextField, Button, Link } from '@mui/material'
import styles from './registro_autos_popup.module.css'

export default function RegistroAutosPopup(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = (event) => {
      event.preventDefault()

      setEmailError(false)
      setPasswordError(false)

      if (email == '') {
          setEmailError(true)
      }
      if (password == '') {
          setPasswordError(true)
      }

      if (email && password) {
          console.log(email, password)
      }
  }

  return (props.trigger) ? (
    <div className = {styles.popup}>
      <div className= {styles.popupInner}>
        <button className= {styles.closeBtn} onClick = {() => props.setTrigger(false)}> close </button>
        {props.children}

        <React.Fragment> 
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Login Form</h2>
                <TextField 
                    label="Marca"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    value={email}
                    error={emailError}
                 />
                 <TextField 
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Login</Button>
             
        </form>
        <small>Need an account? <Link to="/">Register here</Link></small>
        </React.Fragment>
      </div>
    </div>
  ) : "";
}
