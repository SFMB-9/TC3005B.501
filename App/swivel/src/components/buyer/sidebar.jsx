import CustomSidebar from '../general/custom_sidebar'
import { ProSidebarProvider } from "react-pro-sidebar";
import { MenuItem } from "@mui/material";

export default function BuyerSidebar() {
  return (
    <ProSidebarProvider>
      <CustomSidebar
        children={
          <>
            <a href='./'>
              <MenuItem>
                Mi cuenta
              </MenuItem>
            </a>
            <a href='./change_password'>
              <MenuItem >
                Contraseña
              </MenuItem>
            </a>
            <a href='./purchases'>
              <MenuItem>
                Mis compras
              </MenuItem>
            </a>
            <a href='./tests'>
              <MenuItem>
                Mis pruebas de manejo
              </MenuItem>
            </a>
            <a href='./favorites'>
              <MenuItem>
                Favoritos
              </MenuItem>
            </a>
            <a href='./documents'>
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