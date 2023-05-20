
import CustomTogglerBar from "../general/custom_toggler_bar";
import Catalog from "@/pages/catalog";
import Link from "next/link";
import LocationsMap from "@/components/buyer/locations_map";
import { useRouter } from 'next/router'
import styles from '@/styles/category_views.module.css'

// Selecting any item will actually 
// instance a filter in the catalog
// page and take you there.
export default function CategoryViews() {
  const router = useRouter()

  const components = [
    {
      name: 'Marcas', component: () =>
        <>
          <div className={styles.brands}>
            <div className={styles.brandsArray}>
              <div className={styles.brand}>
                <img src='/buyer/brands/alfa_romeo.png' />
                <span className={styles.brandName}>Alfa Romeo</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/audi.png' />
                <span className={styles.brandName}>Audi</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/bmw.png' />
                <span className={styles.brandName}>BMW</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/ferrari.png' />
                <span className={styles.brandName}>Ferrari</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/fiat.png' />
                <span className={styles.brandName}>Fiat</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/jaguar.png' />
                <span className={styles.brandName}>Jaguar</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/mercedes.png' />
                <span className={styles.brandName}>Mercedes</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/mini.png' />
                <span className={styles.brandName}>Mini</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/porsche.png' />
                <span className={styles.brandName}>Porsche</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/renault.png' />
                <span className={styles.brandName}>Renault</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/suzuki.png' />
                <span className={styles.brandName}>Suzuki</span>
              </div>
              <div className={styles.brand}>
                <Link href={{
                  pathname: '/catalogo',
                  query: {
                    marca: 'Volkswagen'
                  }
                }}>
                  <img src='/buyer/brands/volkswagen.png' />
                  <span className={styles.brandName}>Volkswagen</span>
                </Link>
              </div>
            </div>
            <div className={styles.moreBtn}>
              <Link href='/catalog'>Ver más</Link>
            </div>
          </div>
        </>
    },
    {
      name: 'Tipos', component: () =>
        <>
          <div className={styles.types}>
            <div className={styles.typesArray}>
              <div className={styles.type}>
                <img src='/buyer/types/micro.png' />
                <span className={styles.typeName}>Micro</span>
              </div>
              <div className={styles.type}>
                <img src='/buyer/types/sedan.png' />
                <span className={styles.typeName}>Sedán</span>
              </div>
              <div className={styles.type}>
                <img src='/buyer/types/suv.png' />
                <span className={styles.typeName}>SUV</span>
              </div>
              <div className={styles.type}>
                <img src='/buyer/types/convertible.png' />
                <span className={styles.typeName}>Convertible</span>
              </div>
              <div className={styles.type}>
                <img src='/buyer/types/hybrid.png' />
                <span className={styles.typeName}>Híbrido</span>
              </div>
              <div className={styles.type}>
                <img src='/buyer/types/sport.png' />
                <span className={styles.typeName}>Deportivo</span>
              </div>
            </div>
          </div>
        </>
    },
    {
      name: 'Años', component: () =>
        <>
          <div className={styles.yearsArray}>
            <span className={styles.yearName}>2007</span>
            <span className={styles.yearName}>2008</span>
            <span className={styles.yearName}>2009</span>
            <span className={styles.yearName}>2010</span>
            <span className={styles.yearName}>2011</span>
            <span className={styles.yearName}>2012</span>
            <span className={styles.yearName}>2013</span>
            <span className={styles.yearName}>2014</span>
            <span className={styles.yearName}>2015</span>
            <span className={styles.yearName}>2016</span>
            <span className={styles.yearName}>2017</span>
            <span className={styles.yearName}>2018</span>
            <span className={styles.yearName}>2019</span>
            <span className={styles.yearName}>2020</span>
            <span className={styles.yearName}>2021</span>
            <span className={styles.yearName}>2022</span>
            <span className={styles.yearName}>2023</span>
            <span className={styles.yearName}>2024</span>
            <span className={styles.yearName}>2025</span>
          </div>

        </>
    },
    {
      name: 'Ubicaciones', component: () =>
        <>
          <LocationsMap />
        </>
    },
  ]
  return (
    <div>
      <CustomTogglerBar
        components={components}
        stretched
        dark
        tall
      />
    </div>
  )
}