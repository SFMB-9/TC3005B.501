import React from "react";
import CustomHero from "@/components/general/custom_hero";
import SANavbar from "@/components/SA/navbar";
import ActionsCards from "@/components/SA/actions_cards";

export default function Manager() {
  return (
    <>
      <SANavbar />
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <ActionsCards/>
    </>
  );
} 