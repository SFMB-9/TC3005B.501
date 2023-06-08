import CustomNavbar from "@/components/general/custom_navbar";
import React, { useState, useEffect } from "react";

export default function OtherGANavbar() {

  return (
    <CustomNavbar
      black
      home="/"
      elems_left={[
        { name: "Sobre nosotros", href: "/about" },
        { name: "Compra un auto", href: "/catalog"},
      ]}
      searchbar
      elems_right={[
        {name: 'Mi Cuenta', href: '', popup: [{name: 'Inicia Sesión', href: '/auth/providers/login'}, {name: 'Regístrate', href: '/providers/GA/registerGroup/form'}]},
      ]}
    />
  );
}