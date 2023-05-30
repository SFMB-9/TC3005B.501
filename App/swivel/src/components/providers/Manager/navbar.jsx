import CustomNavbar from "@/components/general/custom_navbar"

export default function ManagerNavbar() {
  return (
    <CustomNavbar
      home='/providers/manager'
      elems_right={[
        {name: 'Acciones', href: '', popup: [{name: 'Administración del catálogo', href: '/providers/manager/catalog'}, {name: 'Administración de vendedores', href: '/providers/manager/sellers'}, {name: 'Administración de la agencia', href: '/providers/manager/branch'}, {name: 'Estadísticas de ventas', href: '/providers/manager/statistics'}]},
        {name: 'Mi cuenta', href: '', popup: [{name: 'Mi perfil', href: ''}, {name: 'Cambiar contraseña', href: '/providers/manager/change_password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/login'}]},
      ]}
    />
  )
}