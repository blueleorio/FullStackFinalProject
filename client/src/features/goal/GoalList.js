import React, { useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import GoalCard from "../goal/GoalCard";
import { fetchGoals, setCurrentPage } from "../../features/goal/goalSlice";
import useAuth from "../../hooks/useAuth";

const GOALS_PER_PAGE = 5;

const GoalList = () => {
  const { user } = useAuth();
  const userId = user._id;

  const { goals, totalGoals, isLoading, currentPage } = useSelector(
    (state) => ({
      goals: state.goal.goals,
      totalGoals: state.goal.totalGoals,
      currentPage: state.goal.currentPage,
      isLoading: state.goal.isLoading,
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(totalGoals / GOALS_PER_PAGE);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(fetchGoals(currentPage));
    // console.log("🚀 ~ GoalList ~ goals:", goals);
    console.log("🚀 ~ GoalList ~ currentPage", currentPage);
  }, [userId, dispatch, currentPage]);

  let renderGoals;

  if (goals.length > 0) {
    renderGoals = (
      <Stack spacing={1.5}>
        {goals.map((goal) => (
          <GoalCard key={goal._id} goal={goal} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderGoals = <LoadingScreen />;
  }

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <Stack spacing={1.5} sx={{ border: "1px solid black" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalGoals > 1
            ? `${totalGoals} goals`
            : totalGoals === 1
            ? `${totalGoals} goal`
            : "No goal"}
        </Typography>
        {totalGoals > GOALS_PER_PAGE && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Stack>
      {renderGoals}
    </Stack>
  );
};

export default GoalList;
