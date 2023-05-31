import SANavbar from '@/components/SA/navbar'

export default function SAChangePasswordPage() {
	const submitHandler = async (event) => {
		event.preventDefault()
	}

	return (
		<>
			<SANavbar />
			<div>
        <h1>Información de usuario</h1>
				<form onSubmit={submitHandler}>
          <input name='name' placeholder='Nombre(s)'/>
          <input name='surname' placeholder='Apellidos'/>
          <input name='email' placeholder='ejemplo@gmail.com'/>
          <input name='phone' placeholder='(00) 0000 0000'/>
					<button type='submit'>Guardar cambios</button>
				</form>
			</div>
		</>
	)
}
