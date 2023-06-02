import React from "react";
import CustomHero from "@/components/general/custom_hero";
import GANavbar from '@/components/providers/GA/navbar'
//import { useRouter } from 'next/router'
import GActionsCards from "@/components/providers/GA/ga_actions_cards";

export default function GALandingPage() {
  /* non functional with component actions cards 
  const router = useRouter();

  const routToCatalogue = () => {
    router.push('/providers/GA/'); // <-- add your route
  };
  const routToAgencies = () => {
    router.push('/providers/GA/administracion-agencias');
  };
  const routToStatistics = () => {
    router.push('/providers/GA/'); // <-- add your route
  };  
  const routToGA = () => {
    router.push('/providers/GA/'); // <-- add your route
  };
  */


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