import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import CustomReqCard from "@/components/general/custom_req_card";

export default function ReqCards() {
  const router = useRouter();

  const purchaseRequest = () => {
    router.push({
      pathname: "seller/purchase_req",
    });
  };

  const drivingRequest = () => {
    router.push({
      pathname: "seller/driving_req",
    });
  };

  return (
    // space between cards
    <div style={{display: 'flex', justifyContent: 'center', padding: '50px', gap: '45px'}}>
      <CustomReqCard
        imageSource="/seller_sales_image.jpg"
        icon={"/seller_cart_icon.svg"}
        text="Solicitudes de Compra"
        href="/providers/seller/purchase_req"
      />
      <CustomReqCard
        imageSource="/seller_tests_image.jpg"
        icon={"/seller_wheel_icon.svg"}
        text="Solicitudes de prueba de manejo"
        href="/providers/seller/driving_req"
      />
      {/* <Button onClick={purchaseRequest}>
        <img
          src="/seller_cart_icon.svg"
          alt="shopping cart"
        />
        <span style={{ fontSize: "20px", textAlign: "center" }}>Solicitudes de Compra</span>
      </Button>
      <Button onClick={drivingRequest}>
        <img
          src="/seller_wheel_icon.svg"
          alt="steering wheel"
        />
        <span style={{ fontSize: "20px", textAlign: "center" }}>Solicitudes de Prueba de Manejo</span>
      </Button> */}
    </div>
  )
}