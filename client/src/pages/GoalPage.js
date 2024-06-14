import { shallowEqual, useSelector } from "react-redux";

import { Box, Container } from "@mui/material";

import LoadingScreen from "../components/LoadingScreen";
import GoalForm from "../features/goal/GoalForm";
import GoalList from "../features/goal/GoalList";

function GoalPage() {

  const { isLoading } = useSelector((state) => state.user, shallowEqual);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Ensure the direction is row to align items in a row
            justifyContent: "space-around",
            flexWrap: "wrap", // Allow wrapping if the container is too small
          }}
        >
          <Box sx={{ width: "auto", padding: 1 }}> {/* Add padding for spacing */}
            <GoalForm />
          </Box>
          <Box sx={{ width: "50%", padding: 1 }}> {/* Add padding for spacing */}
            <GoalList />
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default GoalPage;
