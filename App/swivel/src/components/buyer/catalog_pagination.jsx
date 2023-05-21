/*
Ana Paula Katsuda Zalce

20-05-2023

Component that shows the catalogue grid and handles the pagination.
*/

// Library imports
import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';

// Component imports
import CatalogGrid from './catalog_grid';

// Function that handles the pagination, accepts the catalog data and the number of items per page
export default function CatalogPagination({ catalogData, itemsPerPage }) {
  // State that holds the current page
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the total number of pages based on the number of items per page
  const totalPages = Math.ceil(catalogData.length / itemsPerPage);

  // Function that handles the page change
  const handlePageChange = (event, page) => {
    // Set the current page
    setCurrentPage(page);
  };

  // Calculate the start and end index of the items to show
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the catalog data to get the items to show
  const itemsToShow = catalogData.slice(startIndex, endIndex);

  // Reset the current page when the catalog data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [catalogData]);

  return (
    <div>
      <CatalogGrid carListing={itemsToShow} />
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};
