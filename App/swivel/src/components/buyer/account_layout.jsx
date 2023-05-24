import BuyerNavbar from "@/components/buyer/navbar";
import BuyerSidebar from "@/components/buyer/sidebar";
import Footer from "@/components/general/footer";

export default function AccountLayout({children}) {
  return(
    <>
      <BuyerNavbar/>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <BuyerSidebar/>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          
        }}>
          {children}
        </div>
      </div>
      <Footer/>
    </>
  )
}