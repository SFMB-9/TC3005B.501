import { storage } from "@/utils/firebase/firebase";

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const storageRef = storage.ref();
  const fileRef = storageRef.child(file.name);

  fileRef.put(file).then(() => {
    console.log("File uploaded successfully!");
    fileRef.getDownloadURL().then((url) => {
      console.log("File URL:", url);
      // Do something with the URL, such as storing it in your component state
    });
  });
};

export default handleFileUpload;
