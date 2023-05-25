import axios from "axios";
import CustomNavbar from "@/components/general/custom_navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function BuyerNavbar() {
  const { data: session } = useSession();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/api/getUserName", {
          params: {
            id: session.id,
          },
        });
        setUserName(data.user.name);
      } catch (error) {
        console.log(error);
      }
    };

    if (session) {
      fetchUserData() 
      console.log(userName)
    }
  }, [session]);

  const elemsRight = session
    ? [
      { name: "Mis favoritos", href: "/requests" },
      {
        name: "Mi cuenta",
        href: "",
        popup: [
          { name: userName, href: "/account" },
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