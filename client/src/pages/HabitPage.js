import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import HabitForm from "../features/habit/HabitForm";
import HabitList from "../features/habit/HabitList";
function HabitPage() {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            display: "flex", // This makes the box a flex container
            flexDirection: "row", // This makes the children (HabitForm and HabitList) align horizontally
            justifyContent: "space-around", // This adds space between the children
            flexWrap: "wrap", // This allows the children to wrap onto the next line if there's not enough space
          }}
        >
          <HabitForm />

          <HabitList />
        </Box>
      )}
    </Container>
  );
}

export default HabitPage;
