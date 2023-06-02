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
  const [types, setTypes] = useState([])
  const [years, setYears] = useState([])

  const fetchBrands = async () => {
    const response = await fetch('/api/catalogoNuevo/marcas')
    const data = await response.json()
    console.log(data)

    setBrands(data.result)
  }

  const fetchTypes = async () => {
    const response = await fetch('/api/catalogoNuevo/tipos')
    const data = await response.json()
    console.log(data)

    setTypes(data.result)
  }

  const fetchYears = async () => {
    const response = await fetch('/api/catalogoNuevo/years')
    const data = await response.json()
    console.log(data)

    setYears(data.result)
  }
  
  useEffect(() => {
    fetchBrands()
    fetchTypes()
    fetchYears()
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
              {types.map((type) => (
                <Link href={`/catalog?tipo=${type}`}>
                <div className={styles.type}>
                  <img src={`/buyer/types/${type}.png?`} />
                  <span className={styles.typeName}>{type}</span>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </>
    },
    {
      name: 'Años', component: () =>
        <>
          <div className={styles.yearsArray}>
            {years.map((year) => (
              <Link href={`/catalog?year=${year}`}>
                <span className={styles.yearName}>{year}</span>
              </Link>
            ))}
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