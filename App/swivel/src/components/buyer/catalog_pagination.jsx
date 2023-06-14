/*
Ana Paula Katsuda Zalce

20-05-2023

Component that shows the catalogue grid and handles the pagination.
*/

// Library imports
import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import { Button } from "@mui/material";

// Component imports
import CatalogGrid from './catalog_grid';

// Function that handles the pagination, accepts the catalog data and the number of items per page
export default function CatalogPagination({ catalogData, itemsPerPage, carCardType }) {
  // State that holds the current page
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the total number of pages based on the number of items per page
  let totalPages;
  // State that holds the selected cars to compare
  const [carIds, setCarIds] = useState([]);

  const router = useRouter();

  if (catalogData !== undefined) {
    totalPages = Math.ceil(catalogData.length / itemsPerPage);
  }
  else {
    totalPages = 1;
  }

  // Function that handles the page change for the comparison
  const routToComparison = () => {
    if (carIds.length < 2 || carIds.length > 3) {
      alert(`${carIds.length}`);
      return;
    }
    router.push(`/buyer/comparar?ids=${carIds.join(",")}`);
  };

  // Function that handles the page change
  const handlePageChange = (event, page) => {
    // Set the current page
    setCurrentPage(page);
  };

  // Calculate the start and end index of the items to show
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the catalog data to get the items to show
  let itemsToShow;
  if (catalogData !== undefined) {
    itemsToShow = catalogData.slice(startIndex, endIndex);
  }
  else {
    itemsToShow = [];
  }

  // Reset the current page when the catalog data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [catalogData]);

  return (
    <div>
      {(carIds.length > 1 && carIds.length < 4) &&
        (<>
          <div 
            style={{
              position: 'absolute',
              zIndex: 1,
            }}
          >
            <Button
              variant="contained"
              className='mb-2'
              sx={{
                fontFamily: "Lato",
                ":hover": {
                  backgroundColor: "#F68E70",
                },
              }}
              disableElevation
              type="button"
              onClick={routToComparison}
            >
              Comparar productos
            </Button>
          </div>
        </>)
      }
      <CatalogGrid carListing={itemsToShow} cardType={carCardType} carIds={carIds} setCarIds={setCarIds} />
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};
