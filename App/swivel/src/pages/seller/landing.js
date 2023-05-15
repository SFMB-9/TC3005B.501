import CustomHero from "@/components/general/custom_hero";
import CustomNavbar from "@/components/general/custom_navbar";
import CustomTogglerBar from "@/components/general/custom_toggler_bar";
import Link from "next/link";
import { Typography } from "@mui/material";
import Catalog from "../catalog";

export default function Landing() {
  const components = [
    ()=><Catalog/>,
    ()=><h1>hola3</h1>,
  ]
  return (
    <div>
      <CustomNavbar
        elems_right={[
          <Link
            href="/catalog"
            style={{ textDecoration: "none" }}
          >
            <Typography color="white" fontFamily="Lato" fontSize={13}>
              Catálogo
            </Typography>
          </Link>,
          <Link
            href="/requests"
            style={{ textDecoration: "none" }}
          >
            <Typography color="white" fontFamily="Lato" fontSize={13}>
              Solicitudes
            </Typography>
          </Link>,
          <Link
            href="/catalog"
            style={{ textDecoration: "none" }}
          >
            {/* <img src='/navbar_account_icon.svg' alt='account icon'/> */}
            <Typography color="white" fontFamily="Lato" fontSize={13}>
              Mi cuenta
            </Typography>
          </Link>
        ]}
      />
      <CustomHero/>
      <CustomTogglerBar
        components={components}
        transparent
      />
      <h1>seller landing</h1>
    </div>
  )
}