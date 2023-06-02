import CustomNavbar from "@/components/general/custom_navbar"

export default function SANavbar(props) {
  return (
    <CustomNavbar
      home='/superadmin/index'
      elems_right={[
        {name: 'Dashboard', href: '/sa'},
        {name: 'Mi cuenta', href: '/sa/update-info', popup: [{name: "Ver mi Perfil", href: '/update-info'}, {name: 'Cambiar contraseña', href: '/sa/change-password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/login'}]},
      ]}
    />
  )
}