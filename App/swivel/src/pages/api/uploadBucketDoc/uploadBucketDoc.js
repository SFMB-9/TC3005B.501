/**
 * @fileoverview Componente para subir archivos a firebase storage
 * @module src/pages/resumen-compras/FileUpload
 * @requires firebase
 * @requires firebase/storage
 * @requires firebase/storage/ref
 * @requires firebase/storage/uploadBytesResumable
 * @requires firebase/storage/getDownloadURL
 * @requires src/utils/firebase/firebase
 *
 *
 */

import { storage } from "../../../utils/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function validateFile(file) {
  const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "gif", "bmp"];
  const sizeLimit = 32 * 1024 * 1024; // 32 MB size limit

  // Get the file extension
  const fileExtension = file.name.split(".").pop().toLowerCase();

  // Check the extension
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error(
      `La extensión del documento que subió no es válida. Solamente se permiten las siguientes extensiones: ${allowedExtensions.join(
        ", "
      )}`
    );
  }

  // Check the size
  if (file.size > sizeLimit) {
    throw new Error(
      `El tamaño del archivo subido excede el límite de ${sizeLimit / (1024 * 1024)} MB`
    );
  }

  // If file passes checks, return true
  return true;
}

async function FileUpload(file) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, "resumen-compra/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      let approved = validateFile(file);
      if (approved) {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (err) => {
            console.log(err);
            reject(err); // Reject the Promise if an error occurs
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                console.log(url);
                resolve(url); // Resolve the Promise with the URL
              })
              .catch((err) => {
                console.log(err);
                reject(err); // Reject the Promise if an error occurs
              });
          }
        );
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export default FileUpload;
