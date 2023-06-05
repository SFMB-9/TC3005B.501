/*
Salvador Federico Milanes Braniff
16-04-2023

LandingPageLayout es el componente que contiene la estructura de la página de inicio.
Utilizarlo permite reducir la cantidad de codigo redundante en interfaces
que compartan la misma estructura.
*/
import ManagerNavbar from "./navbar";

export default function ManagerLayout({ children }) {
  return (
    <>
      <ManagerNavbar
        session={true}
      />
      {children}
    </>
  );
}