import CustomNavbar from "@/components/general/custom_navbar";

export default function ManagerNavbar() {
  return (
    <CustomNavbar
      home="/providers/manager"
      elems_right={[
        {
          name: "Mi cuenta",
          href: "",
          popup: [
            { name: "Nombre del usuario", href: "" },
            { name: "Cambiar contraseña", href: "/auth/change_password" },
            { name: "Cerrar sesión", href: "#", signoutComponent: '/auth/login' },
          ]
        }
      ]}
    />
  );
}