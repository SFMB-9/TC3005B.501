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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

import Searchbar from "@/components/general/searchbar";
import LandingPageLayout from "@/components/buyer/landing_page_layout";
import CatalogGrid from "@/components/buyer/catalog_grid";
import ApiDataDisplay from "@/components/buyer/api_data_display";
import styles from "@/styles/catalog.module.css";

export default function Catalog() {
  const [filterHeaders, setFilterHeaders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [catalogData, setCatalogData] = useState([]);
  const [catalogColors, setCatalogColors] = useState([]);
  const [expandedMenuItems, setExpandedMenuItems] = useState({});

  const fetchFilters = async () => {
    let queryString = selectedFilters.length
      ? `?${selectedFilters
        .map((filter) => filter.replace("modelos", "modelo"))
        .join("&")}`
      : "";

    const response = await fetch(
      `http://localhost:3000/api/catalogoNuevo/buscar-auto${queryString}`
    );

    const data = await response.json();

    setFilterHeaders(data.filterHeaders);
    setFilters(data.filters);
    setApiData(data);
    setCatalogData(data.result);
    setCatalogColors(data.result.colors);
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
        const filterIndex = newSelectedFilters.indexOf(`${category}=${item}`);
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
        newSelectedFilters.filter((f) => !f.startsWith(`${category}=`));
        // add the new filter if it's not null
        if (item) {
          newSelectedFilters.push(`${category}=${item}`);
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

  return (
    <>
      <LandingPageLayout>
        <Grid container sx={
          {paddingLeft: "3%", 
          paddingRight: "3%"}
        } >
          <Grid item xs={12} md={3} sm={6}>
            <div className={styles.filterContainer}>
              <div className={styles.filterTitle}> 
                <div className={styles.iconWrapper}>
                  <FilterListIcon className={styles.filterListIcon} /> 
                </div>
                <span>Filtros</span>
              </div>
              {/* {selectedChips.map((chip, index) => (
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
              ))} */}
              {filters && (
                <ul className={styles.filterList}>
                  {Object.entries(filters).map(([category, subMenuItems]) => (
                    <li key={category} className={styles.filterItem}>
                      <button
                        className={styles.filterButton}
                        onClick={() => handleMenuItemClick(category, null)}
                      >
                        <div >
                          {filterHeaders[category]}
                          
                            <div className={styles.arrow}>
                            {expandedMenuItems[category]?.[null] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                            </div>
                    
                        </div>
                      </button>
                      {expandedMenuItems[category]?.[null] &&
                        renderSubMenu(category, subMenuItems)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={9} sm={6}>
            {/*
              Pasar la función fetchSearch como prop al componente Searchbar
              // para que se ejecute cuando se presione el botón de búsqueda
            */}
            <Searchbar
              setState={setSelectedFilters}
            > </Searchbar>
            <div>
              <div className={styles.catalogHeader}>
                <span className="justify-content-start">
                <Typography color="text.secondary">
                  Mostrando {Intl.NumberFormat().format(catalogData.length)} resultados
                </Typography>
                </span>
                {/* <span className="justify-content-end">
                  Ordenar por
                </span> */}
              </div>
              <div
                style={{
                  padding: "3%",
                  overflowY: "scroll",
                  maxHeight: "100vh",
                }}
              >
                {/* <div style={{ fontSize: "20px", margin: "10px 0" }}>
                  {`http://localhost:3000/api/catalogo/buscar-autos${
                    selectedFilters.length ? `?${selectedFilters.join("&")}` : ""
                  }`}
                </div>
                <ApiDataDisplay apiData={catalogData} /> */}
                <CatalogGrid carListing={catalogData} />
              </div>
            </div>
          </Grid>
        </Grid>
      </LandingPageLayout>
    </>
  );
}