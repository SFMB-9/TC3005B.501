/*
Salvador Federico Milanes Braniff
16-04-2023

LandingPageLayout es el componente que contiene la estructura de la página de inicio.
Utilizarlo permite reducir la cantidad de codigo redundante en interfaces
que compartan la misma estructura.
*/
"use client"

import BuyerNavbar from "./navbar";
import Footer from "../general/Footer";

export default function BuyerLayout({ children }) {
  return (
    <>
      <BuyerNavbar/>
      <div className="min-vh-100">
        {children}
      </div>
      <Footer/>
    </>
  );
}
