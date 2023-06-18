# Catálogo de Autos Gerente

## Introducción

Este módulo es responsable por la visualización de todos los autos pertenecientes a la agencia del usuario gerente, como parte de su flujo. En este documento se describirá el diseño del módulo Catálogo Autos Gerente, incluyendo su funcionalidad, interfaces e implementación. Este documento tiene la finalidad de ser utilizado por desarrolladores y otros *stakeholders* que necesiten entender el propósito o funcionalidad de este módulo en el sistema.

Cabe notar que muchas de las imágenes utilizadas son de una versión de desarrollo de la aplicación, por lo que no reflejan completamente el estilo que tendrá la aplicación entregada. Además, los datos utilizados son únicamente de prueba.

## **Componentes y Módulos**

- Base de datos
    
    El catálogo se conecta a una instancia de Elasticsearch en la cual se almacenan los datos de todos los autos en un solo índice. La conexión en sí es manejada por la librería de Elasticsearch para Nodejs. 
    
    ![SSBDAutos.png](Cata%CC%81logo%20de%20Autos%20Gerente%20e22ac2ca51284d049de39820656786f9/SSBDAutos.png)
    

Solamente nos interesan los siguientes campos: 

- modelo, ano, precio, color, combustible, cantidad, motor, tipo_vehiculo: características del auto por las que se puede filtrar el catálogo.
- auto_id, modelo, ano, marca: características mostradas para cada auto del catálogo.
- auto_id: utilizado para borrar un auto del catálogo.

- Procesamiento de solicitudes
    
    Para el servidor se esta utilizando Node.js utilizando un protocolo de comunicación HTTPS por el cual se mandan requests de tipo REST a endpoints que establecen una conexión con Elasticsearch. En el caso del catálogo, únicamente se utilizan requests de tipo GET, siguiendo la siguiente estructura:
    
    …/catalogo-gerente/…
    
    Dependiendo del endpoint que se va a utilizar pueden seguir las siguientes rutas:
    
    /buscar-auto-agencia
    
    /borrar-auto-elastic
    

## **Interfaz de Usuario**

- Descripción de la interfaz de usuario

El propósito de esta página es darle al gerente una manera de visualizar todos los autos que tiene registrados en la plataforma, así como permitirle borrarlos, editarlos o agregar nuevos autos. Las funcionalidades agregar autos y editarlos se acceden a través de sus botones correspondientes, los cuales redirigen al usuario a otras páginas. La funcionalidad de borrado se realiza directamente desde esta página mediante su propio botón.

![SSCG1.png](Cata%CC%81logo%20de%20Autos%20Gerente%20e22ac2ca51284d049de39820656786f9/SSCG1.png)

La interfaz consiste de dos componentes principales: un listado con todos los autos de la agencia y un componente de filtrado para fácilmente encontrar el auto que se busque. El listado muestra información básica de cada uno de los autos, así como los botones para “Editar” y “Borrar”. Una vez se presiona el botón para borrar un auto sus botones se desabilitan y la eliminación se ve reflejada una vez se vuelve a cargar la página. Abajo se muestra cómo se ve un auto borrado ántes de recargar la página.

![SSCG2.png](Cata%CC%81logo%20de%20Autos%20Gerente%20e22ac2ca51284d049de39820656786f9/SSCG2.png)

El componente de filtrado consiste de un menú lateral en el que se pueden seleccionar de las características disponibles para ver sólamente los autos que tengan estas características. Cabe mencionar que solo se puede filtrar por las características que tienen los autos del catálogo. Es decir, cada vez que se selecciona un filtro, la lista de filtros disponibles se actualiza para solo mostrar las características de los autos restantes. En la imagen de abajo se selecciona el modelo “Jetta” y el año “2019”, por lo que no se muestra ningún otro filtro disponible para esas características.

![SSCG3.png](Cata%CC%81logo%20de%20Autos%20Gerente%20e22ac2ca51284d049de39820656786f9/SSCG3.png)

- Flujo de navegación en la interfaz de usuario

Al cargar la página el usuario gerente puede ver todos los autos en su agencia sin ningún filtro aplicado. A partir de esto, el usuario puede seleccionar los filtros que desee para reducir la cantidad de autos mostrados. Los filtros se aplican al momento de su selección. El usuario también puede seleccionar la opción de “Editar” para ver y poder cambiar la información de un auto en específico, o la opción de “Borrar” para eliminarlo de la plataforma. Alternativamente, puede seleccionar “Agregar auto” para ver la página de subida de auto.

- Desarrollo del componente

Para hidratar los componentes de filtrado y listado de autos, se le pasa un query con los filtros actualmente seleccionados al endpoint buscar-auto-agencia. Esto regresará los autos filtrados y los filtros que aún apliquen a esa selección. Esto es similar al catálogo general, pero se aplica un nombre de agencia por defecto para garantizar que solo se muestren los autos correspondientes a la agencia del usuario gerente.

```jsx
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
```

 La hidratación ocurre con cada cambio a la variable de estado selectedFilters:

```jsx
useEffect(() => {
  fetchFilters();
}, [selectedFilters]);
```

Para construír el componente en sí, se itera por las cateogrías disponibles y se crea un elmento por cada una: 

```jsx
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
```

Seleccionar una cateogría ejecuta la función renderSubMenu() para mostrar el drop-down de filtros correspondiente. Abajo se puede ver un ejemplo de los drop-down generados.

![SSCG4.png](Cata%CC%81logo%20de%20Autos%20Gerente%20e22ac2ca51284d049de39820656786f9/SSCG4.png)

Y la función renderSubMenu():

```jsx
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
```

Al seleccionar una de los filtros del drop-down, se ejecuta la función handleMenuItemClick() para actualizar los filtros y autos mostrados:

```jsx
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
```

Similarmente, el listado de autos es una iteración por los autos recuperados:

```jsx
<table style={{ width: "100%" }}>
  <thead>
    <tr>
      <th></th>
      <th>Modelo</th>
      <th>Año</th>
      <th>Marca</th>
      <th>ID</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {catalogData.map((car, i) => (
      <tr key={i}>
        <td><img src={car._source.fotos_3d[0]} height="50" width="60" /></td>
        <td>{car._source.modelo}</td>
        <td>{car._source.año}</td>
        <td>{car._source.marca}</td>
        <td>{car._id}</td>
        <td><button onClick={() => viewEditCar(car._id)} disabled={deletingCarIds.includes(car._id)}> Editar </button></td>
        <td><button onClick={() => deleteCar(car._id)} disabled={deletingCarIds.includes(car._id)}> Borrar </button></td>
      </tr>
    ))}
  </tbody>
</table>
```

Como se puede ver, las caracterísitcas de los autos se pueden accesar como valores dentro del JSON car. “Borrar” un auto ejecuta la función deleteCar(), la cual llama al endpoint borrar-auto-elastic:

```jsx
const deleteCar = async (auto_id) => {
  setDeletingCarIds([...deletingCarIds, auto_id]);
  // Delete car from elastic
  await fetch(`http://localhost:3000/api/catalogo-gerente/borrar-auto-elastic?auto_id=${auto_id}`,
    { method: 'DELETE' });
};
```

Los demás botones simplemente redirigen a otras páginas:

```jsx
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
```

## **Almacenamiento de Datos y Endpoints**

- Descripción de los endpoints del sistema

Como se describió arriba, los endpoints que se utilizaron fueron:

/borrar-auto-elastic [borrar-auto-elastic](APIs%20e10aff3c50d44cea902a66f24d4a02bf/catalogo-gerente%2013fe61ffd4954a0092a7fb5449accc40/borrar-auto-elastic%2070b5179ab27649ee8b4873e30a059ea9.md) 

/buscar-auto-agencia [buscar-auto-agencia](APIs%20e10aff3c50d44cea902a66f24d4a02bf/catalogo-gerente%2013fe61ffd4954a0092a7fb5449accc40/buscar-auto-agencia%20ff07ece8b1314a009b4ce8430b6e95d1.md)