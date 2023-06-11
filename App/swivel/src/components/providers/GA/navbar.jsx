import CustomNavbar from "@/components/general/custom_navbar"
import { useSession } from "next-auth/react"

export default function GANavbar() {
  const { data: session } = useSession();

  const elemsRight = session
    ? [
      {
        name: 'Acciones', 
        href: '', 
        popup: [
          {name: 'Administración de gerentes', href: 'providers/GA/manageGA'}, 
          {name: 'Administración de la agencias', href: 'providers/GA/agency_management'}, 
          {name: 'Estadísticas de ventas', href: ''}
        ],
      },
      {
        name: 'Mi cuenta', 
        href: '', 
        popup: [
          {name: 'Editar Mi Perfil', href: '/providers/GA/editProfile'}, 
          {name: 'Cambiar contraseña', href: '/providers/GA/GA-update-password'}, 
          {name: 'Cerrar sesión', href:'#', signoutComponent: ''}
        ]
      },
    ] : [
      { name: "Iniciar sesión", href: "/auth/providers/login" },
      {name: 'Registra tu G.A', href: '/providers/GA/registerGroup/form'}
    ];

  return (
    <CustomNavbar
      home='/providers/GA'
      elems_left={[
        { name: "Sobre nosotros", href: "/about" },
        { name: "Compra un auto", href: "/catalog"},
      ]}
      searchbar
      elems_right={elemsRight}
    />
  )
}