import { AppBar, Box, Toolbar, Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

// Generic Navbar which allows for customization
export default function CustomNavbar({ home='/', elems_left, elems_right }) {
  return (
    <AppBar position="static" style={{ backgroundColor: '#1F1F1F'}}>
      <Container maxWidth="xl">
        <Toolbar>
          {/* Logo large width */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          >
            <Link href={home}>
              <Image
                src="/swivel_logo_white.svg"
                alt="Logo"
                width={120}
                height={30}
              />
            </Link>
          </Box>
          {/* Logo small width */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >   
            <Link href="/">
              <Image src="/swivel_logo_white.svg" alt="Logo" width={120} height={30} />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-evenly",
            }}
          >
            <div>
              {elems_left &&
                elems_left.map((element, index) => (
                  <div key={index}>
                    {element}
                  </div>
                ))}
            </div>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-evenly",
            }}
          >
            {elems_right &&
              elems_right.map((element, index) => (
                <div key={index}>
                  {element}
                </div>
              ))
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
