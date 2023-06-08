import React from "react";
import CustomHero from "@/components/general/custom_hero";
import OtherGANavbar from "@/components/providers/GA/navNoSession";


export default function gaLandingPage() {
  return (
    <>
      <OtherGANavbar />
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
    </>
  );
}