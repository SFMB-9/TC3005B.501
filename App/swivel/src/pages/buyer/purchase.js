import { useEffect, useState } from "react"

export default function Purchase() {
  const [completedPurchases, setCompletedPurchases] = useState([])
  const [uncompletedPurchases, setUncompletedPurchases] = useState([])
  
  const getPurchases = async () => {
    const response = await fetch('http://localhost:3000/api/detalle-compra/purchases')
    const data = await response.json()
    const retrievedPurchases = await data.result
    setCompletedPurchases(retrievedPurchases.filter((purchase) => {
      return purchase.status === 'finalizada' 
    }))
    setUncompletedPurchases(retrievedPurchases.filter((purchase) => {
      return purchase.status !== 'finalizada' 
    }))
  }

  useEffect(() => {
    try {
      getPurchases() 
    } catch (error) {
      console.log(error) 
    }
  }, [])

  return (
    <div>
      <div>
        {completedPurchases.length <= 0 ? 'No compras' : completedPurchases}
      </div>
      <div>
        {uncompletedPurchases.length <= 0 ? 'No compras' : uncompletedPurchases}
      </div>      
    </div>
  )
}