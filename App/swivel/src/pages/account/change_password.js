import ChangePassword from "@/components/login/change_password"
import AccountLayout from "@/components/buyer/account_layout"

export default function BuyerChangePassword() {
  return(
    <AccountLayout>
      <div className="m-3">
        <ChangePassword/>
      </div>
    </AccountLayout>
  )
}