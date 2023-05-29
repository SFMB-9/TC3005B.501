import ChangePassword from "@/components/login/change_password"
import AccountLayout from "@/components/buyer/account_layout"
import PopUpComponent from "@/components/general/Popup"
//import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';

export default function BuyerChangePassword() {
  return(
    <AccountLayout>
      <ChangePassword/>
      <PopUpComponent
        btn = {<button> Click to open popup </button>}
      /> 
    </AccountLayout>
    
  )
}