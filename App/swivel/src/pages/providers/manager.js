import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ManagerLanding({ children }) {

  const router = useRouter();

  const routManejoVendedores = () => {
    router.push({
      pathname: "/providers/manager/manejo-vendedores"
    });
  };

  const routGestionAgencia = () => {
    router.push({
      pathname: "/providers/manager/gestion-agencia"
    });
  };

  const routManagerCatalog = () => {
    // Navigate to the manager catalog page
    router.push({
      pathname: '/providers/manager/catalog',
    })
  };
  
  const routPasswordChange = () => {
    // Navigate to the manager catalog page
    router.push({
      pathname: '/auth/change_password',
    })
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
          <a href="#" onClick={routPasswordChange}>Cambiar Contraseña</a>
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
        <button type="button" style={{ padding: "50px", margin: "50px" }} onClick={routManagerCatalog}>
         Manejo de Catálogo 
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }} onClick={routManejoVendedores}>
          Manejo de Vendedores 
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }} onClick={routGestionAgencia}>
          Admin de Agencias 
        </button>
      </div>
    </>
  );
}