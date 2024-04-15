import React from "react";
import useAuth from "../hooks/useAuth";
import dayjs from "dayjs";
import { Box, Grid, Typography, Card, Container } from "@mui/material";
import BasicDateCalendar from "../features/calendar/CalendarForm";
function HomePage() {
  const { user } = useAuth();
  const [date, setDate] = React.useState(dayjs());
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {user.aboutMe}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ width: "110%", overflow: "auto" }}>
            <BasicDateCalendar value={date} onChange={setDate} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
