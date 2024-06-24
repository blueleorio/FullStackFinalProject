import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BasicDateCalendar from "../features/calendar/CalendarForm";
import HabitList from "../features/habit/HabitList";
import ProgressList from "../features/progress/ProgressList";
import GoalList from "../features/goal/GoalList";

import {
  Box,
  Typography,
  Card,
  Container,
  Avatar,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Grid,
  Fab,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Quote } from "../components/QuoteBlock";

import dayjs from "dayjs";
import Clock from "react-live-clock";

import SearchInput from "../components/SearchInput";
import Add from "@mui/icons-material/Add";

function HomePage() {
  const { user } = useAuth();
  const [date, setDate] = React.useState(dayjs());
  const navigate = useNavigate();

  const goToAccount = () => {
    navigate('/account');
  }

  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} md={6} lg={4} style={{ position: "absolute", zIndex: 10 }}>
          <Accordion
            sx={{ width: "100%" }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="search-input-content"
              id="search-input-header"
            >
              <Typography>Search</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SearchInput />
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item container spacing={2} justifyContent="space-around" style={{ marginTop: 40 }} >

          <Grid item xs={12} sm={12} md={8}
          // sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Card sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              width: "100%",
              height: "100%",
              flexDirection: { xs: "column", md: "row" },
              p: 3,
            }}
            >
              <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: '100%', p: 2 }}>
                <Typography variant="h6">About Me</Typography>
                <Card
                  sx={{
                    width: 90,
                    height: 90,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={goToAccount}
                  raised={true}
                >
                  <Avatar
                    alt="User Avatar"
                    src={user.avatarUrl}
                    variant="square"
                    sx={{ width: 70, height: 70, mb: 2, mt: 2 }}
                  />
                </Card>
                <Typography variant="body2" sx={{ mt: 2, wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }} align="center">
                  {user.aboutMe}
                </Typography>
                <Clock
                  format={"h:mm:ssa"}
                  ticking={true}
                  style={{ fontSize: "2em" }}
                  timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
                />
              </Grid>
              <Grid item xs={12} md={8} width={1}>
                <Card sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", p: 2 }} raised={true}>
                  <Quote />
                </Card>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card>
              <BasicDateCalendar value={date} onChange={setDate} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6">Progress</Typography>
                <ProgressList />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6">Goal</Typography>
                <GoalList />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6">Habit</Typography>
                <HabitList />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Fab sx={{ position: "fixed", bottom: 16, left: 16 }}>
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default HomePage;
