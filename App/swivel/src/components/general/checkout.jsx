// pages/checkout.js
import { getStripe } from '@/utils/stripe';
import { Button } from "@mui/material";
import axios from "axios";

const CheckoutPage = (props) => {
  const body = JSON.stringify({items: JSON.stringify(props.items), id: props.id});
  const handleClick = async () => {
    await axios.put('/api/DrivingRequestsSeller/updateRequestStatus', {
      _id: props.id,
      status: 'pagoPendiente'
      });
    const stripe = await getStripe();
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <Button
    variant="contained"
    sx={{
      fontFamily: "Lato",
      width: 150,
      ":hover": {
        backgroundColor: "#F68E70",
      },
    }}
    disableElevation
    disabled={!props.validatedDocs}
    type="button"
    onClick={handleClick}
  >
    Proceder al Pago
  </Button>
  );
};

export default CheckoutPage;
