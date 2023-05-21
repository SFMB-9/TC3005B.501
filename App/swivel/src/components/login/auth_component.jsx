/*
Componente de pantalla de autenticación. Este componente se puede reutilizar en cualquier pantalla que requiera un formulario para ingresar al sistema. 

Autor: Ana Paula Katsuda Zalce, Salvador Federico Milanés Braniff
*/
import * as React from "react";
import { useMediaQuery, Box, Grid, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";

export default function AuthComponent({
  backColor = "#000",
  backImage = '',
  cardImage = "/card_welcome_register.png",
  title = "Sign in",
  fields = <></>,
  textColor = "#FFF",
  titleText = 'Bienvenidx',
  bodyText = 'Regístrate y empieza a comprar el auto de tus sueños',
}) {
  const theme = useTheme();
  // Variables que indican el tamaño de la pantalla
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  // Estilo de la carta de autenticación
  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : "80%",
    height: "80%",
    bgcolor: "background.card",
    boxShadow: 24,
  };
  // Pantalla
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: backColor,
        backgroundImage: "url(" + backImage + ")",
      }}
    >
      <Card sx={{ borderRadius: "10px" }} style={boxStyle}>
        <Grid container style={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{ height: "100%" }}
          >
            <CardContent style={{ backgroundColor: "white", width: "65%" }}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <b className="text-center mt-3 mb-3 fs-2 align-items-stretch">
                  <Typography
                    wrap="true"
                    variant="h1"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      fontFamily: "Raleway",
                    }}
                  >
                    {title}
                  </Typography>
                </b>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  className="w-75 align-items-center justify-content-center img-fluid"
                  alt=""
                  src="/swivel_logo.svg"
                />
              </div>
              {fields}
            </CardContent>
          </Grid>
          <Grid item md={6} style={{ height: "100%" }}>
            <CardMedia
              component="img"
              sx={{
                display: isMediumScreen ? "none" : "flex",
                width: "100%",
                height: "100%",
              }}
              image={cardImage}
              alt="Welcome Background"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              style={{
                position: "absolute",
                top: "25vh",
              }}
            >
              <Box style={{ marginBottom: "5%" }}>
                <Typography
                  wrap
                  variant="h2"
                  sx={{
                    color: textColor,
                    fontWeight: "bolder",
                    fontSize: "3.7rem",
                    fontFamily: "Raleway",
                    textAlign: "center",
                    display: isMediumScreen ? "none" : "flex",
                  }}
                >
                  {" "}
                  {titleText}{" "}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  wrap
                  sx={{
                    color: textColor,
                    paddingLeft: "17%",
                    paddingRight: "14%",
                    fontFamily: "lato",
                    fontSize: "2.3rem",
                    display: isMediumScreen ? "none" : "flex",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {bodyText}{" "}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
