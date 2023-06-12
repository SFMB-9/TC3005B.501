/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15

  Este componente representa el footer de la pagina, el cual contiene los links
  a las paginas mas importantes del sitio web.
*/

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Typography } from "@mui/material";

// Constante que contiene los links de la primera columna del footer
const pages1 = [
  { name: "Sobre nosotros", link: "/about" },
  { name: "Compra un auto", link: "/catalog" },
  { name: "Registra tu agencia", link: "/providers/GA" }
];

// Funcion que retorna el footer de la pagina
const Footer = () => {
  return (
    <section style={{ backgroundColor: "black" }} className="px-0 mx-0 py-2">
      <div className="container px-0">
        <div className="row align-items-center">
          <div className="col-5 d-none d-md-block">
            <Image src="/footer_swivel_logo.svg" width={100} height={100} />
          </div>
          <div className="col">
            <div className="d-flex flex-column align-items-center align-items-md-start">
              {pages1.map((page) => (
                <Link
                  href={page.link}
                  style={{ textDecoration: "none" }}
                  className="p-1"
                  key={page.name}
                >
                  <Typography color="white" fontFamily="Lato" fontSize={13}>
                    {page.name}
                  </Typography>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
