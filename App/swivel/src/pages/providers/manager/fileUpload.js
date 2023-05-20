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
import React, { useState } from "react";
import { storage } from "../../../utils/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function FileUpload({ body }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, "resumen-compra/" + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        console.log(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setSelectedFile(url);
        });
      }
    );
  };

  // Change depending on usagem url is stated on selectedFile, integrate as needed
  const fetchData = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/resumen-compra/update-file?procesoId=${body.procesoId}&docId=${body.docId}&url=${selectedFile}`,
        {
          method: "UPDATE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;