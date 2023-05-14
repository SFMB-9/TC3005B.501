import { signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import React, {useEffect } from "react";

export default function SellerLandingPage({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  
  useEffect(() => {}, [session]);

  if(session) {console.log('alohaa', session.id);}

  const purchaseRequest = (seller_id) => {
        router.push({
        pathname: './purchase_req',
        query: {seller_id},
        });
  };


  const drivingRequest = (seller_id) => {
        router.push({
        pathname: './driving_req',
        query: {seller_id},
        });
  };


  return (
    <>
    {session ? (
      <div>
        <h5>Perfil</h5>
        <li>
          <a href="/auth/change_password">Cambiar Contraseña</a>
        </li>
        <li>
          <a
            href="#"
            onClick={() =>
              signOut({ callbackUrl: "http://localhost:3000/auth/login" })
            }
          >
            Logout
          </a>
        </li>
      </div>
    ) : (
      <div>Loading...</div>
    )}
    <div style={{ padding: "200px" }}>
      <button onClick={() => purchaseRequest(session.id)} type="button" style={{ padding: "50px", margin: "50px" }}>
        Solicitudes de Compra
      </button>
      <button onClick={() => drivingRequest(session.id)} type="button" style={{ padding: "50px", margin: "50px" }}>
        Solicitudes de Prueba de Manejo
      </button>
    </div>
  </>
);

}