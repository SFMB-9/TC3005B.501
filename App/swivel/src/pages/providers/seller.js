import React from "react";
import CustomHero from "@/components/general/custom_hero";
import SellerNavbar from "@/components/providers/seller/seller_navbar";
import ReqCards from "@/components/providers/seller/req_cards";

export default function SellerLandingPage() {
  return (
    <>
      <SellerNavbar />
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <ReqCards/>
    </>
  );
}