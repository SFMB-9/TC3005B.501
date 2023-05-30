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

import React, { useState, useEffect, useMemo } from "react";
import { Grid, Checkbox, FormControlLabel, Typography, IconButton, Button } from "@mui/material";
import Searchbar from "@/components/general/searchbar";
import ManagerLayout from "@/components/providers/manager/layout";
import styles from "@/styles/catalog.module.css";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable from "@/components/general/Table";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Catalog() {
  const [filterHeaders, setFilterHeaders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [catalogData, setCatalogData] = useState([]);
  const [expandedMenuItems, setExpandedMenuItems] = useState({});
  const [deletingCarIds, setDeletingCarIds] = useState([]);

  const router = useRouter();

  // Get agency name from session
  //const { data: session } = useSession();
  //const agencyName = session.nombre_agencia;
  const agencyName = "Kia";

  const fetchFilters = async () => {
    console.log("Fetching...");
    let queryString = selectedFilters.length
      ? `${selectedFilters
        .map((filter) => filter.replace("modelos", "modelo"))
        .join("&")}`
      : "";

    const response = await fetch(
      `http://localhost:3000/api/catalogo-gerente/buscar-auto-agencia?agencyName=${encodeURIComponent(agencyName)}&${queryString}`
    );

    const data = await response.json();

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

  const viewCreateCar = () => {
    // Navigate to the page to create cars
    router.push({
      pathname: '/providers/manager/carRegister',
      query: {},
    })
  };

  const viewEditCar = (auto_id) => {
    // Navigate to the page to create cars
    router.push({
      pathname: '/providers/manager/editar-auto',
      query: { auto_id },
    })
  };

  const deleteCar = async (auto_id) => {
    setDeletingCarIds([...deletingCarIds, auto_id]);
    // Delete car from elastic
    await fetch(`http://localhost:3000/api/catalogo-gerente/borrar-auto-elastic?auto_id=${auto_id}`,
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
          }}>
          <Grid item xs={12} md={3} sm={4}>
            <div className={styles.filterContainer}>
              <div className={styles.filterHeader}>
                <div
                  className={styles.filterTitle}
                >
                  <div className={styles.iconWrapper}>
                    <FilterListIcon className={styles.filterListIcon} />
                  </div>
                  <span>Filtros</span></div>
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
          <Grid item xs={12} md={9} sm={8}>
            {/*
              Pasar la función fetchSearch como prop al componente Searchbar
              // para que se ejecute cuando se presione el botón de búsqueda
            */}

            <div className="d-flex justify-content-between align-items-center">
              <div className="w-100">

              <Searchbar
                setState={setSelectedFilters}
              > </Searchbar>
              </div>

              <div>
<Button
                variant="contained"
                size="small"
                style={{minWidth: '110px'}}
                sx={{
                  fontFamily: "Lato",
                  ":hover": {
                    backgroundColor: "palevioletred",
                  },
                }}
                disableElevation
                type="button"
                onClick={() => viewCreateCar()}
              >
                Agregar Color
              </Button>

              </div>

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
              <ApiDataDisplay apiData={apiData} /> */}
              {/* <CatalogGrid carListing={catalogData} /> */}
              {/* Display listing of cars */}
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
          </Grid>
        </Grid>
      </ManagerLayout>
    </>
  );
}