import React, { useState } from 'react';

export default function SortCatalog ({ handleSortOption}) {
    const [sortOption, setSortOption] = useState('default');
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="sort-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{
            backgroundColor: '#F55C7A',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            paddingInline: '1rem',
        }}>
                {sortOption}
            </button>
            <div className="dropdown-menu" aria-labelledby="sort-dropdown">
                <button className="dropdown-item" type="button" onClick={() => {handleSortOption('restart'); setSortOption('Reestablecer');}}>Reestablecer</button>
                <button className="dropdown-item" type="button" onClick={() => {handleSortOption('model-asc'); setSortOption('Modelo (alfabético ascendente)') }}>Modelo (alfabético ascendente)</button>
                <button className="dropdown-item" type="button" onClick={() => {handleSortOption('model-des'); setSortOption('Modelo (alfabético descendente)')}}>Modelo (alfabético descendente)</button>
                <button className="dropdown-item" type="button" onClick={() => {handleSortOption('price-asc'); setSortOption('Precio (ascendente)')}}>Precio (ascendente)</button>
                <button className="dropdown-item" type="button" onClick={() => {handleSortOption('price-des'); setSortOption('Precio (descendente)')}}>Precio (descendente)</button>
            </div>
        </div>
    );
};

