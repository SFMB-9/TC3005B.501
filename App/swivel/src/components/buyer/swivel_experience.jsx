import styles from '@/styles/swivel_experience.module.css'

export default function SwivelExperience() {
  return(
    <>
    <div className={styles.container}>
      <div className={styles.section}>
        <img src='/buyer/exp1.png'/>
        <div className={styles.content1}>
          <h1>La experiencia SWIVEL</h1>
          <span>
            Con SWIVEL, ahora es más fácil adquirir un auto de manera digital. En unos pocos clics, podrás encontrar el auto de tus sueños utilizando filtros, recomendaciones o nuestro quiz. 
            Realizar compras en SWIVEL es seguro, simple y rápido. ¡Inténtalo ya!
          </span>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.content2}>
          <h1>¿No te puedes decidir?</h1>
          <span>
            Con SWIVEL, ahora es más fácil adquirir un auto de manera digital. En unos pocos clics, podrás encontrar el auto de tus sueños utilizando filtros, recomendaciones o nuestro quiz. 
            Realizar compras en SWIVEL es seguro, simple y rápido. ¡Inténtalo ya!
          </span>
        </div>
        <img src='/buyer/exp2.png'/>
      </div>
    </div>
    </>
  )
}