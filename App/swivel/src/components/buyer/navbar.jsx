/*
Ana Paula Katsuda Zalce
25-5-2023

Navbar que se muestra en la página de inicio de un comprador. Y guarda los datos de sesión en caso de ser iniciada.
*/
import CustomNavbar from "@/components/general/custom_navbar";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function BuyerNavbar() {
  const [apiData, setApiData] = useState(null);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const resData = await fetch(
      `http://localhost:3000/api/managerProfile/managerP?id=${session.id}`
    );

    const res = await resData.json();

    setApiData(res.userData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      console.log("sess1on: ", session)
      fetchData();
    }
    else{
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return <div style={{fontFamily: 'Raleway', fontSize: '13'
    }}>Loading...</div>;
  }

  const elemsRight = session
    ? [
      { name: "Mis favoritos", href: "/requests" },
      {
        name: "Mi cuenta",
        href: "",
        popup: [
          { name: `${apiData.nombres} ${apiData.apellidos}`, href: "/account" },
          { name: "Cambiar contraseña", href: "/account/change_password" },
          { name: "Cerrar sesión", href: "#", signoutComponent: '/' },
        ],
      },
    ]
    : [
      { name: "Iniciar sesión", href: "/auth/login" },
    ];

  return (
    <CustomNavbar
      black
      home="/"
      elems_left={[
        { name: "Sobre nosotros", href: "/about" },
        { name: "Compra un auto", href: "/catalog" },
      ]}
      searchbar
      elems_right={elemsRight}
    />
  );
}