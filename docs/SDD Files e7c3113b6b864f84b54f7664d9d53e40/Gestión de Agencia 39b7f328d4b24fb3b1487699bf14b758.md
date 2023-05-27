# Gestión de Agencia

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de disponibilidad de las pruebas de manejo y de los documentos que pide le la agencia al comprador al hacer una venta vehicular. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra la actualización de datos en una cuenta central que representa a la agencia. La base de datos es un cluster en MongoDB Atlas al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). El manejo de cuentas se hace dentro de una sola colección: la colección usuario.

![Untitled](Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

Se utilizan cuatro campos en la operación de disponibilidad:

- horas_min: campo que indica la hora de apertura.
- horas_max: campo que indica la hora de cierre.
- dias_anticipo: campo que indica la cantidad de días previos durante los que se puede apartar una prueba.
- dias_max: campo que indica la cantidad máxima de días para agendar una prueba.

Se utiliza un solo campo en la operación de documentos:

- documentos_requeridos_compra: campo que indica los documentos que pide la agencia.

Este campo se usa en ambas operaciones:

- agencia: campo que indica la agencia en cuestión.

### Modificación de detalles

Los detalles de la agencia se pueden modificar dentro de la página mediante inputs númericos y de texto, junto con botones que guardan los cambios al enviar la nueva información al endpoint.

Esto se hace mediante tres endpoints distintos:

Actualización de horarios: /modificar-disponibilidad-pruebas

Actualización de lista de documentos: /actualizar-documentos-requeridos

Obtención de información: /pull-detalles-agencia

## Interfaz de usuario

El propósito de la interfaz es dar la opción al gerente ed ver y actualizar los detalles de la agencia, estos siendo los horarios para las pruebas y los documentos que se reuquieren para una compra. Consiste de inputs numéricos y de texto, y botones para guardar los ajustes.

![Untitled](Gestio%CC%81n%20de%20Agencia%2039b7f328d4b24fb3b1487699bf14b758/Untitled.png)

### Desarrollo del componente

La sección de horarios se conforma de una serie de inputs mostrando los campos relevantes, junto con un botón que permite actualizar los detalles. Esta sección tiene el siguente formato:

```jsx
<label>Hora de apertura</label>
<input
	type="time"
	value={startTime}
	onChange={handleStartTimeChange}
/>
<label>Hora de cierre</label>
<input
	type="time"
	value={endTime}
	onChange={handleEndTimeChange}
/>
<label>Días de antelación</label>
<input
	type="number"
	value={preDays}
	onChange={handlePreDaysChange}
	inputProps={{ min: 0 }}
/>
<label>Número de días disponible</label>
<input
	type="number"
	value={maxDays}
	onChange={handleMaxDaysChange}
	inputProps={{ min: 0 }}
/>
<button onClick={timeSubmit}>Submit</button>
```

La sección de documentos es una lista que enseña los documentos junto con un campo de agregar entrada. Al agregar un documento se manda la nueva lista al endpoint de actualización:

```jsx
<div>
	<label htmlFor="doc_field">Documentos</label>
	<input
		type="text"
		value={newItem}
    onChange={(e) => setNewItem(e.target.value)}
  />
  <button onClick={addItem}>Agregar documento</button>

  <ul>
	  {list.map((item, index) => (
	    <li key={index}>
	      {item}
        <button onClick={() => removeItem(index)}>Eliminar</button>
			</li>
		))}
  </ul>

	<button onClick={docSubmit}>Guardar</button>
</div>
```

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del sistema

Como ya se mencionó, existen tres endpoints para este módulo:

[/pull-detalles-agencia](APIs%20059691d154ad421abbf7f195cee48c5c/Flujo%20de%20Gerente%2098fbb080151944b78b74e5500018855f/Gestio%CC%81n%20de%20Agencia%206be23fa9887b451e84d41c54d375ec3e/pull-detalles-agencia%20c1e0ed11e1cb47f49c2c55686f70059a.md) 

[/actualizar-documentos-requeridos](APIs%20059691d154ad421abbf7f195cee48c5c/Flujo%20de%20Gerente%2098fbb080151944b78b74e5500018855f/Gestio%CC%81n%20de%20Agencia%206be23fa9887b451e84d41c54d375ec3e/actualizar-documentos-requeridos%200fdbce131c374c71907c5e0d56a075ef.md) 

[/modificar-disponibilidad-pruebas](APIs%20059691d154ad421abbf7f195cee48c5c/Flujo%20de%20Gerente%2098fbb080151944b78b74e5500018855f/Gestio%CC%81n%20de%20Agencia%206be23fa9887b451e84d41c54d375ec3e/modificar-disponibilidad-pruebas%209a9b1584d0184eb8b16c71fc8ee0a115.md) 

### Formato y tipo de datos almacenados

Este módulo utiliza las sigunetes variables de tipo String:

- dias_anticipo
- dias_max
- agencia

Los siguentes campos son de tipo Int:

- horas_min
- horas_max

El siguente campo es de tipo Array[String]:

- documentos_requeridos_compra

### Especificaciones de seguridad y privacidad de los datos

No hay campos encrptados o asegurados de manera especial.

## Pruebas y verificación

### Plan de pruebas

Para corroborar el funcionamiento adecuado del módulo, se hicieron pruebas unitarias a cada uno de los endpoints y se realizaron pruebas de recorrido. 

### Escenarios de prueba y casos de uso

Para cada endpoint se generaron los siguientes escenarios de prueba:

- se manda la información correcta y se regresa la respuesta exitosa
- se manda información equivocada y se regresa la respuesta de fallo
- se manda información con un método equivocado

### Pruebas

[Pruebas Gestión de Agencia](Pruebas%20b2896060cbea4a73b56f84c3fc288dcd/Pruebas%20Gestio%CC%81n%20de%20Agencia%20b38b2f892cdb4bac95fdc969c99a0198.md)