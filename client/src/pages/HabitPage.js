import React, { useEffect } from "react";
import { Card, Container } from "@mui/material";
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
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

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
        <>
          <Card
            sx={{
              mb: 3,
              //   height: 280,
              position: "relative",
            }}
          >
            <HabitForm />
          </Card>
          <HabitList />
        </>
      )}
    </Container>
  );
}

export default HabitPage;
