import GANavbar from "@/components/providers/GA/navbar"
import ChangePassword from "@/components/login/change_password"

import axios from "axios"
import { useState } from "react"
//import handler from '../api/GA/GA-change-password'

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

  
//using the same component as the user seller ---> /providers/seller/change_password
  return (
    <>
    <GANavbar/>
    <ChangePassword/>
    </>
  )

}
