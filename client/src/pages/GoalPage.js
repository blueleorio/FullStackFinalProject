import { shallowEqual, useSelector } from "react-redux";

import { Container, Grid } from "@mui/material";

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <GoalForm />
          </Grid>
          <Grid item xs={12} sm={6}>
            <GoalList />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default GoalPage;
