import React from "react";
import CustomHero from "@/components/general/custom_hero";
import GANavbar from '@/components/providers/GA/navbar'
import GActionsCards from "@/components/providers/GA/ga_actions_cards";
//import { useRouter } from 'next/router'

export default function GALandingPage() {

  /*
  const router = useRouter();

  const routToCatalogue = () => {
    router.push('/providers/new_GA/'); // <-- add your route
  };
  const routToManagers = () => {
    router.push('/providers/new_GA/manejo-gerentes');
  };
  const routToAgencies = () => {
    router.push('/providers/new_GA/administracion-agencias');
  };
  const routToStatistics = () => {
    router.push('/providers/new_GA/'); // <-- add your route
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
  /*
  return (
    <>
      <GANavbar/>
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <SellerRequestCards/>

      <div>
        <button onClick={routToCatalogue}>
          Manejo de catalogo
        </button>
        <button onClick={routToManagers}>
          Manejo de gerentes
        </button>
        <button onClick={routToAgencies}>
          Administración de agencias
        </button>
        <button onClick={routToStatistics}>
          Estadísticas
        </button>
      </div>
    </>
  )
  */
}