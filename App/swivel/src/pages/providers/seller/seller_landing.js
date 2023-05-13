import { signOut } from "next-auth/react";

export default function SellerLandingPage({ children }) {
  return (
    <>
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
      <div style={{ padding: "200px" }}>
        <button type="button" style={{ padding: "50px", margin: "50px" }}>
          Solicitudes de Compra
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }}>
          Solicitudes de Prueba de Manejo
        </button>
      </div>
    </>
  );
}
