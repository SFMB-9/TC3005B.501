import GANavbar from "@/components/providers/GA/navbar"
import axios from "axios"
import { useState } from "react"
import handler from '../api/GA/GA-change-password'

export default function GAUpdatePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  
  const submitHandler = async (event) => {
    event.preventDefault();
    if (newPassword === passwordConfirmation) {
      try {
        await axios.put("/api/GA/GA-change-password", {
          password: newPassword,
          oldPassword,
        })
      } catch (error) {
        return console.log(error)
      }
    }else{
      console.log("Passwords do not match!");
    }
  }

  return (
    <>
    <GANavbar/>
    <div>
      <h1>Cambiar contraseña</h1>
      <p>Se cerrarán todas las sesiones, excepto a la actual, para proteger tu cuenta</p>
      <p>La contraseña debe tener al menos seis carácteres, e incluir una combinación de números, letras y carácteres especiales. (!$@%)</p>
      <form onSubmit={submitHandler}>
        <input name="oldPassword" value={oldPassword} placeholder="Contraseña" onChange={(e) => setOldPassword(e.target.value)}/>
        <input name="password" value={newPassword} placeholder="Contraseña" onChange={(e) => setNewPassword(e.target.value)}/>
        <input name="passwordConfirm" value={passwordConfirmation} placeholder="Contraseña" onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        <button onClick={() => {
          setOldPassword('')
          setNewPassword('')
          setPasswordConfirmation('')
        }}>Cancelar</button>
        <button type="submit">Guardar</button>
      </form>
    </div>
    </>
  )
}