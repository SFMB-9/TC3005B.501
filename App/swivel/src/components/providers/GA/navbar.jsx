import CustomNavbar from "@/components/general/custom_navbar"

export default function GANavbar() {
  return (
    <CustomNavbar
      home='/providers/GA'
      elems_right={[
        {name: 'Acciones', href: '', popup: [{name: 'Administración de gerentes', href: 'providers/GA/manageGA'}, {name: 'Administración de la agencias', href: 'providers/GA/portal_agencias'}, {name: 'Estadísticas de ventas', href: ''}]},
        {name: 'Mi cuenta', href: '', popup: [{name: 'Editar Mi Perfil', href: '/providers/GA/edit_profile'}, {name: 'Cambiar contraseña', href: '/providers/GA/GA-update-password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/providers/login'}]},
      ]}
    />
  )
}