import CustomHero from "@/components/general/custom_hero";
import CustomNavbar from "../../components/general/custom_navbar";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function Landing() {
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
      <h1>seller landing</h1>
    </div>
  )
}