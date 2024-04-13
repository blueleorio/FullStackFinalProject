import React, { useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import HabitCard from "../HabitCard"; // Assuming you have this component
import { getHabits } from "../../features/habit/habitSlice"; // Assuming you have this action

const HABITS_PER_USER = 10; // Assuming you have this constant

const HabitList = () => {
  const { selectedUser } = useSelector((state) => state.user, shallowEqual);
  const userId = selectedUser._id; // Assuming the selectedUser object has an _id property

  const { habitsByUser, habitsById, totalHabits, isLoading, currentPage } =
    useSelector(
      (state) => ({
        habitsByUser: state.habit.habitsByUser[userId],
        totalHabits: state.habit.totalHabitsByUser[userId],
        currentPage: state.habit.currentPageByUser[userId] || 1,
        habitsById: state.habit.habitsById,
        isLoading: state.habit.isLoading,
      }),
      shallowEqual
    );

  const totalPages = Math.ceil(totalHabits / HABITS_PER_USER);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getHabits({ userId }));
  }, [userId, dispatch]);

  let renderHabits;

  if (habitsByUser) {
    const habits = habitsByUser.map((habitId) => habitsById[habitId]);
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

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalHabits > 1
            ? `${totalHabits} habits`
            : totalHabits === 1
            ? `${totalHabits} habit`
            : "No habit"}
        </Typography>
        {totalHabits > HABITS_PER_USER && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getHabits({ userId, page }))}
          />
        )}
      </Stack>
      {renderHabits}
    </Stack>
  );
};

export default HabitList;
