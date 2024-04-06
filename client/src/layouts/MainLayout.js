import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { useState } from "react";
// import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {/* <AlertMsg />  */}
      <MainHeader
        onDrawerOpen={handleDrawerOpen}
        onDrawerClose={handleDrawerClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 6,
          ml: isDrawerOpen ? 31 : 9,
          mr: 1,
          p: 2,
          border: "1px solid #000",
        }}
      >
        <Outlet />
      </Box>

      {/* <Box sx={{ flexGrow: 1 }} /> */}

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
