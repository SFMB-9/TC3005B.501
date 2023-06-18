# uploadBucketDoc

Esta función tal cual no es un endpoint, sino una función de utilidad para subir documentos a la nube, y que nos regrese la dirección de este mismo para poder guardarlo y asociarlo a un proceso sobre la base de datos. 

## **Módulo o Archivo**

- **Nombre:** **`uploadBucketDoc.js`**
- **Ruta:** **`src/pages/api/uploadBucketDoc/uploadBucketDoc.js`**
- **Dependencias:**
    - **`firebase`**
    - **`firebase/storage`**
    - **`firebase/storage/ref`**
    - **`firebase/storage/uploadBytesResumable`**
    - **`firebase/storage/getDownloadURL`**
    - **`src/utils/firebase/firebase`**

## **Funciones**

### **`validateFile(file)`**

Función que valida si un archivo cumple con ciertos criterios.

- **Parámetros:**
    - **`file`** (File): El archivo a validar.
- **Excepciones:**
    - Lanza una **`Error`** si la extensión del archivo no es válida o si excede el tamaño límite.
- **Retorno:**
    - **`true`** si el archivo pasa la validación.

### **`FileUpload(file)`**

Función asincrónica que se encarga de subir un archivo a Firebase Storage.

- **Parámetros:**
    - **`file`** (File): El archivo a subir.
- **Retorno:**
    - Una **`Promise`** que se resuelve con la URL de descarga del archivo si la subida es exitosa, o se rechaza con un error si ocurre algún problema durante el proceso.

## Uso

El presente componente se puede asociar a cualquier endpoint que requiera de subir un documento. Esta utilidad se encarga de la validación correcta del documento y posteriormente lo sube a un bucket sobre la nube, al momento que se sube, se retorna un URL que se asocia con el proceso y la documentación que se está subiendo. 

```jsx
FileUpload(file)
  .then((downloadURL) => {
    // Manipular la URL de descarga del archivo subido
  })
  .catch((error) => {
    // Manejar el error de subida del archivo
  });
```