import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
// import { toast } from "react-toastify";
import AlertMsg from "../components/AlertMsg";
import "../theme/stylesheet.css";

function MainLayout() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const Mode = theme.palette.mode;

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // Trigger a toast notification
  // toast("This is a toast notification!");
  return (
    <Stack
      sx={{ minHeight: "100vh", minWidth: "100vw" }}
      className={Mode === "dark" ? "pattern-bg-dark" : "pattern-bg-light"}
    >
      <AlertMsg />
      <MainHeader
        onDrawerOpen={handleDrawerOpen}
        onDrawerClose={handleDrawerClose}
      />
      <Box
        component="main"
        // border={1}
        sx={{
          flexGrow: 1,
          mt: 6,
          ml: isDrawerOpen ? 31 : 9,
          // p: 2,
        }}
      >
        <Outlet />
      </Box>
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
