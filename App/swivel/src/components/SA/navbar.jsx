import CustomNavbar from "@/components/general/custom_navbar"

export default function SANavbar() {
  return (
    <CustomNavbar
      home='/superadmin/index'
      elems_right={[
        {name: 'Catálogo', href: ''},
        {name: 'Solicitudes', href: '/superadmin/requests'},
        {name: 'Mi cuenta', href: '', popup: [{name: 'Nombre del usuario', href: ''}, {name: 'Cambiar contraseña', href: '/superadmin/change-password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/login'}]},
      ]}
    />
  )
}