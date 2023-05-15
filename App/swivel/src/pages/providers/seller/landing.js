import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CustomNavbar from "@/components/general/custom_navbar";
import { Typography } from "@mui/material";
import CustomHero from "@/components/general/custom_hero";
import SellerNavbar from "@/components/providers/seller/seller_navbar";

export default function SellerLandingPage({ children }) {
  const router = useRouter();

  const purchaseRequest = () => {
    router.push({
      pathname: "./purchase_req",
    });
  };

  const drivingRequest = () => {
    router.push({
      pathname: "./driving_req",
    });
  };

  return (
    <>
      <SellerNavbar/>
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <div>
        <h5>Perfil</h5>
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
        </li>
        <div style={{ padding: "200px" }}>
          <button
            onClick={() => purchaseRequest()}
            type="button"
            style={{ padding: "50px", margin: "50px" }}
          >
            Solicitudes de Compra
          </button>
          <button
            onClick={() => drivingRequest()}
            type="button"
            style={{ padding: "50px", margin: "50px" }}
          >
            Solicitudes de Prueba de Manejo
          </button>
        </div>
      </div>
    </>
  );
}
