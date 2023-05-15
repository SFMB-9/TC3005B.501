import CustomNavbar from "@/components/general/custom_navbar"
import { Typography } from "@mui/material"

export default function SellerNavbar() {
  return (
    <CustomNavbar
      home='/providers/seller/landing'
      elems_right={[
        <a href="/providers/seller/purchase_req" style={{ textDecoration: "none" }}>
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