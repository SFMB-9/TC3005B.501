import React from "react";
import CustomHero from "@/components/general/custom_hero";
import ManagerNavbar from "@/components/providers/manager/navbar";
import ActionsCards from "@/components/providers/Manager/actions_cards";
import { useSession } from "next-auth/react";

export default function Manager() {
  const { session } = useSession();

  React.useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <ManagerNavbar />
      <CustomHero
        title="Bienvenidx, nombre"
        message="Administra tus solicitudes pendientes"
      />
      <ActionsCards />
    </>
  );
}
