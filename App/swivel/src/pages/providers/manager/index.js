import React from "react";
import axios from 'axios';
import CustomHero from "@/components/general/custom_hero";
import ManagerNavbar from "@/components/providers/manager/navbar";
import ActionsCards from "@/components/providers/Manager/actions_cards";
import { useSession } from "next-auth/react";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function Manager() {
  return (
    <>
      <ManagerNavbar />
      <CustomHero
        title={"Bienvenidx, " +name}
        message="Administra tus solicitudes pendientes"
      />
      <ActionsCards />
    </>
  );
}
