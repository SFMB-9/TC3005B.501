import React from "react";
import CustomHero from "@/components/general/custom_hero";
import ManagerNavbar from "@/components/providers/manager/navbar";
import ActionsCards from "@/components/providers/Manager/actions_cards";

export default function Manager() {
  return (
    <>
      <ManagerNavbar/>
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <ActionsCards/>
    </>
  );
}