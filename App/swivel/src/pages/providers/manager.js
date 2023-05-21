import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ManagerLanding({ children }) {

  const router = useRouter();

  const RoutManejoVendedores = () => {
    router.push({
      pathname: "/gerente/manejo-vendedores"
    });
  };

  const RoutGestionAgencia = () => {
    router.push({
      pathname: "/gerente/gestion-agencia"
    });
  };

  useEffect(() => {
    // You can perform any client-side logic here
    // This code will only execute in the browser environment
  }, []);

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
          Manejo de Catálogo 
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }} onClick={RoutManejoVendedores}>
          Manejo de Vendedores 
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }} onClick={RoutGestionAgencia}>
          Admin de Agencias 
        </button>
      </div>
    </>
  );
}