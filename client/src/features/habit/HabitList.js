import React, { useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import HabitCard from "../habit/HabitCard";
import { fetchHabits, setCurrentPage } from "../../features/habit/habitSlice";
import useAuth from "../../hooks/useAuth";

const HABITS_PER_PAGE = 3;

const HabitList = () => {
  const { user } = useAuth();
  const userId = user._id;

  const { habits, totalHabits, isLoading, currentPage } = useSelector(
    (state) => ({
      habits: state.habit.habits,
      totalHabits: state.habit.totalHabits,
      currentPage: state.habit.currentPage,
      isLoading: state.habit.status === "loading",
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(totalHabits / HABITS_PER_PAGE);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(fetchHabits({ page: currentPage }));
  }, [userId, dispatch, currentPage]);

  let renderHabits;

  if (habits.length > 0) {
    renderHabits = (
      <Stack spacing={1.5}>
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderHabits = <LoadingScreen />;
  }

  const handlePageChange = (event, value) => {
    dispatch(fetchHabits({ page: value }));
    dispatch(setCurrentPage(value));
  };

  return (
    <Stack
      spacing={1.5}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalHabits > 1
            ? `${totalHabits} habibiz`
            : totalHabits === 1
              ? `${totalHabits} habibi`
              : "No habibi"}
        </Typography>
        {totalHabits > HABITS_PER_PAGE && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Stack>
      {renderHabits}
    </Stack>
  );
};

export default HabitList;
