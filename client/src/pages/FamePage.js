import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import GoalCard from "../features/goal/GoalCard";
import { useEffect } from "react";
import { fetchGoals } from "../features/goal/goalSlice";

const FamePage = () => {
    const goals = useSelector((state) => state.goal.goals);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGoals({ limit: 10, page: 1 }));
    }, [dispatch]);

    // console.log("🚀 ~ file: FamePage.js:10 ~ FamePage ~ goals:", goals)
    const goalHall = goals.filter(goal => goal.percentage === 100);
    // console.log("🚀 ~ file: FamePage.js:18 ~ FamePage ~ goalHall:", goalHall)

    return (
        <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
                <Typography variant="h4" paragraph>
                    Hall Of Fame
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
                    All your achievements will be listed here for eternity
                </Typography>

                <Typography sx={{ color: "text.primary", mb: "1rem" }}>
                    Goal Speedrun glitchless 100%:
                </Typography>
                <Stack spacing={1.5}>
                    {goalHall.length === 0 && <Typography>No GOAL has reached 100% yet</Typography>}
                    {goalHall.map((goal) => (
                        <GoalCard key={goal._id} goal={goal} />
                    ))}
                </Stack>

                <Button to="/" variant="contained" component={RouterLink}>
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
}
export default FamePage;
