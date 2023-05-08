import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function EmailSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/contrasena/email-recuperacion', { email })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Enter your email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send recovery email</button>
    </form>
  )
}

export default function EmailRecoveryPage() {
  return (
    <div>
      <EmailSection />
    </div>
  )
}