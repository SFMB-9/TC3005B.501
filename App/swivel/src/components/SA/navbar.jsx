import CustomNavbar from "@/components/general/custom_navbar"

export default function SANavbar() {
  return (
    <CustomNavbar
      home='/sa'
      elems_right={[
        {name: 'Dashboard', href: '/sa'},
        {name: 'Mi cuenta', href: '', popup: [{name: "Ver mi Perfil", href: '/sa/update-info'}, {name: 'Cambiar contraseña', href: '/sa/change-password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/login'}]},
      ]}
    />
  )
}