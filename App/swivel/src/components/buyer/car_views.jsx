import styles from '@/styles/car_views.module.css'
import CustomTogglerBar from '../general/custom_toggler_bar'
import CarCard from './car_card'

export default function CarViews() {
  const components = [
    {name: 'Revisados recientemente', component: () => 
      <>
        <div className={styles.cards}>
          <CarCard/>
          <CarCard/>
          <CarCard/>
        </div>
      </>
    },
    {name: 'Populares', component: () => 
    <>
      <div className={styles.cards}>
        <CarCard/>
        <CarCard/>
        <CarCard/>
      </div>
    </>
    },
    {name: 'Recomendaciónes', component: () => 
    <>
      <div className={styles.cards}>
        <CarCard/>
        <CarCard/>
        <CarCard/>
      </div>
    </>},
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