import { Button } from "@mui/material"

import SellerLayout from "@/components/seller_layout"
import Searchbar from "@/components/ui/searchbar"

export default function Applications() {
  return (
    <>
      <SellerLayout>
        <Searchbar
          leftItems={'Solicitudes de clientes'}
          placeholderText='Busca entre tus solicitudes'
          rightItems={'<Button>Ordenar por</Button>'}
        />
        Solicitudes
      </SellerLayout>
    </>
  )
}