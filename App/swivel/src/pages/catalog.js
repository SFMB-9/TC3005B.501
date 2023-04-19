import React, { useState } from 'react';
import LandingPageLayout from '@/components/landing_page_layout';
import Searchbar from '@/components/ui/searchbar';
import { Grid, Chip } from '@mui/material';

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