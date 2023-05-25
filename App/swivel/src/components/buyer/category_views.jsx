import CustomTogglerBar from "../general/custom_toggler_bar";
import Link from "next/link";
import LocationsMap from "@/components/general/locations_map";
import { useRouter } from 'next/router'
import styles from '@/styles/category_views.module.css'
import { useEffect, useState } from "react";

// Selecting any item will actually 
// instance a filter in the catalog
// page and take you there.
export default function CategoryViews() {
  const router = useRouter()

  const [brands, setBrands] = useState([])

  const fetchBrands = async () => {
    const response = await fetch('http://localhost:3000/api/catalogoNuevo/marcas')
    const data = await response.json()
    console.log(data)

    setBrands(data.result)
  }

  
  useEffect(() => {
    fetchBrands()
  }, [])


  const components = [
    {
      name: 'Marcas', component: () =>
        <>
          <div className={styles.brands}>
            <div className={styles.brandsArray}>
              {brands.map((brand) => (
                <Link href={`/catalog?marca=${brand}`}>
                <div className={styles.brand}>
                  <img src={`/buyer/brands/${brand}.png?`} />
                  <span className={styles.brandName}>{brand}</span>
                </div>
                </Link>
              ))}
            </div>
            <div className={styles.moreBtn}>
              <Link href='/catalogo'>Ver más</Link>
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