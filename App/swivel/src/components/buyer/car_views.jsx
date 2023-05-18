import styles from '@/styles/car_views.module.css'
import CustomTogglerBar from '../general/custom_toggler_bar'

export default function CarViews() {
  const components = [
    {name: 'Revisados recientemente', component: () => <>recent get</>},
    {name: 'Populares', component: () => <>popular get</>},
    {name: 'Recomendaciónes', component: () => <>recomendation get</>},
  ]
  return(
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>Ver autos</h1>
        <CustomTogglerBar
          components={components}
          dark
          stretched
        />
      </div>
    </>
  )
}