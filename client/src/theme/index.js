import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  duration,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import customizeComponents from "./customizations";
import { useMemo, useState, createContext } from "react";

// LIGHT MODE PALETTE
const PRIMARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#00AB55",
  dark: "#007B55",
  darker: "#005249",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

// DARK MODE PALETTE
const PRIMARY_DARK = {
  lighter: "#37524E",
  light: "#A41A7B",
  main: "#FF54AA",
  dark: "#FF8EA4",
  darker: "#FFDACB",
  contrastText: "#000",
};

const SECONDARY_DARK = {
  lighter: "#29201A",
  light: "#7B6600",
  main: "#CC9900",
  dark: "#E6C649",
  darker: "#F6E785",
  contrastText: "#000",
};

const SUCCESS_DARK = {
  lighter: "#16232B",
  light: "#550D80",
  main: "#AB2D94",
  dark: "#DDE69A",
  darker: "#F9F2F3",
  contrastText: "#000",
};

const GREY_DARK = {
  0: "#000000",
  100: "#060505",
  200: "#0B0A0C",
  300: "#201C22",
  400: "#3B324B",
  500: "#6E6575",
  600: "#9C8D7F",
  700: "#BBB0A5",
  800: "#DED3CA",
  900: "#E9E4DB",
  500_8: alpha("#6E6575", 0.08),
  500_12: alpha("#6E6575", 0.12),
  500_16: alpha("#6E6575", 0.16),
  500_24: alpha("#6E6575", 0.24),
  500_32: alpha("#6E6575", 0.32),
  500_48: alpha("#6E6575", 0.48),
  500_56: alpha("#6E6575", 0.56),
  500_80: alpha("#6E6575", 0.8),
};

export const ColorModeContext = createContext();

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const themeOptions = {
    palette: {
      mode,
      primary: mode === "light" ? PRIMARY : PRIMARY_DARK,
      secondary: mode === "light" ? SECONDARY : SECONDARY_DARK,
      success: mode === "light" ? SUCCESS : SUCCESS_DARK,
      text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
      background: {
        paper: mode === "light" ? "#fff" : GREY_DARK[800],
        default: mode === "light" ? "#fff" : GREY_DARK[900],
        neutral: mode === "light" ? GREY[200] : GREY_DARK[200],
      },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },
    transition: {
      duration: {
        enteringScreen: 5000,
        leavingScreen: 5000,
      },
    },
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === "light" ? "dark" : "light";
          console.log(`Changing mode from ${prevMode} to ${nextMode}`);
          return nextMode;
        });
      },
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = customizeComponents(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeProvider;
