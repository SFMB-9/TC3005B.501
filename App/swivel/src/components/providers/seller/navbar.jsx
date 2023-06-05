import CustomNavbar from "@/components/general/custom_navbar"

export default function SellerNavbar() {
  return (
    <CustomNavbar
      home='/providers/seller'
      elems_right={[
        {name: 'Solicitudes', href: '', popup: [{name: 'Solicitudes de compra', href: '/providers/seller/purchase_req'}, {name: 'Solicitudes de prueba de manejo', href: '/providers/seller/driving_req'}]},
        {name: 'Mi cuenta', href: '', popup: [{name: 'Ver mi perfil', href: '/providers/seller/profile'}, {name: 'Cambiar contraseña', href: '/providers/seller/change_password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/providers/login'}]},
      ]}
    />
  )
}