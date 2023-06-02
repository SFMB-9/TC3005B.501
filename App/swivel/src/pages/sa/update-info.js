import SANavbar from '@/components/SA/navbar'
import { useState } from 'react'

export default function SAChangePasswordPage() {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')

	const submitHandler = async (event) => {
		event.preventDefault()
		try {
			await axios.put('/api/superadmin/update', {
				name,
				surname,
				email,
				phone
			})	
		} catch (error) {
			return console.log(error)
		}
	}

	return (
		<>
			<SANavbar />
			<div>
        <h1>Información de usuario</h1>
				<form onSubmit={submitHandler}>
          <input name='name' value={name} placeholder='Nombre(s)' onChange={(event) => setName(event.target.value)}/>
          <input name='surname' value={surname} placeholder='Apellidos' onChange={(event) => setSurname(event.target.value)}/>
          <input name='email' value={email} placeholder='ejemplo@gmail.com' onChange={(event) => setEmail(event.target.value)}/>
          <input name='phone' value={phone} placeholder='(00) 0000 0000' onChange={(event) => setPhone(event.target.value)}/>
					<button type='submit'>Guardar cambios</button>
				</form>
			</div>
		</>
	)
}
