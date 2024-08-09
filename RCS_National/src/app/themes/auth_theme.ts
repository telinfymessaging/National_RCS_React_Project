
"use client";
import { Cairo } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

// Load the Cairo font
const cairo = Cairo({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a Material-UI theme with the Cairo font
const theme = createTheme({
  typography: {
    fontFamily: cairo.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#A02695", // Custom color
    },
    text: {
      primary: "#000000", // Example secondary color, you can choose any color you like
    },
  },
});

export default theme;
