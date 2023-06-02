import CustomNavbar from "@/components/general/custom_navbar"

export default function GANavbar() {
  return (
    <CustomNavbar
      home='/providers/GA'
      elems_right={[
        {name: 'Mi cuenta', href: '', popup: [{name: 'Nombre del usuario', href: ''}, {name: 'Cambiar contraseña', href: '/providers/GA-update-password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/login'}]},
      ]}
    />
  )
}