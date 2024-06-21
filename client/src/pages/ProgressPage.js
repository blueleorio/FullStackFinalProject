import React, { useEffect } from "react";
import { Card, Container } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchProgresses } from "../features/progress/progressSlice";
import LoadingScreen from "../components/LoadingScreen";
import ProgressList from "../features/progress/ProgressList";

function ProgressPage() {
  const dispatch = useDispatch();
  const { progresses, isLoading } = useSelector(
    (state) => state.progress,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchProgresses());

  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Card
          sx={{
            mb: 3,
            position: "relative",
            overflow: "visible",
          }}
        >
          <ProgressList progresses={progresses} />
        </Card>
      )}
    </Container>
  );
}

export default ProgressPage;
