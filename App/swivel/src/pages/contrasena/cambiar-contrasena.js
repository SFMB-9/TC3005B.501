import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function PasswordSection() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter();
    const email = router.query.email;
  
    const handlePasswordReset = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post(`/api/contrasena/cambiar-contrasena?email=${email}`, { password })
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <form onSubmit={handlePasswordReset}>
        <label htmlFor="password">Enter your new password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm your new password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset password</button>
      </form>
    )
  }

export default function EmailRecoveryPage() {
    return (
      <div>
        <PasswordSection />
      </div>
    )
}