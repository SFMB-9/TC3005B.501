import { signOut } from "next-auth/react";
import { useRouter } from 'next/router';

export default function ManagerLanding({ children }) {
  const router = useRouter();

  const viewManagerCatalog = () => {
    // Navigate to the manager catalog page
    router.push({
      pathname: '/providers/manager/catalog',
    })
  };
  
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
        <button type="button" 
          style={{ padding: "50px", margin: "50px" }}
          onClick={() => viewManagerCatalog()}>
         Manejo de Catálogo 
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }}>
         Manejo de Vendedores 
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }}>
         Admin de Agencias 
        </button>
      </div>
    </>
  );
}