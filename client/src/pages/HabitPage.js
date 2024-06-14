import { shallowEqual, useSelector } from "react-redux";

import { Container, Box } from "@mui/material";

import LoadingScreen from "../components/LoadingScreen";
import HabitForm from "../features/habit/HabitForm";
import HabitList from "../features/habit/HabitList";
function HabitPage() {

  const { isLoading } = useSelector((state) => state.user, shallowEqual);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ width: "50%", padding: 1 }}>
            <HabitForm />
          </Box>
          <Box sx={{ width: "50%", padding: 1 }}>
            <HabitList />
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default HabitPage;
