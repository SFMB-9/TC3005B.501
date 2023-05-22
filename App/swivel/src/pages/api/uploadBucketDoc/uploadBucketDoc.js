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

async function FileUpload(file) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, "resumen-compra/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
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
    });
  }
  
    export default FileUpload;