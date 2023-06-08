import React from "react";
import axios from 'axios';
import CustomHero from "@/components/general/custom_hero";
import SANavbar from "@/components/SA/navbar";
import ActionsCards from "@/components/SA/actions_cards";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function Manager() {
    const router = useRouter();
    const { data: session } = useSession();
    const [name, setName] = useState('');

    const fetchResults = async (q) => {
        try {
            const response = await axios.get("/api/managerProfile/managerP", { params: { id: q } });
            const userData = response.data.userData;
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
      <SANavbar />
      <CustomHero
        title={"Bienvenidx, " +name}
        message="Facilitemos la compraventa de vehiculos a través de la confianza."
      />
      <ActionsCards/>
    </>
  );
} 