import React from "react";
import CustomHero from "@/components/general/custom_hero";
import GANavbar from '@/components/providers/GA/navbar'
import { useSession } from "next-auth/react";

//import { useRouter } from 'next/router'
import GActionsCards from "@/components/providers/GA/ga_actions_cards";
import RequestCards from "@/components/providers/GA/request_cards";
import Process from "@/components/providers/GA/process";
import Footer from "@/components/general/footer";

export default function GALandingPage() {
  const { data: session } = useSession()

  return (
    <>
      <GANavbar />
      {/* Check if the user is logged in */}
      {session ?
        <>
          <CustomHero
            title="¡Bienvenidx!"
            message="Administra tus agencias, gerentes y conoce tu desempeño"
          />
          <GActionsCards />
        </>
        :
        <>
          <CustomHero
            title="Se parte del cambio"
            message="¡Unete a Swivel! Regístrate como Grupo Automotriz y se parte del cambio"
          />
          <RequestCards />
          <Process />
          <Footer />
        </>
      }
    </>
  )
}