import CustomTogglerBar from "../general/custom_toggler_bar";
import { Pagination } from '@mui/material';
import Link from "next/link";
import LocationsMap from "@/components/general/locations_map";
import { useRouter } from 'next/router'
import styles from '@/styles/category_views.module.css'
import { useEffect, useState } from "react";

// Selecting any item will actually 
// instance a filter in the catalog
// page and take you there.
export default function CategoryViews({brandItems, typeItems, yearItems}) {
  const router = useRouter()

  const [brands, setBrands] = useState([])
  const [types, setTypes] = useState([])
  const [years, setYears] = useState([])
  const [brandCurrentPage, setBrandCurrentPage] = useState(1);
  const [typeCurrentPage, setTypeCurrentPage] = useState(1);
  const [yearCurrentPage, setYearCurrentPage] = useState(1);

  const fetchBrands = async () => {
    const response = await fetch('/api/catalogoNuevo/marcas')
    const data = await response.json()
    console.log("data", data)

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

  let totalPagesBrands;
  if (brands)
  {
    totalPagesBrands = Math.ceil(brands.length / brandItems);
  }
  else
  {
    totalPagesBrands = 1;
  }

  let totalPagesTypes;
  if (types)
  {
    totalPagesTypes = Math.ceil(types.length / typeItems);
  }
  else
  {
    totalPagesTypes = 1;
  }

  let totalPagesYears;
  if (years)
  {
    totalPagesYears = Math.ceil(years.length / yearItems);
  }
  else
  {
    totalPagesYears = 1;
  }


  // Function that handles the page change
  const handleBrandPageChange = (event, page) => {
    // Set the current page
    setBrandCurrentPage(page);
    setTypeCurrentPage(1);
    setYearCurrentPage(1);
  };

  const handleTypePageChange = (event, page) => {
    // Set the current page
    setTypeCurrentPage(page);
    setBrandCurrentPage(1);
    setYearCurrentPage(1);
  };

  const handleYearPageChange = (event, page) => {
    // Set the current page
    setYearCurrentPage(page);
    setBrandCurrentPage(1);
    setTypeCurrentPage(1);
  };

  // // Calculate the start and end index of the items to show
  const startIndex = (brandCurrentPage - 1) * brandItems;
  const endIndex = startIndex + brandItems;

  const startIndexTypes = (typeCurrentPage - 1) * typeItems;
  const endIndexTypes = startIndexTypes + typeItems;

  const startIndexYears = (yearCurrentPage - 1) * yearItems;
  const endIndexYears = startIndexYears + yearItems;

  // // Slice the catalog data to get the items to show
  let itemsToShowBrand;
  if (brands)
  {
    itemsToShowBrand = brands.slice(startIndex, endIndex);
  }
  else
  {
    itemsToShowBrand = [];
  }

  let itemsToShowType;
  if (types)
  {
    itemsToShowType = types.slice(startIndexTypes, endIndexTypes);
  }
  else
  {
    itemsToShowType = [];
  }

  console.log("itemsToShowType", itemsToShowType)
  let itemsToShowYear;
  if (years)
  {
    itemsToShowYear = years.slice(startIndexYears, endIndexYears);
  }
  else
  {
    itemsToShowYear = [];
  }

  const components = [
    {
      name: 'Marcas', component: () => (brands ?
        <>
          <div className={styles.brands}>
            <div className={styles.brandsArray}>
              {itemsToShowBrand.map((brand) => (
                <Link href={`/catalog?marca=${brand}`}>
                  <div className={styles.brand}>
                    <img src={`/buyer/brands/${brand}.png?`} />
                    <span className={styles.brandName}>{brand}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={totalPagesBrands} // you need to calculate the total number of pages for each category
            page={brandCurrentPage}
            onChange={handleBrandPageChange}
          />
        </> : <p>
          Cargando marcas...
        </p>)
    },
    {
      name: 'Tipos', component: () =>
        <>
          <div className={styles.types}>
            <div className={styles.typesArray}>
              {itemsToShowType.map((type) => (
                <Link href={`/catalog?tipo=${type}`}>
                  <div className={styles.type}>
                    <img src={`/buyer/types/${type}.png?`} />
                    <span className={styles.typeName}>{type}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={totalPagesTypes} 
            page={typeCurrentPage}
            onChange={handleTypePageChange}
          />
        </>
    },
    {
      name: 'Años', component: () =>
        <>
          <div className={styles.yearsArray}>
            {itemsToShowYear.map((year) => (
              <Link href={`/catalog?year=${year}`}>
                <span className={styles.yearName}>{year}</span>
              </Link>
            ))}
          </div>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={totalPagesYears}
            page={yearCurrentPage}
            onChange={handleYearPageChange}
          />
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