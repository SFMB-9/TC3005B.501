import CustomNavbar from "@/components/general/custom_navbar"

export default function GANavbar() {
  return (
    <CustomNavbar
      home='/providers/GA'
      elems_right={[
        {name: 'Acciones', href: '', popup: [{name: 'Manejo de catálogo', href: ''}, {name: 'Administración de gerentes', href: 'GA/manageGA'}, {name: 'Administración de la agencias', href: 'GA/portal_agencias'}, {name: 'Estadísticas de ventas', href: ''}]},
        {name: 'Mi cuenta', href: '', popup: [{name: 'Ver mi perfil', href: 'GA/editProfile'}, {name: 'Cambiar contraseña', href: '/providers/GA/GA-update-password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/login'}]},
      ]}
    />
  )
}