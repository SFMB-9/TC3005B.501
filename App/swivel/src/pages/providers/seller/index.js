import React from "react";
import axios from 'axios';
import CustomHero from "@/components/general/custom_hero";
import SellerNavbar from "@/components/providers/seller/navbar";
import SellerRequestCards from "@/components/providers/seller/request_cards";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function SellerLandingPage() {
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
      <SellerNavbar />
      <CustomHero
        title={"Bienvenidx, " +name}
        message="Administra tus solicitudes pendientes"
      />
      <SellerRequestCards/>
    </>
  );
}