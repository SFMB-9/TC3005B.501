/*
Autor: Karla Mondragón

Código utilizado para el formulario de registro de usuario comprador. 
*/

import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";

/* Función que retorna el formulario de registro de comprador con nombre, 
correo electrónico y contraseña, junto con los botones de ingreso  */
export default function SignUpForm() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          className="w-75 align-items-center justify-content-center img-fluid"
          alt=""
          src="/swivel_logo.svg"
        />
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
            {" "}
            Regístrate
          </Typography>
        </b>
      </div>
      <form className="d-flex flex-column ">
        <div className="form-outline mb-2">
          <div className="d-flex flex-row ">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre(s)"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos"
            />
          </div>
        </div>
        <div className="form-outline mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Correo Electrónico"
          />
        </div>
        <div className="form-outline mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
          />
        </div>
        <div className="form-outline mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Confirmar Contraseña"
          />
        </div>
        <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
          <button type="button" className="btn btn-primary btn-block mb-2">
            <Typography
              wrap
              sx={{
                color: "white",
                fontFamily: "lato",
              }}
            >
              {" "}
              Crear Cuenta{" "}
            </Typography>
          </button>
          <button type="button" className="btn btn-secondary btn-block mb-2">
            <Typography
              sx={{
                color: "white",
                fontFamily: "lato",
              }}
            >
              {" "}
              <img alt="logo de google" src="/google_logo.svg" /> Ingresar con
              Google{" "}
            </Typography>
          </button>
        </div>
        <div className="text-center">
          <p>
            ¿Representas a un Grupo Automotriz?<a href="#!"> Regístrate aquí</a>
          </p>
        </div>
      </form>
    </>
  );
}
