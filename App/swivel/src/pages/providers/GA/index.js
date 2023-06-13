import React from "react";
import axios from 'axios';
import CustomHero from "@/components/general/custom_hero";
import GANavbar from '@/components/providers/GA/navbar'

import GActionsCards from "@/components/providers/GA/ga_actions_cards";
import RequestCards from "@/components/providers/GA/request_cards";
import Process from "@/components/providers/GA/process";
import Footer from "@/components/general/Footer";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function GALandingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState('');

  const fetchResults = async (q) => {
    try {
      const response = await axios.get("/api/managerProfile/managerP", { params: { id: q } });
      const userData = response.data.userData;
      console.log(userData)
      setName(userData.nombres || '');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    if(session){
        fetchResults(session.id)
    } else {

    }
  }, [session]);


  return (
    <>
      <GANavbar />
      {/* Check if the user is logged in */}
      {session ?
        <>
          <CustomHero
            title={"Bienvenidx, " +name}
            message="Administra tus agencias, gerentes y conoce tu desempeño"
          />
          <GActionsCards />
        </>
        :
        <>
          <CustomHero
            title="Sé parte del cambio"
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