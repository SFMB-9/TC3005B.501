import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "@/styles/searchbar.module.css";

export default function Searchbar({  
  placeholderText = "Buscar...", 
  transparent = false, 
  hidden = false, 
  searchStyle = "default",
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  let containerClasses;

  const handleSubmit = (e) => {
    e.preventDefault();
    //const finalSearch = ["search=" + search];
    search.replace("+", " ");
    router.push({
      pathname: "/catalog",
      query: { searchQuery: search },
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (searchStyle === "default") {
    containerClasses = `${styles.searchbar_container} ${transparent ? styles.transparent : ''} ${hidden ? styles.hidden : ''}`;
  }
  else if (searchStyle === "administrative") {
    containerClasses = `${styles.customSearchbarContainer} ${transparent ? styles.transparent : ''} ${hidden ? styles.hidden : ''}`;
  }

  return (
    <div className={containerClasses}>
      <form onSubmit={handleSubmit} className={`${styles.searchbar_field} ${transparent ? styles.transparent : ''}`}>
        <input
          size="small"
          type="text"
          placeholder={placeholderText}
          value={search}
          onChange={handleSearch}
        />
        <button type="submit" className={styles.searchbar_icon}>
          <Image
            src="/searchbar_search_icon.svg"
            alt="search"
            width={30}
            height={30}
          />
        </button>
      </form>
    </div>
  );
}