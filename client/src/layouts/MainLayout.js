import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
// import AlertMsg from "../components/AlertMsg";
import MiniDrawer from "../components/MiniDrawer";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      {/* <AlertMsg />  */}
      {/* <MiniDrawer /> */}

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
