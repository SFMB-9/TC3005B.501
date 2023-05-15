import { Typography } from "@mui/material"
import Image from "next/image"

import styles from "@/styles/custom_hero.module.css"

export default function CustomHero({
  background_image = "/dummy_car_image2.png",
  title = "Bienvenidx a Swivel",
  message = "Compra tu auto completamente en linea"
}) {
  return (
    <div className={styles.hero_container}>
      <div className={styles.hero_background}>
        <img
          src={background_image}
        />
      </div>
      <div className={styles.hero_body}>
        <Typography className={styles.hero_title}>
          {title}
        </Typography>
        <Typography className={styles.hero_message}>
          {message}
        </Typography>
      </div>
    </div>
  )
}