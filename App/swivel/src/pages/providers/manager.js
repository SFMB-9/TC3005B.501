import React from "react";
import CustomHero from "@/components/general/custom_hero";
import SellerNavbar from "@/components/providers/seller/seller_navbar";
import ActionsCards from "@/components/providers/manager/action_cards";

export default function ManagerLandingPage() {
  return (
    <>
      <SellerNavbar />
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <ActionsCards/>
    </>
  );
}