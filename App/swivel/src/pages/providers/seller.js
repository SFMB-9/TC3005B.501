import { useRouter } from "next/router";
import React from "react";
import CustomHero from "@/components/general/custom_hero";
import SellerNavbar from "@/components/providers/seller/seller_navbar";
import ReqCards from "@/components/providers/seller/req_cards";
// import { signOut } from "next-auth/client";

export default function SellerLandingPage({ children }) {


  return (
    <>
      <SellerNavbar />
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
      <ReqCards/>
    </>
  );
}