import React, { useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import ProgressCard from "../progress/ProgressCard";
import {
  fetchProgresses,
  setCurrentPage,
} from "../../features/progress/progressSlice";
import useAuth from "../../hooks/useAuth";

const PROGRESSES_PER_PAGE = 5;

const ProgressList = () => {
  const { user } = useAuth();
  const userId = user._id;

  const { progresses, totalProgresses, isLoading, currentPage } = useSelector(
    (state) => ({
      progresses: state.progress.progresses,
      totalProgresses: state.progress.totalProgresses,
      currentPage: state.progress.currentPage,
      isLoading: state.progress.isLoading,
      status: state.progress.state === "loading",
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(totalProgresses / PROGRESSES_PER_PAGE);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(fetchProgresses(currentPage));
    console.log("🚀 ~ ProgressList ~ currentPage", currentPage);
  }, [userId, dispatch, currentPage]);

  let renderProgresses;

  if (progresses.length > 0) {
    renderProgresses = (
      <Stack spacing={1.5}>
        {progresses.map((progress) => (
          <ProgressCard key={progress._id} progress={progress} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderProgresses = <LoadingScreen />;
  }

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <Stack spacing={1.5} sx={{ border: "1px solid black" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalProgresses > 1
            ? `${totalProgresses} progresses`
            : totalProgresses === 1
            ? `${totalProgresses} progress`
            : "No progress"}
        </Typography>
        {totalProgresses > PROGRESSES_PER_PAGE && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Stack>
      {renderProgresses}
    </Stack>
  );
};

export default ProgressList;
