/*
Ana Paula Katsuda Zalce
Salvador Federico Milanes Braniff
Sebastián González Villacorta
18-04-2023

Catalogo de vehiculos, con sidebar de filtros
y searchbar que emplearía elastic search.
*/
import React, { useState, useEffect } from "react";
import { Grid, Chip, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Searchbar from "@/components/general/searchbar";
import LandingPageLayout from "@/components/buyer/buyer_layout";
import CatalogGrid from "@/components/buyer/catalog_grid";
import styles from "@/styles/catalog.module.css";
import { useRouter } from "next/router";
import ApiDataDisplay from "@/components/buyer/api_data_display";

export default function Catalog() {

  const router = useRouter();

  const [filterHeaders, setFilterHeaders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [catalogData, setCatalogData] = useState([]);
  const [expandedMenuItems, setExpandedMenuItems] = useState({});

  const buildQuery = (selectedFilters) => {
    let query = {};
    selectedFilters.forEach((filter) => {
      const [category, item] = filter.split(":");
      if (!query[category]) {
        query[category] = [];
      }
      query[category].push(item);
    });

    let queryString = "";
    Object.entries(query).forEach(([category, items]) => {
      if (items.length) {
        queryString += `${queryString ? "&" : ""}${category}=${items.join(",")}`;
      }
    });

    return queryString;
  };

  const fetchFilters = async () => {
    // let queryString = selectedFilters.length
    //   ? `?${selectedFilters
    //     .map((filter) => filter.replace("modelos", "modelo"))
    //     .join("&")}`
    //   : "";

    
    let queryString = buildQuery(selectedFilters);

    const response = await fetch(
      `http://localhost:3000/api/catalogoNuevo/filter?${queryString}`
    );

    const data = await response.json();
    
    if (router.query.marca) {
      removeQueryParam("marca");
      if (!selectedFilters.includes(`marca:${router.query.marca}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`marca:${router.query.marca}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category: "marca", value: router.query.marca };
            const isChipDuplicate = prevSelectedChips.find(
              (chip) =>
                chip.category === newChip.category &&
                chip.value === newChip.value
            );
            if (isChipDuplicate) {
              return prevSelectedChips;
            } else {
              return [...prevSelectedChips, newChip];
            }
          });
          return newSelectedFilters;
        });
      }
    }

    setFilterHeaders(data.filterHeaders);
    setFilters(data.filters);
    setApiData(data);
    setCatalogData(data.result);
  };

  useEffect(() => {
    fetchFilters();
  }, [selectedFilters]);

  const handleMenuItemClick = (category, item) => {
    event.stopPropagation();
    setExpandedMenuItems((prevExpandedMenuItems) => ({
      ...prevExpandedMenuItems,
      [category]: {
        ...prevExpandedMenuItems[category],
        [item]: !prevExpandedMenuItems[category]?.[item],
      },
    }));

    setSelectedFilters((prevSelectedFilters) => {
      const newSelectedFilters = [...prevSelectedFilters];
      if (expandedMenuItems[category]?.[item]) {
        const filterIndex = newSelectedFilters.indexOf(`${category}:${item}`);
        if (filterIndex > -1) {
          newSelectedFilters.splice(filterIndex, 1);
        }
        setSelectedChips((prevSelectedChips) =>
          prevSelectedChips.filter(
            (chip) => chip.category !== category || chip.value !== item
          )
        );
      } else {
        // remove any existing filter for this category
        //newSelectedFilters.filter((f) => { !f.startsWith(`${category}=`) });


        // add the new filter if it's not null
        if (item) {

          newSelectedFilters.push(`${category}:${item}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category, value: item };
            const isChipDuplicate = prevSelectedChips.find(
              (chip) =>
                chip.category === newChip.category &&
                chip.value === newChip.value
            );
            if (isChipDuplicate) {
              return prevSelectedChips;
            } else {
              return [...prevSelectedChips, newChip];
            }
          });
        }
      }
      return newSelectedFilters;
    });
  };


  const renderSubMenu = (category, subMenuItems) => (
    <ul className={styles.filters}>
      {subMenuItems.map((subMenuItem) => (
        <li key={subMenuItem}>
          <FormControlLabel
            className={styles.label}
            control={
              <Checkbox
                size="small"
                checked={expandedMenuItems[category]?.[subMenuItem]}
                onChange={() => handleMenuItemClick(category, subMenuItem)}
              />
            }
            label={
              <Typography className={styles.labelText}>
                {subMenuItem}
              </Typography>
            }
          />
        </li>
      ))}
    </ul>
  );

  const removeQueryParam = (param) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace(
      { pathname, query: params.toString() },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <LandingPageLayout>
        <Grid container>
          <Grid item xs={12} sm={2}>
            <div className={styles.filterContainer}>
              <div className={styles.filterTitle}>Filtros</div>
              {selectedChips.map((chip, index) => (
                <Chip
                  key={`${chip.category}-${chip.value}-${index}`}
                  label={`${filterHeaders[chip.category]}: ${chip.value}`}
                  onDelete={() =>
                    handleMenuItemClick(chip.category, chip.value)
                  }
                  color="primary"
                  variant="outlined"
                  className={styles.filterChip}
                />
              ))}
              {filters && (
                <ul className={styles.filterList}>
                  {Object.entries(filters).map(([category, subMenuItems]) => (
                    <li key={category} className={styles.filterItem}>
                      <button
                        className={styles.filterButton}
                        onClick={() => handleMenuItemClick(category, null)}
                      >
                        {filterHeaders[category]}
                      </button>
                      {expandedMenuItems[category]?.[null] &&
                        renderSubMenu(category, subMenuItems)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={10}>
            {/*
              Pasar la función fetchSearch como prop al componente Searchbar
              // para que se ejecute cuando se presione el botón de búsqueda
            */}
            <Searchbar
              setState={setSelectedFilters}
            > </Searchbar>
            <div
              style={{
                padding: "3%",
                overflowY: "scroll",
                maxHeight: "100vh",
              }}
            >
              {/* <div style={{ fontSize: "20px", margin: "10px 0" }}>
                {`http://localhost:3000/api/catalogo/buscar-autos${selectedFilters.length ? `?${selectedFilters.join("&")}` : ""
                  }`}
              </div>
              <ApiDataDisplay apiData={apiData} /> */}
              <CatalogGrid carListing={catalogData} />
            </div>
          </Grid>
        </Grid>
      </LandingPageLayout>
    </>
  );
}