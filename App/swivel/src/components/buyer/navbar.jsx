import CustomNavbar from "@/components/general/custom_navbar";

export default function BuyerNavbar({ session = false }) {
  const elemsRight = session
    ? [
      { name: "Búsqueda", href: "/requests" },
      { name: "Mis favoritos", href: "/requests" },
      {
        name: "Mi cuenta",
        href: "",
        popup: [
          { name: "Nombre del usuario", href: "" },
          { name: "Cambiar contraseña", href: "/auth/change_password" },
          { name: "Cerrar sesión", href: "#", signoutComponent: '/auth/login' },
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
        { name: "Compra un auto", href: "/catalogo" },
      ]}
      searchbar
      elems_right={elemsRight}
    />
  );
}