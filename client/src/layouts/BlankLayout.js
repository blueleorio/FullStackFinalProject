import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Stack, Grid } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EmojiObjectsTwoToneIcon from "@mui/icons-material/EmojiObjectsTwoTone";
import wallLight from "../wall-light.png";
import wallDark from "../wall-dark.png";
import DarkModeToggle from "../components/DarkModeToggle";

function BlankLayout() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  let Mode = theme.palette.mode;

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left - Grid */}
      <Grid item xs={12} sm={6}>
        <Stack
          minHeight="100%"
          minWidth="100%"
          justifyContent="center"
          alignItems="center"
        >
          <DarkModeToggle colorMode={colorMode} Mode={Mode} />
          <Logo sx={{ width: 90, height: 90, mb: 5 }} />

          {/* Outlet */}

          <Outlet />
        </Stack>
      </Grid>

      {/* Right - Grid */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "95%",
            height: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Mode === "light" ? wallLight : wallDark}
            alt="wallpaper"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default BlankLayout;
