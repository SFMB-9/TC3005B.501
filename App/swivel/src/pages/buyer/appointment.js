import { useEffect, useState } from 'react'

export default function Appointments () {
  const [completedTests, setCompletedTests] = useState([])
  const [uncompletedTests, setUncompletedTests] = useState([])

  const getTests = async () => {
    const response = await fetch('http://localhost:3000/api/prueba-manejo/test-appointments') 
    const data = await response.json()
    const retrievedTests = await data
    setCompletedTests(retrievedTests.filter((test) => {
      return test.estatus_prueba ===  'completed'
    }))
    setUncompletedTests(retrievedTests.filter((test) => {
      return test.estatus_prueba !== 'completed' 
    }))
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
      <div>
        {completedTests.length <= 0 ? 'No tests' : completedTests}
      </div>
      <div>
        {uncompletedTests.length <= 0 ? 'No tests' : uncompletedTests}
      </div>
    </div>
  )
  
}
