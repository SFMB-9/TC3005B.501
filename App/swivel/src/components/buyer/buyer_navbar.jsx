import CustomNavbar from "@/components/general/custom_navbar"
import { Typography } from "@mui/material"

export default function BuyerNavbar() {
  return (
    <CustomNavbar
      black
      home='/'
      elems_left={[
        <a href="about" style={{ textDecoration: "none" }}>
          <Typography color="white" fontFamily="Lato" fontSize={13}>
            Sobre nosotros
          </Typography>
        </a>,
        <a href="/catalog" style={{ textDecoration: "none" }}>
          <Typography color="white" fontFamily="Lato" fontSize={13}>
            Compra un auto
          </Typography>
        </a>,
      ]}
      elems_right={[
        <a href="" style={{ textDecoration: "none" }}>
          <Typography color="white" fontFamily="Lato" fontSize={13}>
            Solicitudes
          </Typography>
        </a>,
        <a href="" style={{ textDecoration: "none" }}>
          {/* <img src='/navbar_account_icon.svg' alt='account icon'/> */}
          <Typography color="white" fontFamily="Lato" fontSize={13}>
            Mi cuenta
          </Typography>
        </a>,
      ]}
    />
  )
}