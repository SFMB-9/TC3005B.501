import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Fade,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import CountdownTimer from "@/components/general/countdown";

export default function Process() {
  const router = useRouter();
  const { process_id } = router.query;

  const [process, setProcess] = useState(null);

  const fetchProcess = async () => {
    const response = await fetch(
      `/api/purchase-docs/with-mongo?process_id=${process_id}`,
      { method: "GET" }
    );

    const data = await response.json();

    if (data.result) {
      setProcess(data.result);
      console.log(data.result);
    }
  };
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (!process_id) {
      return;
    }
    fetchProcess();
  }, [process_id]);

  if (process != null) {
    const formattedDateTime = new Date(process.fecha_agendada).toLocaleString(
      "es-MX",
      {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "America/Mexico_City",
        hour12: true,
      }
    );

    return (
      <Fade in={true} timeout={1500}>

      <Container maxWidth="md" className="py-3">
        <div className="section p-5">
          <Typography
            fontFamily="Lato"
            color="#1F1F1F"
            fontSize={{ xs: 25, md: 28, lg: 33 }}
            className="pt-2 text-center"
          >
            ¡Su prueba de manejo ha sido agendada exitosamente!
          </Typography>
        </div>

        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            padding: "2% 5%",
            // paddingLeft: '5%',
            // paddingRight: '5%',
            // paddingTop: '2%',
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  padding: "5%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "3%",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      marginBottom: "2%",
                      justifyContent: "center",
                    }}
                  >
                    Auto seleccionado
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "2%",
                      textAlign: "center",
                    }}
                    color="text.secondary"
                  >
                    El auto que te espera para tu prueba de manejo es un...
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0% 5%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "2%",
                      marginBottom: "2%",
                    }}
                  ></div>
                  <div
                    style={{
                      marginTop: "2%",
                    }}
                  >
                    <img
                      src={process.auto.array_fotografias_url[0]}
                      alt="auto"
                      className="img-fluid rounded"
                    />
                    <Typography
                      sx={{
                        marginTop: "2%",
                        textAlign: "center",
                      }}
                      color="text.secondary"
                    >
                      {process.auto.marca} {process.auto.modelo}{" "}
                      {process.auto.ano}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                width: "100%",
                display: "flex",
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  padding: "5%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "3%",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      marginBottom: "2%",
                      justifyContent: "center",
                    }}
                  >
                    Agencia responsable
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "2%",
                      textAlign: "center",
                    }}
                    color="text.secondary"
                  >
                    La agencia responsable es...
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0% 5%",
                  }}
                >
                  <div>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "2%",
                        textAlign: "center",
                      }}
                      color="text.secondary"
                    >
                      {process.nombre_agencia}
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "2%",
                        textAlign: "center",
                      }}
                      color="text.secondary"
                    >
                      {process.direccion_agencia}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="mt-3"
              sx={{
                width: "100%",
                display: "flex",
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  padding: "5%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "3%",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      marginBottom: "2%",
                      justifyContent: "center",
                    }}
                  >
                    Horario agendado
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "2%",
                      textAlign: "center",
                    }}
                    color="text.secondary"
                  >
                    Tu prueba de manejo es el...
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0% 5%",
                  }}
                >
                  <div>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "2%",
                        textAlign: "center",
                      }}
                      color="text.secondary"
                    >
                      {formattedDateTime}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div className="p-5">
          <Typography
            fontFamily={"Lato"}
            sx={{
              marginBottom: "5%",
              textAlign: "start",
            }}
          >
            Te esperamos en...
          </Typography>

          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            component="div"
            fontFamily={"Lato"}
            color="text.secondary"
            sx={{
              justifyContent: "center",
            }}
          >
            <CountdownTimer targetDate={process.fecha_agendada} />
          </Typography>
        </div>

        <div className="text-center">
          <Button
            variant="contained"
            sx={{
              fontFamily: "Lato",
              ":hover": {
                backgroundColor: "#F68E70",
              },
            }}
            disableElevation
            type="button"
            href="/"
          >
            Ok
          </Button>
        </div>
      </Container>
      </Fade>
    );
  } else {
    return (
      <div>
        <p>Loading Process...</p>
      </div>
    );
  }
}
