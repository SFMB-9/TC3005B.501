/*
Ana Paula Katsuda Zalce
Salvador Federico Milanes Braniff
Sebastián González Villacorta
18-04-2023

Catalogo de vehiculos, con sidebar de filtros
y searchbar que emplearía elastic search.
*/
import React, { useState, useEffect } from 'react';
import { Grid, Chip } from '@mui/material';
import Searchbar from '@/components/ui/searchbar';
import LandingPageLayout from '@/components/landing_page_layout';
import CatalogGrid from '@/components/catalog_grid';
import styles from '@/styles/catalog.module.css';
import ApiDataDisplay from '@/components/api_data_display';

export default function Catalog() {
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [catalogData, setCatalogData] = useState([]);
  const [rawJson, setRawJson] = useState(null);
  const [expandedMenuItems, setExpandedMenuItems] = useState({});

  const fetchFilters = async () => {
    const queryString = selectedFilters.length
      ? `?${selectedFilters.map(filter => filter.replace('modelos', 'modelo')).join("&")}`
      : "";
    const response = await fetch(
      `http://localhost:3000/api/catalogo/buscar-autos${queryString}`
    );
    const data = await response.json();
    setFilters(data.filters);
    setApiData(data);
    setCatalogData(data.result);
    setRawJson(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    fetchFilters();
  }, [selectedFilters]);

  const handleMenuItemClick = (category, item) => {
    event.stopPropagation();
    setExpandedMenuItems(prevExpandedMenuItems => ({
      ...prevExpandedMenuItems,
      [category]: {
        ...prevExpandedMenuItems[category],
        [item]: !prevExpandedMenuItems[category]?.[item],
      }
    }));

    setSelectedFilters(prevSelectedFilters => {
      const newSelectedFilters = [...prevSelectedFilters];
      if (expandedMenuItems[category]?.[item]) {
        const filterIndex = newSelectedFilters.indexOf(`${category}=${item}`);
        if (filterIndex > -1) {
          newSelectedFilters.splice(filterIndex, 1);
        }
        setSelectedChips(prevSelectedChips => prevSelectedChips.filter(chip => chip.category !== category || chip.value !== item));
      } else {
        // remove any existing filter for this category
        newSelectedFilters.filter(f => !f.startsWith(`${category}=`));
        // add the new filter if it's not null
        if (item) {
          newSelectedFilters.push(`${category}=${item}`);
          setSelectedChips(prevSelectedChips => {
            const newChip = { category, value: item };
            const isChipDuplicate = prevSelectedChips.find(chip => chip.category === newChip.category && chip.value === newChip.value);
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
      {subMenuItems.map(subMenuItem => (
        <li key={subMenuItem} className={styles.item}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={expandedMenuItems[category]?.[subMenuItem]}
              onChange={() => handleMenuItemClick(category, subMenuItem)}
            />
            <span className={styles.checkbox}></span>
            {subMenuItem}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <LandingPageLayout>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <div className={styles.filterContainer}>
              <div className={styles.filterTitle}>Filtros</div>
              {selectedChips.map((chip, index) => (
                <Chip
                  key={`${chip.category}-${chip.value}-${index}`}
                  label={`${chip.category}: ${chip.value}`}
                  onDelete={() => handleMenuItemClick(chip.category, chip.value)}
                  color="primary"
                  variant="outlined"
                  className={styles.filterChip}
                />
              ))}
              {filters && (
                <ul className={styles.filterList}>
                  {Object.entries(filters).map(([category, subMenuItems]) => (
                    <li key={category} className={styles.filterItem}>
                      <button className={styles.filterButton} onClick={() => handleMenuItemClick(category, null)}>{category}</button>
                      {expandedMenuItems[category]?.[null] && renderSubMenu(category, subMenuItems)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Searchbar />
            <div style={{
              padding: '3%',
              overflowY: 'scroll',
              maxHeight: '100vh',
            }}>
              <div style={{ fontSize: '20px', margin: '10px 0' }}>
                {`http://localhost:3000/api/catalogo/buscar-autos${selectedFilters.length ? `?${selectedFilters.join("&")}` : ""}`}
              </div>
              {/* <ApiDataDisplay apiData={apiData} /> */}
              <CatalogGrid carListing={catalogData}/>
            </div>
          </Grid>
        </Grid>
      </LandingPageLayout>
    </>
  );
}