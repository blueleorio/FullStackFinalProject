import { shallowEqual, useSelector } from "react-redux";

import { Container, Grid } from "@mui/material";

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <HabitForm />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HabitList />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default HabitPage;
