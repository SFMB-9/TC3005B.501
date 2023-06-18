/*
Ana Paula Katsuda Zalce, Salvador Federico Milanes Braniff
25-5-2023

Navbar que se muestra en la página de inicio de un comprador. Y guarda los datos de sesión en caso de ser iniciada.
*/
import CustomNavbar from "@/components/general/custom_navbar";
import { useSession } from "next-auth/react";

export default function BuyerNavbar() {
  const { data: session } = useSession();

  const elemsRight = session
    ? [
      //{ name: "Mis favoritos", href: "/requests" },
      {
        name: "Mi cuenta",
        href: "",
        popup: [
          { name: "Ver mi perfil", href: "/account"},
          { name: "Cambiar contraseña", href: "/account/change_password" },
          { name: "Cerrar sesión", href: "#", signoutComponent: '/' },
        ],
      },
    ] : [
      { name: "Iniciar sesión", href: "/auth/login" },
    ];

  return (
    <CustomNavbar
      black
      home="/"
      elems_left={[
        { name: "Sobre nosotros", href: "/about" },
        { name: "Compra un auto", href: "/catalog"},
      ]}
      searchbar
      elems_right={elemsRight}
    />
  );
}