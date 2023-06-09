import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "@/styles/step.module.css";

const Step = (props) => {
  return (
    <div className={styles.step_container}>
      <div className={styles.step_content}>
        <Typography
          sx={{
            color: "white",
          }}
          variant="h5"
          fontFamily="Raleway"
          align="center"
        >
          {props.number}
        </Typography>

        <Image src={props.img} width={170} height={170} className="py-3" />

        <Typography
          sx={{
            color: "white",
          }}
          variant="h6"
          fontFamily="Raleway"
          align="center"
        >
          {props.text}
        </Typography>
      </div>
    </div>
  );
};

export default Step;