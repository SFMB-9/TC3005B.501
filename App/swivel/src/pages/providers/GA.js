import GANavbar from '@/components/providers/GA/navbar'
import { useRouter } from 'next/router'

export default function GALandingPage() {
  const router = useRouter();

  const routToCatalogue = () => {
    router.push('/providers/GA/'); // <-- add your route
  };
  const routToAgencies = () => {
    router.push('/providers/GA/administracion-agencias');
  };
  const routToStatistics = () => {
    router.push('/providers/GA/'); // <-- add your route
  };  
  const routToGA = () => {
    router.push('/providers/GA/'); // <-- add your route
  };


  return (
    <>
      <GANavbar/>

      <div>
        <button onClick={routToCatalogue}>
          Manejo de catalogo
        </button>
        <button onClick={routToAgencies}>
          Administración de agencias
        </button>
        <button onClick={routToStatistics}>
          Estadísticas
        </button>
        <button onClick={routToGA}>
          Gestión deGA
        </button>
      </div>
    </>
  )
}