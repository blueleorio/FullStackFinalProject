import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
// import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {/* <MainHeader /> */}
      {/* <AlertMsg />  */}
      <Box
        height={32}
        sx={{
          border: "2px solid grey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        This is the header
      </Box>

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
