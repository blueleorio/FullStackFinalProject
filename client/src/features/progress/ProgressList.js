import React from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import ProgressCard from "../progress/ProgressCard";
import { setCurrentPage, fetchProgressesForDate } from "../../features/progress/progressSlice";

const PROGRESSES_PER_PAGE = 3;

const ProgressList = () => {

  const { progresses, totalProgresses, isLoading, currentPage, currentDate } = useSelector(
    (state) => ({
      progresses: state.progress.progresses,
      totalProgresses: state.progress.totalProgresses,
      currentPage: state.progress.currentPage,
      isLoading: state.progress.isLoading,
      currentDate: state.progress.currentDate,
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(totalProgresses / PROGRESSES_PER_PAGE);
  const dispatch = useDispatch();

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
    dispatch(fetchProgressesForDate({ date: currentDate, page: value }))
    dispatch(setCurrentPage(value));
  };

  return (
    <Stack
      spacing={1.5}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalProgresses > 1
            ? `${totalProgresses} TootTooDooos`
            : totalProgresses === 1
              ? `${totalProgresses} TootTooDooo`
              : "No TootTooDooo"}
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
