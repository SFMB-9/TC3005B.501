import React from "react";
import CustomHero from "@/components/general/custom_hero";
import GANavbar from '@/components/providers/GA/navbar'

//import { useRouter } from 'next/router'
import GActionsCards from "@/components/providers/GA/ga_actions_cards";

export default function GALandingPage() {
  return (
    <>
      <GANavbar/>
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <GActionsCards/>
    </>
  )
}