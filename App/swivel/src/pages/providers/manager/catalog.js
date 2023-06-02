/*
Ana Paula Katsuda Zalce
Salvador Federico Milanes Braniff
Sebastián González Villacorta
Diego Corrales Pinedo
18-05-2023

Catalogo de vehiculos de agencia, con sidebar 
de filtros y searchbar que emplearía elastic 
search.
*/

import React, { useState, useEffect,useMemo } from "react";
import { Grid, Checkbox, FormControlLabel, Typography, IconButton, Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

import ManagerLayout from "@/components/buyer/layout";
import CatalogPagination from "@/components/buyer/catalog_pagination";
import SortCatalog from "@/components/buyer/sort_catalog";
import styles from "@/styles/catalog.module.css";
import { useRouter } from "next/router";
import Searchbar from "@/components/general/searchbar";

import DataTable from "@/components/general/Table";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Catalog() {
  const router = useRouter();
  const [searchText, setSearchText] = useState(null);

  let isFirstLoad = true;

  console.log("Search text: " + searchText);

  useEffect(() => {
    if (isFirstLoad) {
      if (JSON.stringify(router.query.searchQuery)) {
        setSearchText(router.query.searchQuery);
      }
      isFirstLoad = false;
    }
  }, []);

  // Filter variables
  const [filterHeaders, setFilterHeaders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [expandedMenuItems, setExpandedMenuItems] = useState({});
  const [selectedChips, setSelectedChips] = useState([]);
  const [deletingCarIds, setDeletingCarIds] = useState([]);

  // Data variables
  const [apiData, setApiData] = useState(null);
  const [catalogData, setCatalogData] = useState([]);

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
    if (JSON.stringify(router.query.searchQuery) && searchText === null) {
      setSearchText(router.query.searchQuery);
      queryString = "search=" + router.query.searchQuery + "="
    }
    Object.entries(query).forEach(([category, items]) => {
      if (items.length) {
        queryString += `${queryString ? "&" : ""}${category}=${items.join(",")}`;
      }
    });

    console.log('qst',queryString)
    return queryString;
  };

  const fetchFilters = async () => {
    if (router.query.marca) {
      const query = router.query.marca;
      removeQueryParam("marca");
      if (!selectedFilters.includes(`marca:${query}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`marca:${query}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category: "marca", value: query };
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

    if (router.query.tipo) {
      const query = router.query.tipo;
      removeQueryParam("tipo");
      if (!selectedFilters.includes(`tipo_vehiculo:${query}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`tipo_vehiculo:${query}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category: "tipo_vehiculo", value: query };
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

    if (router.query.year) {
      const query = router.query.year;
      removeQueryParam("year");
      if (!selectedFilters.includes(`ano:${query}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`ano:${query}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category: "ano", value: query };
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

    if (router.query.searchQuery) {
      const query = router.query.searchQuery;
      removeQueryParam("searchQuery");
      if (!selectedFilters.includes(`search=${query}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`search=${query}`);
          return newSelectedFilters;
        });
      }
    }

    console.log("Selected Filters:" + selectedFilters);
    let queryString = buildQuery(selectedFilters);
    console.log('yooo', queryString)

    const response = await fetch(
      `/api/catalogoNuevo/filter?${queryString}`
    );

    const data = await response.json();

    setFilterHeaders(data.filterHeaders);
    setFilters(data.filters);
    setCatalogData(data.result);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchFilters();
    }
  }, [selectedFilters, router.isReady]);

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
          ));
      } else {
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

  const handleUncheckAllFilters = () => {
    setSelectedFilters([]);
    setSelectedChips([]);
    setExpandedMenuItems({});
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

  const handleNoSort = () => {
    setCatalogData(apiData.result);
  };

  const handleSortByAscPrice = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return a._source.precio - b._source.precio; // Sort in ascending order
    });
    setCatalogData(sortedData);
  };

  const handleSortByDescPrice = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return b._source.precio - a._source.precio; // Sort in descending order
    });
    setCatalogData(sortedData);
  };

  const handleSortByAscModel = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return a._source.modelo.localeCompare(b._source.modelo); // Sort in ascending order
    });
    setCatalogData(sortedData);
  };

  const handleSortByDescModel = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return b._source.modelo.localeCompare(a._source.modelo); // Sort in descending order
    });
    setCatalogData(sortedData);
  };

  const handleSelectedSortOption = (selectedOption) => {
    if (selectedOption === "price-asc") {
      handleSortByAscPrice();
    } else if (selectedOption === "price-des") {
      handleSortByDescPrice();
    } else if (selectedOption === "model-asc") {
      handleSortByAscModel();
    } else if (selectedOption === "model-des") {
      handleSortByDescModel();
    } else if (selectedOption === "restart") {
      handleNoSort();
    }
  };

  const viewCreateCar = () => {
    // Navigate to the page to create cars
    router.push({
      pathname: '/providers/manager/new_car',
      query: {},
    })
  };

  const viewEditCar = (auto_id) => {
    // Navigate to the page to create cars
    router.push({
      pathname: '/providers/manager/edit_car',
      query: { auto_id },
    })
  };

  const deleteCar = async (auto_id) => {
    setDeletingCarIds([...deletingCarIds, auto_id]);
    // Delete car from elastic
    await fetch(`/api/catalogo-gerente/borrar-auto-elastic?auto_id=${auto_id}`,
      { method: 'DELETE' });
  };

  const columns = useMemo( ()=> [
    {
      field: "imagen",
      headerName: "Imagen",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        let cell = params.row._source.fotos_3d[0]
          ? <img src={params.row._source.fotos_3d[0]} height="50" width="60" />
          : "Este proceso no contiene imagen";
        return cell;
      },
    },
    {
      field: "modelo",
      headerName: "Modelo",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 2,
      valueGetter: (params) => {
        let cell = params.row._source.modelo
          ? `${params.row._source.modelo}`
          : "No contiene modelo";
        return cell;
      },
    },
    {
      field: "marca",
      headerName: "Marca",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 2,
      valueGetter: (params) => {
        let cell = params.row._source.marca
          ? `${params.row._source.marca}`
          : "No contiene marca";
        return cell;
      },
    },
    {
      field: "año",
      headerName: "Año",
      headerAlign: "center",
      align: "center",
      type: "number",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row._source.año
          ? params.row._source.año
          : 0;
        return cell;
      },
    },
    {
      field: "precio",
      headerName: "Precio",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      type: "number",
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row._source.precio
          ? params.row._source.precio
          : 0;
        return cell;
      },
    },
    {
      field: "botones",
      headerName: "",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      type: "actions",
      renderCell: (params) => (
        // <Button
        //   variant="contained"
        //   disableElevation
        //   onClick={() =>
        //     viewRequest(params.row._id, params.row.usuario_final_id)
        //   }
        //   className="py-0"
        //   sx={{
        //     fontFamily: "Lato",
        //     fontSize: "12px",
        //     backgroundColor: "#111439",
        //   }}
        // >
        //   Ver detalles
        // </Button>
        <>

        <IconButton aria-label="delete" size="small" onClick={() => viewEditCar(params.row._id)} disabled={deletingCarIds.includes(params.row._id)}>
          <DriveFileRenameOutlineIcon />
        </IconButton>

        <IconButton aria-label="delete" size="small" onClick={() => deleteCar(params.row._id)} disabled={deletingCarIds.includes(params.row._id)}>
          <DeleteOutlineIcon />
        </IconButton>
        </>
      ),
    },
  ], [catalogData]);

  return (
    <>
      <ManagerLayout>
        <Grid container sx={
          {
            paddingLeft: "3%",
            paddingRight: "1%"
          }
        } >
          <Grid item xs={12} md={3} sm={4}>
            <div className={styles.filterContainer}>
              <div className={styles.filterHeader}>
                <div className={styles.filterTitle}>
                  <div className={styles.iconWrapper}>
                    <FilterListIcon className={styles.filterListIcon} />
                  </div>
                  <span>Filtros</span>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    variant="text"
                    onClick={handleUncheckAllFilters}
                    sx={{
                      textDecoration: "underline",
                      textAlign: "right",
                      justifyContent: "flex-end",
                    }}
                  >
                    Eliminar filtros
                  </Button>
                </div>
              </div>
              <div className={styles.filterBody}>
                {/* Chips go here */}
              </div>
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
          <Grid item xs={12} md={9} sm={8}>
            {/*
                Pasar la función fetchSearch como prop al componente Searchbar
                // para que se ejecute cuando se presione el botón de búsqueda
              */}
            <Searchbar
              firstValue={searchText}
              placeholderText={'Buscar...'}
              setState={setSelectedFilters}
            />
            <div>
              <div className={styles.catalogHeader}>
                <span className="justify-content-start align-items-center">
                  <Typography color="text.secondary" sx={{
                    fontFamily: "Lato",
                  }}>
                    Mostrando&nbsp;
                    {
                      catalogData !== undefined ? Intl.NumberFormat().format(catalogData.length) : 0
                    }
                    &nbsp;resultados
                  </Typography>
                </span>
                <span className="d-flex align-items-center">
                  <span style={{
                    marginRight: "1rem"
                  }}>Ordenar por </span><SortCatalog handleSortOption={handleSelectedSortOption} />
                </span>
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
                {catalogData ? (
                  <div className="section">
                    <div className="pt-4">
                      <DataTable
                        columns={columns}
                        rows={catalogData}
                        rowSelection={false}
                        sx={{
                          border: 1,
                          borderColor: "#D9D9D9",
                          "& .MuiDataGrid-cell": {
                            border: 1,
                            borderRight: 0,
                            borderTop: 0,
                            borderLeft: 0,
                            borderColor: "#D9D9D9",
                            fontFamily: "Lato",
                            fontWeight: 500,
                            fontSize: "12px",
                            color: "#333333",
                          },
                          "& .MuiDataGrid-columnHeaders": {
                            fontFamily: "Lato",
                            fontSize: "16px",
                            color: "#333333",
                            borderBottom: 0,
                          },
                          "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: 800,
                          },
                          "& .MuiPaginationItem-text": {
                            fontFamily: "Lato",
                            color: "#333333",
                          },
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2>No se econtraron autos.</h2>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </ManagerLayout>
    </>
  );
};