import { createTheme } from "@mui/material/styles";
import { PRIMARYCOLOR } from "components/common/config";
import { Be_Vietnam_Pro } from "next/font/google";


const be_Vietnam_Pro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      md: 1100,
      sm: 840,
      lg: 1232,
      //@ts-ignore
      700: 700,
      800: 800,
      840: 840,
      1232: 1232,
      1309: 1309,
      1310: 1310,
      xl: 1920,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: PRIMARYCOLOR,
    },
  },

  typography: {
    fontFamily: be_Vietnam_Pro.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
