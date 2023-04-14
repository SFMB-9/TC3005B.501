import { Navbar } from '@/components/navbar'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <div className={styles.landing_blob} style={{ backgroundImage: `url(/landing_orange_blob.svg)`, backgroundRepeat:'no-repeat', backgroundSize:'contain'}}/>
      <Navbar/>
      <div className='row' id='body-row'>
        <div>
          <Link href='/new_automotive_group/settings'>(Prueba) Nuevo Grupo Automotriz</Link>
        </div>
        <div>
          <Link href='/automotive_group/branches'>(Prueba) Acceso Grupo Automotriz</Link>
        </div>
      </div>
    </div>
  )
}