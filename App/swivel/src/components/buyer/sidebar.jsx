import CustomSidebar from '../general/old_sidebar'
import { ProSidebarProvider } from "react-pro-sidebar";
import { MenuItem } from "@mui/material";

export default function BuyerSidebar() {
  // Define the root path
  const root = '/account'

  return (
    <ProSidebarProvider>
      <CustomSidebar
        children={
          <>
            <a href={`${root}/`}>
              <MenuItem>
                Mi cuenta
              </MenuItem>
            </a>
            <a href={`${root}/change_password`}>
              <MenuItem >
                Contraseña
              </MenuItem>
            </a>
            <a href={`${root}/purchases`}>
              <MenuItem>
                Mis compras
              </MenuItem>
            </a>
            <a href={`${root}/tests`}>
              <MenuItem>
                Mis pruebas de manejo
              </MenuItem>
            </a>
            <a href={`${root}/favorites`}>
              <MenuItem>
                Favoritos
              </MenuItem>
            </a>
            <a href={`${root}/documents`}>
              <MenuItem>
                Mis documentos
              </MenuItem>
            </a>
          </>
        }
        footer={
          <>
            Logout
          </>
        }
      />
    </ProSidebarProvider>
  )
}