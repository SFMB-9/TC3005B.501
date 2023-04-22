/*
Salvador Federico Milanes Braniff
18-04-2023

Searchbar es el componente de búsqueda de la barra de navegación.
Es reacriva y se ajusta a la pantalla de forma dinámica.
*/
import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "@/styles/searchbar.module.css";

export default function Searchbar({ onSearch, leftItem, placeholderText = 'Buscar', rightItem }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearching(true);
  };

  useEffect(() => {
    if (searching) {
      setSearching(false);
    }
  }, [searching]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchbar_container}>
        {leftItem && <div className={styles.searchbar_left_item}>{leftItem}</div>}
        <div className={styles.searchbar_box}>
          <input
            className={styles.searchbar}
            variant="outlined"
            size="small"
            placeholder={placeholderText}
            value={search}
            onChange={handleSearch}
          />
          <Image src="/searchbar_search_icon.svg" alt="search" width={30} height={30} className={styles.searchbar_icon} />
        </div>
        {rightItem && <div className={styles.searchbar_right_item}>{rightItem}</div>}
      </div>
    </div>
  );
}