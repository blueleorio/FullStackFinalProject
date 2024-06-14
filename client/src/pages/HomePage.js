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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Quote } from "../components/QuoteBlock";

import dayjs from "dayjs";
import Clock from "react-live-clock";

import SearchInput from "../components/SearchInput";

function HomePage() {
  const { user } = useAuth();
  const [date, setDate] = React.useState(dayjs());
  const navigate = useNavigate();

  const goToAccount = () => {
    navigate('/account');
  }

  return (
    <Container>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Accordion
          sx={{
            width: "100%",
            maxWidth: "500px",
            position: "absolute",
            zIndex: 10,
          }}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: 8,
          }}
        >
          <Card sx={{ m: 2, display: "flex", justifyContent: "center", width: "100%", maxWidth: "750px", alignItems: "center" }}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">About Me</Typography>
              <Card
                sx={{
                  width: 90, height: 90, display: 'flex', justifyContent: 'center', alignItems: 'center', animation: "zoomInOut 2s infinite",
                  "@keyframes zoomInOut": {
                    "0%": {
                      transform: "scale(1)",
                    },
                    "50%": {
                      transform: "scale(1.3)",
                    },
                    "100%": {
                      transform: "scale(1)",
                    },
                  },
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
              <Typography variant="body2" sx={{ mt: 2 }}>
                {user.aboutMe}
              </Typography>

              <Clock
                format={"h:mm:ssa"}
                ticking={true}
                style={{ fontSize: "2em" }}
                timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
              />
            </Box>
            <Card sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", p: 3, marginRight: 3 }} raised={true}>
              <Quote />

            </Card>
          </Card>

          <Card sx={{ m: 2, width: "auto" }}>
            <BasicDateCalendar value={date} onChange={setDate} />
          </Card>

          <Card sx={{ m: 2, width: "100%", maxWidth: "400px" }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Task</Typography>
              <ProgressList />
            </Box>
          </Card>

          <Card sx={{ m: 2, width: "100%", maxWidth: "300px" }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Goal</Typography>
              <GoalList />
            </Box>
          </Card>

          <Card sx={{ m: 2, width: "100%", maxWidth: "300px" }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Habit</Typography>
              <HabitList />
            </Box>
          </Card>
        </Box>
      </Box >
    </Container >
  );
}

export default HomePage;
