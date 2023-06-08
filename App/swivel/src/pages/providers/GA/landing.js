import React from "react";
import CustomHero from "@/components/general/custom_hero";
import OtherGANavbar from "@/components/providers/GA/navNoSession";
import Process from "@/components/providers/GA/process";

export default function gaLandingPage() {
  return (
    <>
      <OtherGANavbar />
      <CustomHero
        title="Se parte del cambio"
        message="¡Unete a Swivel! Regístrate como Grupo Automotriz y se parte del cambio"
      />
      <Process />
    </>
  );
}