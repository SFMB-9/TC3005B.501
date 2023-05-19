import { Typography, Button } from "@mui/material"
import Link from "next/link"
import Searchbar from "@/components/general/searchbar"

import styles from "@/styles/custom_hero.module.css"

export default function CustomHero({
  background_image = "/dummy_car_image2.png",
  title = "Bienvenidx a Swivel",
  message = "Compra tu auto completamente en linea",
  titleSize = 50,
  messageSize = 30,
  containerSize = 30,
  button = false,
  searchbar = false,
}) {
  return (
    <div className={styles.hero_container} style={{ height: containerSize + 'vh' }}>
      <div className={styles.hero_background}>
        <img
          src={background_image}
        />
      </div>
      <div className={styles.hero_body}>
        <Typography className={styles.hero_title} sx={{ fontSize: titleSize }}>
          {title}
        </Typography>
        <Typography className={styles.hero_message} sx={{ fontSize: messageSize }}>
          {message}
        </Typography>
        {/* If button present */}
        {button &&
          (
            <div className="d-flex justify-content-center mt-5">
              <Link href="/catalog" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  size="small"
                  // className="p-2"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#BC2946'
                    },
                    // Rounded corners
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    color="White "
                    fontFamily="Lato"
                    fontWeight="bolder"
                    fontSize={17}
                  >
                    Comprar un auto
                  </Typography>
                </Button>
              </Link>
            </div>
          )
        }
        {/* If searchbar present */}
        {searchbar &&
          (
            <div className="d-flex justify-content-center mt-5">
              <Searchbar/>
            </div>
          )
        }
      </div>
    </div>
  )
}