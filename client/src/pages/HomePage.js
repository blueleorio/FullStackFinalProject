import React from "react";
import useAuth from "../hooks/useAuth";

import { Box, Grid, Typography, Card, Container } from "@mui/material";
import CalendarForm from "../features/calendar/CalendarForm";
function HomePage() {
  const { user } = useAuth();

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
              <CalendarForm />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
