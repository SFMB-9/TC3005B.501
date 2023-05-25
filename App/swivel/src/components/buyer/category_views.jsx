import CustomTogglerBar from "../general/custom_toggler_bar";
import Link from "next/link";
import LocationsMap from "@/components/general/locations_map";
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
                <img src='https://logos-world.net/wp-content/uploads/2021/03/Audi-Symbol.png' />
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
                <img src='https://logosmarcas.net/wp-content/uploads/2021/04/Jaguar-Logo.png' />
                <span className={styles.brandName}>Jaguar</span>
              </div>
              <div className={styles.brand}>
                <img src='/buyer/brands/mercedes.png' />
                <span className={styles.brandName}>Mercedes</span>
              </div>
              <div className={styles.brand}>
                <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEBISFRISFRcQEBAVFhAQExcPFREWFxUVFRcYHSghGBolGxUYIj0hJikrLi4wFx8zODMsNyovLi0BCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcDBAYCCAH/xABLEAABAwIEAgUGCgYGCwAAAAABAAIDBBEFEiExBkETIlFhcQcygZGS0RRCUmKDk6GxwdIVIzNzgrNFU3K0wtMXJCUmQ1VjlKKy4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC8UREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEX4421KD9WF9QBtqe78SsUkhd3D7T4+5cfi3GrRIaegiNXUDQhhtCw/Pfzt2D1hB1753HmB4C59Z9y1ppLec9w8XZPusqsxzEprkYjinRHnR0IJcO5zm6g+Llyk9RhFyfgdVO7m+aVoJ9Rcgvlkt/MkcfB5d+JXoVcrdnB3c4C/rba3qK+e3VeEHegnjPJ0UwLh3i+VTmD4o0EDD8Xmjd8WlrhnjJ+SHOJ+woLwhxVu0gyHtJuz2uXpAUgqro+NnwubFi0Hwcu0ZVsJkpHnTd28fp+xdrS1JjAMdnRnXICLWPOM7Dw2Pdugn0WKnna9oc03B9BB5gjke5ZUBERAREQEREBERAREQEXD48yop5Monl6OQkwvL3Eh25icTzGpHaAewkwL8Zqgf28vrQWsirGDGag7zSe0Vvw4lMd5ZPaKDv0XGQ1kh3kf7TlIQyOO7n+0/3oOjRQ8Y73+3J71mbF3v8Abk96CSWrI/MfmjbvPasfQDtf7cnvXHeUXFZAIcPpDapriY8w0MdKP2j+4m+U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u7rO+aNdr2BurUwPBIqVmWMEuNs8rrF7yO08h2AaBblJSsiYI4mhrGizWgWAWZAREQEREBERAREQEREBERAWGWkjcbujY49pa0n1kLMiDW+AQ/1UfsM9y8TYZE4WyNadw5oa1zXci0gaFbiIOaxCjDmmCqY17JBkuR+rkHZY+a75vquuDr+E6qka5tEGVdE65dhtQdWjW4gkO3gVb0sTXAtcA5p0LSAQR3gqLnwt7dYX3H9XISR/DJq4ekO9CD54xLh/C5XlvSTYbPreCqYejv8ANftb0rSPkyqXawVFHM3k5sw+5fQGIU7XjJVUpc3sdGKhhHi3NYeNlzVTwdgrz1oKdp7Gu6L7AQgqQeTCrGsstJG3m50zfcslLw1hsLgJ6t1XLypqNhkJPZm2+1WnFwXgrDcQwE9jpC/7C5dBhlHDEMtHSWHLoohEPbdlafWg4XC+G6uoZ0QjbhtCfOiZZ1VK3W+d480H37rucHwuKnYKWiiAy7gaBt/jyu7T6zy7VLwYRK/WZwjb8iMkvI75CBl/hF+xymaWmZG3LG0NbvYczzJPMntOpQadFg8TG9drZHu1fI5rSXHuv5rRyHL1lZ/0dD/Uxewz3LaRBrMoIQQRFGCNQQxgIPcbLZREBERAREQEREBERAREQEREBERAREQEREBERAXl8YO4B8QCvSIPDImjZoHgAF7REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z' />
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
                <img src='/buyer/brands/volkswagen.png' />
                <span className={styles.brandName}>Volkswagen</span>
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