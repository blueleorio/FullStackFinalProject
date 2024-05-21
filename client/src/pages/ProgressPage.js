import React, { useEffect } from "react";
import { Card, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchProgresses } from "../features/progress/progressSlice";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import ProgressList from "../features/progress/ProgressList";

function ProgressPage() {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { progresses, isLoading } = useSelector(
    (state) => state.progress,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchProgresses());
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Card
          sx={{
            mb: 3,
            position: "relative",
          }}
        >
          <ProgressList progresses={progresses} />
        </Card>
      )}
    </Container>
  );
}

export default ProgressPage;
