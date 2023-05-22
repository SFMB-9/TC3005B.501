import React from 'react'
import { useState } from 'react'

export const ScheduleAppointment = () => {
	const [visible, setVisible] = useState(false)
	return (
		<>
			<button
				onClick={() => {
					setVisible(!visible)
				}}
			>
				Agendar una cita
			</button>
			<div style={{ visibility: visible ? 'visible' : 'hidden' }}>
				<form
					name='schedule-detail'
					onSubmit={(event) => {
						event.preventDefault()
						console.log(event.target[0].value)
					}}
				>
					<label for='date' />
					<input name='date' id='date' type='date' />
					<p>Info de lugar...</p>
					<button type='submit'>Agendar</button>
				</form>
			</div>
		</>
	)
}
