import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Stack, Grid } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../theme";
import IconButton from "@mui/material/IconButton";
import EmojiObjectsTwoToneIcon from "@mui/icons-material/EmojiObjectsTwoTone";
function BlankLayout() {
  const colorMode = useContext(ColorModeContext);

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        // backgroundColor: "#F5F7F8",
        // backgroundColor: "#FFFBF5",
        // backgroundColor: "#222831",
      }}
    >
      <Grid item xs={12} sm={6}>
        <Stack
          minHeight="95%"
          minWidth="95%"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            <EmojiObjectsTwoToneIcon fontSize="large" />
          </IconButton>
          <Logo sx={{ width: 90, height: 90, mb: 5 }} />

          <Outlet />
        </Stack>
      </Grid>
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
            src="/wallpaper.jpg"
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
