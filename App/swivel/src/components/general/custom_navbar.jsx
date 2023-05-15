import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

// Generic Navbar which allows for customization
export default function CustomNavbar({ home = '/', elems_left, elems_right, black=false }) {
  return (
    // If black, then the background color is black, otherwise it is white
    <AppBar position="static" style={{ backgroundColor: black ? '#000' : '#1F1F1F', boxShadow: 'none' }}>
      {/* <Container maxWidth="xl"> */}
        <Toolbar>
          {/* Logo large width */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 6,
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
          {/* Left-most elements */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              alignItems: "center",
              marginLeft: "25px", // Adjust the value to move the section more to the left
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "60px", // Adjust the value to increase or decrease the spacing
              }}
            >
              {elems_left && elems_left.map((element, index) => element)}
            </div>
          </Box>
          {/* Right-most elements */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: "16px", // Adjust the value to move the section more to the right
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "60px", // Adjust the value to increase or decrease the spacing
              }}
            >
              {elems_right && elems_right.map((element, index) => element)}
            </div>
          </Box>
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}