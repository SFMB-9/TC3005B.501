import SANavbar from '@/components/SA/navbar'
import { useEffect } from 'react'
import axios from 'axios'

export default function SARequestsPage() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    axios.get('/api/superadmin/get-requests').then((requestList) => {
      setRequests(requestList)
    })
  }, [])

  return (
    <>
      <SANavbar/>
      <div>
        <h1>Gestión de solicitudes</h1>
        <div>
          <h2>Solicitudes de Grupo Automotriz</h2>
        </div>
        <div>
          <h2>Solicitudes de Agencias de Grupo Automotriz</h2>
        </div>
      </div>
    </>
  )
}