import CustomSidebar from '../general/old_sidebar'
import { ProSidebarProvider } from "react-pro-sidebar";
import { MenuItem } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function BuyerSidebar() {
  // Define the root path
  const root = '/account'

  return (
    <ProSidebarProvider>
      <CustomSidebar
      />
    </ProSidebarProvider>
  )
}