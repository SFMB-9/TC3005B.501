import {
  Button,
} from "@mui/material";
import styles from '@/styles/swivel_experience.module.css'
import { Height } from "@mui/icons-material";

export default function SwivelExperience() {
  return(
    <>
    <div className={styles.container}>
      <div className={styles.section}>
        <img src='/buyer/exp1.png'/>
        <div className={styles.content1}>
          <h1>¿No te puedes decidir?</h1>
          <span>
            Con SWIVEL, ahora es más fácil adquirir un auto de manera digital. En unos pocos clicks, podrás encontrar el auto de tus sueños utilizando filtros o nuestra barra de navegación y elegir desde nuestra alta variedad de autos, modelos y agencias encontrando el auto que se adapta a ti. 
            Realizar compras en SWIVEL es seguro, simple y rápido. ¡Inténtalo ya!
          </span>
          <br />
          <Button
            variant="contained"
            type="submit"
            className="w-80"
            sx={{
              fontFamily: "Lato",
              ":hover": {
                backgroundColor: "#333333", },
              border: 'none',
              marginTop: '2.5rem',
              width: 'auto',
              alignItems: "center"
            }}
            href="/auth/signup"
          >
            <h5> Regístrate </h5>
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.content2}>
          <h1>¿Cuál es el auto para ti?</h1>
          <span>
            Busca a partir de tus necesidades, navega por nuestro amplio catálogo y utiliza nuestros filtros para acotar tu búsqueda. Una vez que hayas seleccionado el auto de tus sueños, elige el plan de financiamiento que se adapte a ti y haz tu primer pago. 
          </span>
          <br />
          <Button
            variant="contained"
            type="submit"
            className="w-80"
            sx={{
              fontFamily: "Lato",
              ":hover": {
                backgroundColor: "#333333", },
              border: 'none',
              marginTop: '2.5rem',
              width: 'auto',
              alignItems: "center"
            }}
            href="/"
          >
            <h5> Descubre el auto para ti </h5>
          </Button>
        </div>
        <img src='/buyer/exp2.png'/>
      </div>
    </div>
    </>
  )
}