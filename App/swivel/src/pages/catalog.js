/*
Ana Paula Katsuda Zalce
Salvador Federico Milanes Braniff
18-04-2023

Catalogo de vehiculos, con sidebar de filtros
y searchbar que emplearía elastic search.
*/
import React, { useState } from 'react';
import { Grid, Chip } from '@mui/material';

import Searchbar from '@/components/ui/searchbar';
import LandingPageLayout from '@/components/landing_page_layout';

export default function Catalog() {
  const [filters, setFilters] = useState(['Chevrolet', 'Amarillo', '4 puertas']);

  const handleDelete = (index) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };

  return (
    <>
      <LandingPageLayout>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <div style={{ padding: '10px', borderRight: '1px solid lightgray', borderTop: '1px solid lightgray'}}>
              Agregar filtro
              {filters.map((filter, index) => (
                <Chip
                  key={index}
                  label={filter}
                  sx={{ marginRight: 1 }}
                  onDelete={() => handleDelete(index)}
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Searchbar />
            Aqui va el catalogo
          </Grid>
        </Grid>
      </LandingPageLayout>
    </>
  );
}