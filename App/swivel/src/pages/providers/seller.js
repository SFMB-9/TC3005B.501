import React from "react";
import CustomHero from "@/components/general/custom_hero";
import SellerNavbar from "@/components/providers/seller/navbar";
import SellerRequestCards from "@/components/providers/seller/request_cards";

export default function SellerLandingPage() {
  return (
    <>
      <SellerNavbar />
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <SellerRequestCards/>
    </>
  );
}