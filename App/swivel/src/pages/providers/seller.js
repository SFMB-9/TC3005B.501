import { useRouter } from "next/router";
import React from "react";
import { Button, Box } from "@mui/material";
import CustomHero from "@/components/general/custom_hero";
import SellerNavbar from "@/components/providers/seller/seller_navbar";
import { signOut } from "next-auth/react";

export default function SellerLandingPage({ children }) {
  const router = useRouter();

  const purchaseRequest = () => {
    router.push({
      pathname: "seller/purchase_req",
    });
  };

  const drivingRequest = () => {
    router.push({
      pathname: "seller/driving_req",
    });
  };

  return (
    <>
      <SellerNavbar/>
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      {/* <h5>Perfil</h5>
      <li>
        <a href="/auth/change_password">Cambiar Contraseña</a>
      </li>
      <li>
        <a
          href="#"
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/auth/login" })
          }
        >
          Logout
        </a>
      </li> */}
      <div style={{ height: "calc(100vh - 300px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={purchaseRequest}
            style={{
              backgroundColor: "white",
              color: "black",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              marginRight: "16px",
            }}
          >
            <span style={{ fontSize: "20px", textAlign: "center" }}>Solicitudes de Compra</span>
            <img
              src="/seller_cart_icon.svg"
              alt="shopping cart"
              style={{ width: "72px", height: "72px" }}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={drivingRequest}
            style={{
              backgroundColor: "white",
              color: "black",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              marginLeft: "16px",
            }}
          >
            <span style={{ fontSize: "20px", textAlign: "center" }}>Solicitudes de Prueba de Manejo</span>
            <img
              src="/seller_wheel_icon.svg"
              alt="steering wheel"
              style={{ width: "72px", height: "72px" }}
            />
          </Button>
        </Box>
      </div>
    </>
  );
}