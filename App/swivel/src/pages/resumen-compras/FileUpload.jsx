import React, { useState } from "react";
import { storage } from "../../utils/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function FileUpload({ docId, procesoId }) {
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/resumen-compra/upload-file",
        {
          method: "UPDATE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            docId: docId,
            url: selectedFile,
            procesoId: procesoId,
          }),
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
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
