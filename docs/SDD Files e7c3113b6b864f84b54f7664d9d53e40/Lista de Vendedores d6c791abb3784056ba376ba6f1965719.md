# Lista de Vendedores

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de los vendedores asignados a la agencia del gerente. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra la obtención de datos de múltiples cuentas existentes que cumplan con un par de criterios. La base de datos es un cluster en MongoDB Atlas al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). El manejo de cuentas se hace dentro de una sola colección: la colección usuario.

![Untitled](Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

Se utilizan dos campos en la operación de obtención:

- tipo_usuario: un campo encriptado que indica el nivel de permisos que tiene la cuenta asociada.
- agencia: campo que indica la agencia a la que pertenece el vendedor.

Al editar la información de alguna cuenta se utilizan más campos:

- nombres: un campo que indica los nombres de pila.
- apellidos: un campo que indica la apellidos.
- email: campo que indica el email de la cuenta.
- numero_telefonico: campo que indica el número celular del usuario.

### Obtención y edición de información de cuentas

Los detalles de las cuentas se obtienen al entrar a la página siempre y cuando pertenezcan a la agencia del gerente que los busca. Dentro de la página se pueden ver los detalles de estas cuentas y también se pueden editar los campos que se deseen e incluso se pueden eliminar cuentas.

Esto se hace mediante tres endpoints distintos:

Obtención de información: /pull-all-vendedores

Edición de información: /actualizar-vendedor

Eliminar cuenta: /eliminar-vendedor

## Interfaz de usuario

El propósito de la interfaz es mostrarle al gerente que vendedores existen dentro de su agencia. Consiste de una lista que muestra todos los resultados, una barra de busqueda que permite buscar de acuerdo a un filtro, un botón que redirecciona al gerente a registrar a un nuevo vendedor, y un apartado que se abre al empezar a editar detalles de algún vendedor.

![Untitled](Lista%20de%20Vendedores%20d6c791abb3784056ba376ba6f1965719/Untitled.png)

### Desarrollo del componente

El componente se conforma de una lista de las cuentas mostrando los campos relevantes, junto con un botón que permite editar los detalles o borrar la cuenta. Esta sección tiene el siguente formato:

```jsx
<ul>
	{filteredResults.map((entry) => (
		<li key={entry._id}>
			<div>
	      <strong>Name:</strong> {entry.nombres}
	    </div>

      <div>
	      <strong>Last Name:</strong> {entry.apellidos}
      </div>

      <div>
	      <strong>Email:</strong> {entry.email}
      </div>

      <div>
	      <strong>Cellphone:</strong> {entry.numero_telefonico}
      </div>

      <button onClick={() => deleteEntry(entry.email)}>Delete</button>
      <button onClick={() => editEntry(entry)}>Edit</button>
		</li>
	))}
</ul>
```

El botón de “Edit” activa una sección que edita los valores mostrados, guardándolos en variables de estado y al guardar los cambios se envía al endpoint de actualización:

```jsx
{editingEntry && (
	<div className="overlay">
		<div className="overlay-content">
		<h2>Edit Entry</h2>
		<form onSubmit={handleSubmit}>
			<label>
				Nombre:
				<input type="text" value={editedName} onChange={handleNameChange} />
			</label>
			<label>
				Apellido:
				<input type="text" value={editedLastName} onChange={handleLastNameChange} />
			</label>
			<label>
				Email:
				<input type="text" value={editedEmail} onChange={handleEmailChange} />
			</label>
			<label>
				Teléfono:
				<input type="text" value={editedCellphone} onChange={handleCellphoneChange} />
			</label>
			<button type="submit">Guardar</button>
			<button onClick={closeOverlay}>Cancelar</button>
		</form>
		</div>
	</div>
)}
```

El botón de “Delete” manda el correo y agencia al endpoint de eliminación para quitar el registro de la base de datos.

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del sistema

Como ya se mencionó, existen tres endpoints para este módulo:

[/pull-all-vendedores](APIs%20059691d154ad421abbf7f195cee48c5c/Flujo%20de%20Gerente%2098fbb080151944b78b74e5500018855f/Lista%20de%20Vendedores%2015d7da8750e34464b35f6cca2c5b20f9/pull-all-vendedores%20237aef25d2cf45b29373b416be3f5324.md) 

[/eliminar-vendedor](APIs%20059691d154ad421abbf7f195cee48c5c/Flujo%20de%20Gerente%2098fbb080151944b78b74e5500018855f/Lista%20de%20Vendedores%2015d7da8750e34464b35f6cca2c5b20f9/eliminar-vendedor%207e6b7bf962414bbfa68cb0e562ebadcc.md) 

[/actualizar-vendedor](APIs%20059691d154ad421abbf7f195cee48c5c/Flujo%20de%20Gerente%2098fbb080151944b78b74e5500018855f/Lista%20de%20Vendedores%2015d7da8750e34464b35f6cca2c5b20f9/actualizar-vendedor%20b4566a44abc444208f1c09515b1bec10.md) 

### Formato y tipo de datos almacenados

Este módulo utiliza varias variables, todas de tipo String:

- nombres
- apellidos
- email
- numero_telefonico
- agencia
- tipo_usuario

### Especificaciones de seguridad y privacidad de los datos

Solo hay un campo asegurado en este proceso:

- tipo_usuario: encriptación

## Pruebas y verificación

### Plan de pruebas

Para corroborar el funcionamiento adecuado del módulo, se hicieron pruebas unitarias a cada uno de los endpoints y se realizaron pruebas de recorrido. 

### Escenarios de prueba y casos de uso

Para cada endpoint se generaron los siguientes escenarios de prueba:

- se manda la información correcta y se regresa la respuesta exitosa
- se manda información equivocada y se regresa la respuesta de fallo
- se manda información con un método equivocado

### Pruebas

[Pruebas Lista de Vendedores](Pruebas%20b2896060cbea4a73b56f84c3fc288dcd/Pruebas%20Lista%20de%20Vendedores%209c30ba1d4c9542d5a25b77f7deba7579.md)