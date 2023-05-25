import React from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Typography } from "@mui/material";

const ImageFileDrop = (props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // Perform any necessary operations with the dropped image file
        props.onDrop(props.index, acceptedFiles);
      }
    },
  });

  return (
    <div {...getRootProps()} className={`h-100 image-drop-container ${isDragActive ? 'dragging' : ''}`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image file here</p>
      ) : (
        <div className=' h-100 d-flex flex-column justify-content-center text-center align-items-center px-5'>
          <FileUploadIcon sx={{ fontSize: 50, color:'#8A8A8A' }} />
          <Typography
                  fontFamily="Lato"
                  color="#BABABA"
                  fontSize={{ xs: 15, md: 16, lg: 18 }}
                >
                  Arrastra tus archivos o haz click aquí
                </Typography>
        </div>
      )}
    </div>
  );
};

export default ImageFileDrop;
