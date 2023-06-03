import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Comparison() {
	const [vehicles, setVehicles] = useState([])
    const router = useRouter();

	const submithandler = async () => {
        const { id } = router.params;
		const response = await axios.get('/api/comparar-prod/comparar-productos', { params: { lst: vehicles }})
		
	}

	useEffect(() => {
		try {
			getTests()
		} catch (error) {
			console.log(error)
		}
	}, [])

	return (
		<div>
			<div>{completedTests.length <= 0 ? 'No tests' : completedTests}</div>
			<div>{uncompletedTests.length <= 0 ? 'No tests' : uncompletedTests}</div>
		</div>
	)
}